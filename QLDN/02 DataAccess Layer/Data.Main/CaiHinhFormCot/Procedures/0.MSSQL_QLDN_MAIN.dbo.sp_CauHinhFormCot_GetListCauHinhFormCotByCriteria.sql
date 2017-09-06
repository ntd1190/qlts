/*************************************************************  
1. Create Date	: 2017.04.20
2. Creator		: Nguyen Thanh Binh
3. Description	: Lấy danh sách cột theo form
4. Function		: 
5. Example		: 
					EXEC	[dbo].[sp_CauHinhFormCot_GetListCauHinhFormCotByCriteria]
							@MA_FORM = N'FM0001',
							@SEARCH_STRING = N'',
							@FIELD = N'',
							@ORDER_CLAUSE = N'ThuTu asc',
							@SKIP = 0,
							@TAKE = 0
6. Precaution	:
7. History		:
				  2017.04.20(Nguyen Thanh Binh) - Tạo mới
				  2017.04.21(Nguyen Thanh Binh) - viết nội dung sp
*************************************************************/
ALTER PROC [dbo].[sp_CauHinhFormCot_GetListCauHinhFormCotByCriteria]
( 
	  @MA_FORM			varchar(10)			=	NULL		-- Mã Form
	, @SEARCH_STRING	nvarchar(2000)		=	NULL		-- Chuỗi tìm kiếm nhanh
	, @FIELD			nvarchar(2000)		=	NULL		-- danh sách column
	, @ORDER_CLAUSE		nvarchar(2000)		=	NULL		-- câu sắp xếp

	, @SKIP				int					=	NULL		-- Số dòng skip (để phân trang)
	, @TAKE				int					=	NULL		-- Số dòng take (để phân trang)

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000)
	DECLARE @V_WHERE_CLAUSE NVARCHAR(4000) 

	SET @V_WHERE_CLAUSE = N' 1=1 ';

---- kiểm tra biến đầu vào
	SET @FIELD = ISNULL(@FIELD, '');
	IF (@FIELD = '')
	SET @FIELD = '*';

	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	

	-- Chuẩn bị biến @SKIP & @TAKE
	SET @SKIP = ISNULL(@SKIP, 0)

	SET @TAKE = ISNULL(@TAKE, 0)
	IF(@TAKE <= 0)
		SET @TAKE = 50

	-- Chuẩn bị biến @ORDER_CLAUSE
	SET @ORDER_CLAUSE = ISNULL(@ORDER_CLAUSE,'')

	IF (@ORDER_CLAUSE = '')
		SET @ORDER_CLAUSE = ' MAXCNT ';

---- Xây dựng nội dung câu SQL  
	SET @V_SQL = '
	SELECT COUNT(*) OVER () AS MAXCNT, ' + @FIELD + '
	FROM CauHinhFormCot FC WITH(NOLOCK, READUNCOMMITTED)
	'

---- Build Where clause
	-- Quick search
	IF @SEARCH_STRING <> ''
	BEGIN
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (MaForm LIKE ''' + @V_SEARCH_STRING + ''' OR MaCot LIKE N''' + @V_SEARCH_STRING + ''' OR TenCot LIKE N''' + @SEARCH_STRING + ''' OR TenCotMacDinh LIKE N''' + @SEARCH_STRING + ''') '
	END
	
	-- lọc theo mã form
		IF @MA_FORM <> ''
	BEGIN
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (MaForm = ''' + @MA_FORM + ''') '
	END

	IF @V_WHERE_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE

---- Build Order clause
	IF @ORDER_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @ORDER_CLAUSE

---- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

---- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)
---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

