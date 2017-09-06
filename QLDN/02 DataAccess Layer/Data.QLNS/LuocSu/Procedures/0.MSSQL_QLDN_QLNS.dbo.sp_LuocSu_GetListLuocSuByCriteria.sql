/*************************************************************  
1. Create Date	: 2017.05.04
2. Creator		: Tan
3. Description	: Lấy danh sách Luoc Su theo điều kiện
4. Function		: 
5. Example		: 
					exec sp_LuocSu_GetListLuocSuByCriteria 
					@FIELD=N'ngay,sukien, HoTen'
					,@DOITUONGID=N'8'
					,@CHUCNANG=N'BangLuong'
					,@ORDER_CLAUSE=N'LuocSuId desc'
					,@SKIP=0
					,@TAKE=10

6. Precaution	:
7. History		:
				  2017.05.09(Tran Quoc Hung) - Chỉnh sửa: "ChucNang >=" thành "ChucNang ="
*************************************************************/
ALTER PROC [dbo].[sp_LuocSu_GetListLuocSuByCriteria]
( 
	@FIELD				nvarchar(500)	= null			-- Danh sách các field cần lấy
	, @ORDER_CLAUSE		nvarchar(500)	= null	
	, @DOITUONGID		nvarchar(500)	= null	
	, @CHUCNANG 		nvarchar(500)	= null	
	, @SKIP				int				= null			-- Số dòng skip (để phân trang)
	, @TAKE				int				= null			-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) =''
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) =''
	DECLARE @V_WHERE_CLAUSE NVARCHAR(4000) =''

	-- Chuẩn bị biến @FIELD
	IF (@FIELD IS NULL)
	SET @FIELD = '*';
	IF (@FIELD = '')
	SET @FIELD = '*';

	----------
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
	SET @V_SQL = N'SELECT COUNT(*) OVER () AS MAXCNT, ngay,sukien, HoTen from [MSSQL_QLDN_QLNS].[dbo].[LuocSu] a 
	inner join [MSSQL_QLDN_MAIN].[dbo].[NguoiDung] b on a.NguoiDung=b.NguoiDungId '
	-- Build Where clause
	-- Where clause Quick search

		IF( @DOITUONGID <> '' )
		BEGIN 
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND DoiTuongId=  ''' + @DOITUONGID + ' ''';
		END
		 IF @CHUCNANG <> ''
		BEGIN
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND ChucNang =  ''' + @CHUCNANG + '  ''';
		END
		
		


			
	IF @V_WHERE_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' WHERE 1=1 ' + @V_WHERE_CLAUSE

	-- Build Order clause
	IF @ORDER_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @ORDER_CLAUSE

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

