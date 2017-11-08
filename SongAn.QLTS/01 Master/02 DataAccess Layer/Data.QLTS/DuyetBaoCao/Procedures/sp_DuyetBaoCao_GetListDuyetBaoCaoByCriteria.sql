ALTER PROC [dbo].[sp_DuyetBaoCao_GetListDuyetBaoCaoByCriteria]
( 
	  @CoSoId	        nvarchar(10)	
	, @SoPhieu		    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @TuNgay			DATETIME		= null		
	, @DenNgay			DATETIME		= null		
	, @PhongBanId		NVARCHAR(MAX)	
	, @DuyetId			nvarchar(10)				= null	
	, @LoginId			nvarchar(10)
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 

	DECLARE  @V_DELIMITER	VARCHAR(10)		=	','
			,@_COSO_IDS		VARCHAR(MAX)	=	NULL
			,@Nam	VARCHAR(MAX)	=	NULL
	--LAY SO LIEU CAU HINH THONG SO
	EXEC sp_ThongSoUser_GetThongSo @LOAITHONGSO='SoLieuNam',@NHANVIEN=@LoginId,@NAM=@Nam OUTPUT;
	SET @Search = ISNULL(@Search, '')
	IF @Search <> ''
	BEGIN	
		SET @Search = N'%' + @Search + '%'
		SET @Search = CAST(@Search AS VARCHAR(max))	
	END	
	----------

		DECLARE @IS_VIEW varchar(10) = '0'
		exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @LoginId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0029',
		@QUYEN=@IS_VIEW OUTPUT
		PRINT(@CoSoId);
		--/ KIỂM TRA Cơ sở trực thuộc

	EXEC [dbo].[sp_CoSo_GetListCoSoTrucThuocById]
	   @COSOID=@CoSoId
	  ,@COSOID_OUT=@_COSO_IDS OUTPUT
	SET @_COSO_IDS = REPLACE(@_COSO_IDS,',',@V_DELIMITER)
	PRINT concat('@_COSO_IDS=',@_COSO_IDS)
	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria

	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, a.*,Case when a.KyBaoCao =1 then CONCAT(N''Năm '', YEAR(a.TuNgay) )  else Case when a.KyBaoCao =2 then (case when month(a.TuNgay)=1 then N''Quí 1'' else case when month(a.TuNgay)=4 then N''Quí 2'' else case when month(a.TuNgay)=7 then N''Quí 3'' else N''Quí 4'' end end end  ) else Case when a.KyBaoCao =3 then CONCAT(N''Tháng'', month(a.TuNgay) ) else  CONCAT(CONCAT(N''Từ ngày '', CONVERT(VARCHAR(10),a.TuNgay,103)), CONCAT(N'' đến ngày '', CONVERT(VARCHAR(10),a.DenNgay,103) )) end end end as TenKyBaoCao  ,nv.TenNhanVien as HoTen,d.TrangThai,
	cs.TenCoSo
	FROM LapBaoCao a LEFT JOIN [dbo].[NhanVien] nv on a.NguoiTao=nv.NhanVienId 
	left join Duyet d on a.DuyetId=d.DuyetId
	LEFT JOIN dbo.CoSo cs ON cs.CoSoId = a.CoSoId
	LEFT JOIN (SELECT pbnv.NhanVienId,
		STUFF((
				select CONCAT( '','' ,u1.PhongBanId)
				from dbo.PhongBan u1 JOIN dbo.PhongBanNhanVien pbnv1 ON pbnv1.PhongBanId = u1.PhongBanId
				where pbnv1.NhanVienId = pbnv.NhanVienId
				for xml path('''')
			),1,1,'''') PhongBanId
			FROM dbo.PhongBanNhanVien pbnv
			JOIN PhongBan b on pbnv.PhongBanId=b.PhongBanId 
			GROUP BY pbnv.NhanVienId) pbnv ON pbnv.NhanVienId=a.NguoiTao
	WHERE 1 = 1 and CAST(a.NgayGui AS DATE) BETWEEN CAST(''' + CAST(@TuNgay AS VARCHAR) +''' AS DATE) AND CAST(''' + CAST(@DenNgay AS VARCHAR) + ''' AS DATE) and YEAR(a.NgayGui)='''+@Nam+'''' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and (a.DienGiai LIKE N''%' +@Search+ '%'')';
	END

	IF @PhongBanId > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and  nv.PhongBanId in (' + @PhongBanId + ')';
	END

	IF @DuyetId > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and a.DuyetId in ('+@DuyetId+')';
	END
	IF @IS_VIEW = 'VA' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and ( a.CoSoId =''' + @CoSoId + ''' or( a.GuiCapTren = 1 and a.CoSoId in ('+@_COSO_IDS+')))';   
	END
		IF @IS_VIEW = 'VB' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';   
	END
		IF @IS_VIEW = 'VR' 
	BEGIN    
			SET @V_SQL = @V_SQL + ' and EXISTS (SELECT pbnv1.PhongBanId FROM dbo.NhanVien nv JOIN dbo.PhongBanNhanVien pbnv1 ON pbnv1.NhanVienId = nv.NhanVienId WHERE nv.NhanVienId=''' + @LoginId + '''' +
							  ' AND CHARINDEX('','' + CAST(pbnv1.PhongBanId AS VARCHAR(10)) + '','', '','' + CAST(pbnv.PhongBanId AS VARCHAR(10)) + '','') > 0) ';   
	 
	END
		IF @IS_VIEW = 'VE' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @LoginId + '''';   
	END


	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY a.NgayGui desc' ;

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

