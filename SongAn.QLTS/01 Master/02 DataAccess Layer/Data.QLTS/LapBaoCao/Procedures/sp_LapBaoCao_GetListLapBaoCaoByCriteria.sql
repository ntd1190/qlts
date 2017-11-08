USE [QLTS]

GO

ALTER PROC [dbo].[sp_LapBaoCao_GetListLapBaoCaoByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @SEARCH_STRING	nvarchar(500)	= null			
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 



	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------

	
		DECLARE @IS_VIEW varchar(10) = '0'
	   exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
	  @NHAN_VIEN_ID = @NhanVienId,
	  @CO_SO_ID = @CoSoId,
	  @CHUC_NANG = 'CN0004',
	  @QUYEN=@IS_VIEW OUTPUT
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
	SELECT COUNT(*) OVER () AS MAXCNT, a.*,Case when a.KyBaoCao =1 then N''Năm'' else Case when a.KyBaoCao =2 then N''Quí'' else Case when a.KyBaoCao =3 then N''Tháng'' else  N''Ngày'' end end end as TenKyBaoCao  ,nv.TenNhanVien as HoTen,d.TrangThai
	FROM LapBaoCao a LEFT JOIN [dbo].[NhanVien] nv on a.NguoiTao=nv.NhanVienId 
	left join Duyet d on a.DuyetId=d.DuyetId
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
	where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (MaLapBaoCao LIKE N''%' +@Search+ '%'' OR TenLapBaoCao LIKE  N''%' +@Search+ '%'')';


		IF @IS_VIEW = 'VB' 
 BEGIN    
   SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';   
 END
   IF @IS_VIEW = 'VR' 
	BEGIN    
	SET @V_SQL = @V_SQL + ' and EXISTS (SELECT pbnv1.PhongBanId FROM dbo.NhanVien nv JOIN dbo.PhongBanNhanVien pbnv1 ON pbnv1.NhanVienId = nv.NhanVienId WHERE nv.NhanVienId=''' + @NhanVienId + '''' +
							  ' AND CHARINDEX('','' + CAST(pbnv1.PhongBanId AS VARCHAR(10)) + '','', '','' + CAST(pbnv.PhongBanId AS VARCHAR(10)) + '','') > 0) ';   
	
	END
  IF @IS_VIEW = 'VE' 
 BEGIN    
   SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @NhanVienId + '''';   
 END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

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

