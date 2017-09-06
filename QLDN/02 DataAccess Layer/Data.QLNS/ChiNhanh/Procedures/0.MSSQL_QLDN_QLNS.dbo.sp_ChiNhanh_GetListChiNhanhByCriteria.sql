/*************************************************************  
1. Create Date	: 2017.07.17
2. Creator		: NGUYEN THANH BINH
3. Description	: LẤY DANH SÁCH CHI NHÁNH
4. Function		: QLDNKHO/CHINHANH/LIST
5. Example		: 
					--∬
					DECLARE @MESSAGE	NVARCHAR(MAX)
					exec [sp_ChiNhanh_GetListChiNhanhByCriteria]  
					  @FIELD					= ''
					, @SEARCH_STRING			= N'002'
					, @ORDER_CLAUSE				= ''
					, @SKIP						= 0
					, @TAKE						= 100
					,@LOGIN_ID			=	68
					,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.07.17 (Nguyen Thanh Binh) - TẠO MỚI
*************************************************************/
ALTER PROCEDURE [dbo].[sp_ChiNhanh_GetListChiNhanhByCriteria]
( 
	  @FIELD					NVARCHAR(4000)	= null			-- Danh sách các field cần lấy
	, @SEARCH_STRING			NVARCHAR(4000)	= null			-- quick search.

	, @ORDER_CLAUSE				NVARCHAR(4000)	= null			-- Mệnh đề order by (VD: NhanVienId ASC|DESC,HoTen ASC|DESC)
	, @SKIP						INT				= null			-- Số dòng skip (để phân trang)
	, @TAKE						INT				= null			-- Số dòng take (để phân trang)
	,@LOGIN_ID					INT				=	null
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
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

	SET		@V_WHERE_CLAUSE		= N' CHINHANH.XoaYN = ''N'' ';
	SET		@V_ORDER_CLAUSE		= ISNULL(@V_ORDER_CLAUSE,'');

	-- Chuẩn bị biến @FIELD
	SET @FIELD = ISNULL(@FIELD, '');
	IF (@FIELD = '')
		SET @FIELD = ' CHINHANH.* ';

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
		SET @ORDER_CLAUSE = ' CHINHANH_ID ';
	----------

---- Xây dựng nội dung câu SQL  
	SET @V_SQL = N'
		SELECT
					COUNT(*) OVER () MAXCNT,
					' + @FIELD + '
					,CHINHANH.ChiNhanhId CHINHANH_ID,(NV.Ho+'' ''+NV.Ten) TenNguoiTao
					,CHINHANHCHA.TenChiNhanh TenChiNhanhCha
		FROM
					ChiNhanh CHINHANH WITH(NOLOCK, READUNCOMMITTED)
		LEFT JOIN	NhanVien NV WITH(NOLOCK, READUNCOMMITTED) ON CHINHANH.NguoiTao=NV.NhanVienId
		LEFT JOIN	ChiNhanh CHINHANHCHA WITH(NOLOCK, READUNCOMMITTED) ON CHINHANH.ChiNhanhCha=CHINHANHCHA.ChiNhanhId
	'

	-- Where clause @SEARCH_STRING
	IF @SEARCH_STRING <> ''
	BEGIN
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + N' AND ( 
				CHINHANH.MaChiNhanh LIKE N''%' + @SEARCH_STRING  +'%'' 
				OR CHINHANH.TenChiNhanh  LIKE N''%' + @SEARCH_STRING  + '%'' 
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
	
	EXEC(@V_SQL)

SET NOCOUNT OFF
END