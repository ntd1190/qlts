USE [QLTS]
GO


ALTER PROC [dbo].[sp_NuocSanXuat_GetListNuocSanXuatByCriteria]
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

	--DECLARE @IS_VIEW_ALL varchar = '0'
 -- 	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
	--	@LOGINID = @CoSoId,
	--	@CHUC_NANG = 'CN0004',
	--	@QUYEN_TAC_VU = 'View All',
	--	@YES_NO=@IS_VIEW_ALL OUTPUT

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
	SELECT COUNT(*) OVER () AS MAXCNT, a.NuocSanXuatId,a.MaNuocSanXuat,a.TenNuocSanXuat,a.GhiChu,b.TenNhanVien as HoTen,a.NgayTao
	FROM NuocSanXuat a LEFT JOIN NhanVien b on a.NguoiTao=b.NhanVienId where 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (MaNuocSanXuat LIKE N''%' +@Search+ '%'' OR TenNuocSanXuat LIKE  N''%' +@Search+ '%'')';


	--	IF @IS_VIEW_ALL = '0' 
	--BEGIN			 
	--		SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';	  
	--END

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

