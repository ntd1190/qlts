USE [QLTS]

SET QUOTED_IDENTIFIER ON
GO

ALTER PROC [dbo].[sp_KhoTonKho_GetListKhoTonKhoByCriteria]
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
		  @CHUC_NANG = 'CN0045',
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
	SELECT COUNT(*) OVER () AS MAXCNT,a.*,nv.TenNhanVien as HoTen,c.TenKhoTaiSan
	FROM KhoTonKho a LEFT JOIN NhanVien nv on a.NguoiTao=nv.NhanVienId 
	LEFT JOIN KhoTaiSan c on a.KhoTaiSanId=c.KhoTaiSanId 
	where 1=1  and a.CoSoId =''' + @CoSoId + '''';  

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (a.ThangNam LIKE N''%' +@Search+ '%'' OR c.TenKhoTaiSan LIKE  N''%' +@Search+ '%'')';



	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY a.ThangNam'

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

