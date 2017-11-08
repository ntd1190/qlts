USE [QLTS]
GO



ALTER PROC [dbo].[sp_TheoDoi_GetListTheoDoiByCriteria]
( 
	  @CoSoId	        NVARCHAR(10)		
	, @Search			nvarchar(500)   = null	
	, @TuNgay			DATETIME		= null		
	, @DenNgay			DATETIME		= null		
	, @LoginId			NVARCHAR(10)
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
			,@_COSO_IDS		VARCHAR(MAX)	=	NULL


	SET @Search = ISNULL(@Search, '')
	--IF @Search <> ''
	--BEGIN	
	--	SET @Search = N'%' + @Search + '%'
	--	SET @Search = CAST(@Search AS VARCHAR(max))	
	--END	
	----------

	DECLARE @IS_VIEW varchar(10) = '0'
			,@Nam	VARCHAR(MAX)	=	NULL
	--LAY SO LIEU CAU HINH THONG SO
	EXEC sp_ThongSoUser_GetThongSo @LOAITHONGSO='SoLieuNam',@NHANVIEN=@LoginId,@NAM=@Nam OUTPUT;
	---------------------------
	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @LoginId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0026',
		@QUYEN=@IS_VIEW OUTPUT

	-- DANH SÁCH CƠ SỞ TRƯC THUỘC
	EXEC [dbo].[sp_CoSo_GetListCoSoTrucThuocById]
	   @COSOID=@CoSoId
	  ,@COSOID_OUT=@_COSO_IDS OUTPUT
	
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
	SELECT COUNT(*) OVER () AS MAXCNT, td.TaiSanId, ts.MaTaiSan, ts.TenTaiSan, td.NgayGhiTang, td.NgayTrangCap, td.NgayBatDauSuDung, 
				td.PhongBanId, pb.TenPhongBan, td.NhanVienId, nv.TenNhanVien, td.SLTon, td.SLTang, td.SLGiam, Nam,
				(td.SLTon + td.SLTang -td.SLGiam) SoLuong, 
				ISNULL(SUM(NG.GiaTri),0) NguyenGia, 
				(td.SLTon + td.SLTang -td.SLGiam) * ISNULL(SUM(NG.GiaTri),0) AS ThanhTien,
				HD.HopDongId, HD.SoHopDong
	FROM dbo.TheoDoi td
	LEFT JOIN dbo.TaiSan ts ON ts.TaiSanId = td.TaiSanId
	LEFT JOIN dbo.PhongBan pb ON pb.PhongBanId = td.PhongBanId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = td.NhanVienId
	LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = td.TaiSanId 
	LEFT JOIN dbo.HopDong HD ON HD.HopDongId = td.HopDongId
	LEFT JOIN (SELECT pbnv.NhanVienId,
		STUFF((
				select CONCAT( '','' ,u1.PhongBanId)
				from dbo.PhongBan u1 JOIN dbo.PhongBanNhanVien pbnv1 ON pbnv1.PhongBanId = u1.PhongBanId
				where pbnv1.NhanVienId = pbnv.NhanVienId
				for xml path('''')
			),1,1,'''') PhongBanId
			FROM dbo.PhongBanNhanVien pbnv
			JOIN PhongBan b on pbnv.PhongBanId=b.PhongBanId 
			GROUP BY pbnv.NhanVienId) pbnv ON pbnv.NhanVienId=nv.NguoiTao
	WHERE 1=1 AND TD.Nam = '''+@Nam+''' and td.SLTon >0';
	--WHERE CAST(td.NgayGhiTang AS DATE) BETWEEN CAST(''' + CAST(@TuNgay AS VARCHAR) +''' AS DATE) AND CAST(''' + CAST(@DenNgay AS VARCHAR) + ''' AS DATE) ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and (ts.MaTaiSan LIKE N''%' + @Search+ '%'' OR ts.TenTaiSan LIKE  N''%' +@Search+ '%'' OR pb.TenPhongBan LIKE  N''%' +@Search+'%'' OR nv.TenNhanVien LIKE  N''%' +@Search+ '%'')';
	END
	
	IF @IS_VIEW = 'VB' 
	BEGIN    
		--SET @V_SQL = @V_SQL + ' and  TS.CoSoId in (' + @_COSO_IDS + ') ';   
		SET @V_SQL = @V_SQL + ' and TS.CoSoId =''' + @CoSoId + '''';   
	END
	IF @IS_VIEW = 'VR' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and EXISTS (SELECT pbnv1.PhongBanId FROM dbo.NhanVien nv JOIN dbo.PhongBanNhanVien pbnv1 ON pbnv1.NhanVienId = nv.NhanVienId WHERE nv.NhanVienId=''' + @LoginId+ '''' +
							  ' AND CHARINDEX('','' + CAST(pbnv1.PhongBanId AS VARCHAR(10)) + '','', '','' + CAST(pbnv.PhongBanId AS VARCHAR(10)) + '','') > 0) ';   
	
	END
	IF @IS_VIEW = 'VE' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @LoginId + '''';   
	END

	--IF @IS_VIEW_ALL = '0' 
	--BEGIN			 
	--	SET @V_SQL = @V_SQL + ' and H.CoSoId =''' + CAST(@CoSoId AS VARCHAR) + '''';	  
	--	SET @V_SQL = @V_SQL + ' and H.NguoiTao =''' + CAST(@LoginId AS VARCHAR) + '''';	  
	--END

	SET @V_SQL = @V_SQL + ' GROUP BY td.TaiSanId, ts.MaTaiSan, ts.TenTaiSan, td.NgayGhiTang, td.NgayTrangCap, td.NgayBatDauSuDung, 
							td.PhongBanId, pb.TenPhongBan, td.NhanVienId, nv.TenNhanVien, td.SLTon, td.SLTang, td.SLGiam,
							td.SLTon,td.SLTang,td.SLGiam,Nam ,HD.HopDongId, HD.SoHopDong';

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	---SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	--SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END
