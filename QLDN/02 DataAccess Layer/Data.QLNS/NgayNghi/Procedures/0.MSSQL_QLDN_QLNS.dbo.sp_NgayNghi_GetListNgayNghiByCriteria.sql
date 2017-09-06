USE [MSSQL_QLDN_QLNS]
GO
/****** Object:  StoredProcedure [dbo].[sp_NgayNghi_GetListNgayNghiByCriteria]    Script Date: 05/31/2017 12:03:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[sp_NgayNghi_GetListNgayNghiByCriteria]
( 
	@FieldsField	nvarchar(500)	= null			-- Danh sách các field cần lấy
	, @WhereClause nvarchar(500) = null
	--, @WhereClause	nvarchar(500)	= null			
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

	-- Chuẩn bị biến @FIELD
	IF (@FieldsField IS NULL)
	SET @FieldsField = '*';

	IF (@FieldsField = '')
	SET @FieldsField = '*';

	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------

	

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
	SELECT COUNT(*) OVER () AS MAXCNT, CONVERT(VARCHAR(10),a.Ngay,103) as Ngay,a.MoTa,CONVERT(VARCHAR(10),a.NgayTao,103) as NgayTao,a.NguoiTao,a.XoaYN,b.HoTen
	FROM [MSSQL_QLDN_QLNS].[dbo].[NgayNghi] a LEFT JOIN [MSSQL_QLDN_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId' 

	-- Build Where clause
	-- Where clause Quick search

	IF @WhereClause > ''
	SET @V_SQL = @V_SQL + ' WHERE ' + @WhereClause

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
