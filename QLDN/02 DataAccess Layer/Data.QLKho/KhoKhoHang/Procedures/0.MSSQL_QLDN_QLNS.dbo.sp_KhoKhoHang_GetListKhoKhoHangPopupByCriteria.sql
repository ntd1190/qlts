/*************************************************************  
1. Create Date	: 2017.06.07
2. Creator		: NGUYEN THANH BINH
3. Description	: LẤY DANH SÁCH KHO HÀNG
4. Function		: QLDNKHO/KHOKHOHANG/LIST
5. Example		: 
					--∬
					exec [sp_KhoKhoHang_GetListKhoKhoHangPopupByCriteria]  
					  @FIELD					= ''
					, @SEARCH_STRING			= N''
					, @ORDER_CLAUSE				= ''
					, @SKIP						= 0
					, @TAKE						= 100

6. Precaution	:
7. History		:
				  2017.06.07 (Nguyen Thanh Binh) - TẠO MỚI
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoKhoHang_GetListKhoKhoHangPopupByCriteria]
( 
	  @FIELD					NVARCHAR(4000)	= null			-- Danh sách các field cần lấy
	, @SEARCH_STRING			NVARCHAR(4000)	= null			-- quick search.

	, @ORDER_CLAUSE				NVARCHAR(4000)	= null			-- Mệnh đề order by (VD: NhanVienId ASC|DESC,HoTen ASC|DESC)
	, @SKIP						INT				= null			-- Số dòng skip (để phân trang)
	, @TAKE						INT				= null			-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL				NVARCHAR(4000) 
	DECLARE @V_FIELD			NVARCHAR(4000)
	DECLARE @V_WHERE_CLAUSE		NVARCHAR(4000) 
	DECLARE @V_ORDER_CLAUSE		NVARCHAR(4000)

	SET		@V_WHERE_CLAUSE		= N' KHO.XoaYN = ''N'' ';
	SET		@V_ORDER_CLAUSE		= ISNULL(@V_ORDER_CLAUSE,'');

	-- Chuẩn bị biến @FIELD
	SET @FIELD = ISNULL(@FIELD, '');
	IF (@FIELD = '')
		SET @FIELD = ' KHO.* ';

	-- KIỂM TRA @SEARCH_STRING
	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')

	-- Chuẩn bị biến @SKIP & @TAKE
	SET @SKIP = ISNULL(@SKIP, '');
	IF (@SKIP = '')
		SET @SKIP = 0;

	SET @TAKE = ISNULL(@TAKE, '');
	IF (@TAKE = '')
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	SET @ORDER_CLAUSE = ISNULL(@ORDER_CLAUSE, '');
	IF (@ORDER_CLAUSE = '')
		SET @ORDER_CLAUSE = ' KHO_ID ';
	----------

---- Xây dựng nội dung câu SQL  
	SET @V_SQL = N'
		SELECT
					COUNT(*) OVER () MAXCNT,
					' + @FIELD + '
					,KHO.KhoHangId KHO_ID,(NV.Ho+'' ''+NV.Ten) TenNguoiTao
		FROM
					KhoKhoHang KHO WITH(NOLOCK, READUNCOMMITTED)
		LEFT JOIN	NhanVien NV WITH(NOLOCK, READUNCOMMITTED) ON KHO.NguoiTao=NV.NhanVienId
	'

	-- Where clause @SEARCH_STRING
	IF @SEARCH_STRING <> ''
	BEGIN
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + N' AND ( 
				KHO.MaKho LIKE N''%' + @SEARCH_STRING  +'%'' 
				OR KHO.TenKho  LIKE N''%' + @SEARCH_STRING  + '%'' 
			) '
	END

	-- Build Where clause
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE

	-- Build Order clause
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @ORDER_CLAUSE

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@SKIP AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@TAKE AS nvarchar(20)) +' ROWS ONLY'

---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

SET NOCOUNT OFF
END