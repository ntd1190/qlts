/*************************************************************  
1. Create Date	: 2017.04.17
2. Creator		: Nguyen Ngoc Tan
3. Description	: Lấy danh sách phòng ban theo điều kiện
4. Function		: QLDNMAIN/PhongBan/PhongBan
5. Example		: 
					exec [[sp_PhongBan_SelectAllByCriteriaProjection]]  
					@FieldsField='PhongBanId,MaPhongBan,TenPhongBan,GhiChu,HoTen,NgayTao'
					,@WhereClause=''
					,@OrderClause='PhongBanId'
					,@Skip=0
					,@Take=10

6. Precaution	:
7. History		:
				  2017.04.17(NguyenNgocTan) - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_PhongBan_GetListNhanVienByCriteria]
( 
	@FIELD	nvarchar(500)	= null			-- Danh sách các field cần lấy

	--, @WhereClause	nvarchar(500)	= null			
	, @SEARCH_STRING	nvarchar(500)	= null			
	, @ORDER_CLAUSE		nvarchar(500)	= null				
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
	DECLARE @V_WHERE_CLAUSE NVARCHAR(4000) 

	-- Chuẩn bị biến @FIELD
	IF (@FIELD IS NULL)
	SET @FIELD = '*';

	IF (@FIELD = '')
	SET @FIELD = '*';

	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------

	SET @V_WHERE_CLAUSE = N' 1=1 ';

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@ORDER_CLAUSE IS NULL)
		SET @ORDER_CLAUSE = ' MAXCNT ';

	IF (@ORDER_CLAUSE = '')
		SET @ORDER_CLAUSE = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, ' + @FIELD + '
	FROM [MSSQL_QLDN_QLNS].[dbo].[PhongBan] a INNER JOIN [MSSQL_QLDN_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.VaiTroId' 

	-- Build Where clause
	-- Where clause Quick search

	IF @V_WHERE_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE

	-- Build Order clause
	IF @ORDER_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @ORDER_CLAUSE

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
