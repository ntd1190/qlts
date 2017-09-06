/*************************************************************  
1. Create Date	: 2017.06.29
2. Creator		: NGUYEN THANH BINH
3. Description	: LẤY DANH SÁCH KHO HÀNG
4. Function		: QLDNKHO/KHOKHOHANG/LIST
5. Example		: 
					--∬
					exec [sp_KhoPhieuXuat_GetListKhoPhieuXuatByCriteria]  
					  @FIELD					= ''
					, @SEARCH_STRING			= N''
					, @START_DATE				= '2017-06-09'
					, @END_DATE					= '2017-06-09'
					, @KHACH_HANG				= '32|33'
					, @KHO_HANG					= '1'
					, @TRANG_THAI				= 'KPX_KN'
					, @MA_FORM					= ''
					, @ORDER_CLAUSE				= ''
					, @SKIP						= 0
					, @TAKE						= 100
					, @LOGIN_ID					= 68

6. Precaution	:
7. History		:
				  2017.06.29 (Nguyen Thanh Binh) - TẠO MỚI
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuXuat_GetListKhoPhieuXuatByCriteria]
( 
	  @FIELD					NVARCHAR(4000)	= null			-- Danh sách các field cần lấy
	, @SEARCH_STRING			NVARCHAR(4000)	= null			-- quick search.
	, @START_DATE				NVARCHAR(4000)	= null			-- START NGÀY CHỨNG TỪ.
	, @END_DATE					NVARCHAR(4000)	= null			-- END NGÀY CHỨNG TỪ.
	, @KHACH_HANG				NVARCHAR(4000)	= null			-- DANH SÁCH KHÁCH HÀNG.
	, @KHO_HANG					NVARCHAR(4000)	= null			-- DANH SÁCH KHO HÀNG.
	, @TRANG_THAI				NVARCHAR(4000)	= null			-- DANH SÁCH TRẠNG THÁI.

	, @MA_FORM					NVARCHAR(4000)	= null			-- @MA_FORM
	, @ORDER_CLAUSE				NVARCHAR(4000)	= null			-- Mệnh đề order by (VD: NhanVienId ASC|DESC,HoTen ASC|DESC)
	, @SKIP						INT				= null			-- Số dòng skip (để phân trang)
	, @TAKE						INT				= null			-- Số dòng take (để phân trang)
	, @LOGIN_ID					VARCHAR(20)	= null				-- 
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
	DECLARE @IS_VIEW_ALL	varchar = '0'

	SET		@V_WHERE_CLAUSE		= N' KPX.XoaYN = ''N'' ';
	SET		@V_ORDER_CLAUSE		= ISNULL(@V_ORDER_CLAUSE,'');

	-- Chuẩn bị biến @LOGIN_ID,@IS_VIEW_ALL
	SET @LOGIN_ID = ISNULL(@LOGIN_ID,'')
	exec MSSQL_QLDN_MAIN.dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGIN_ID = @LOGIN_ID,
		@CHUC_NANG = 'KHO0013',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

	-- Chuẩn bị biến @FIELD
	SET @FIELD = ISNULL(@FIELD, '');

	SET @MA_FORM = ISNULL(@MA_FORM, '');
	IF (@MA_FORM <> '')
	BEGIN
		exec [MSSQL_QLDN_MAIN_DEMO].dbo.[sp_CauHinhFormCot_GetInfoByMaForm]
		@MA_FORM = @MA_FORM,
		@FIELD = @V_FIELD OUTPUT,
		@ORDER_CLAUSE = @V_ORDER_CLAUSE OUTPUT;

		IF (@FIELD = '' AND @V_FIELD <> '')
		BEGIN
			SET @FIELD = @V_FIELD;
		END

		IF (@ORDER_CLAUSE = '' AND @V_ORDER_CLAUSE <> '')
		BEGIN
			SET @ORDER_CLAUSE = @V_ORDER_CLAUSE;
		END
	END

	IF (@FIELD = '')
		SET @FIELD = ' KPX.* ';

	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	SET @START_DATE = ISNULL(@START_DATE, '')
	SET @END_DATE = ISNULL(@END_DATE, '')
	SET @KHACH_HANG = ISNULL(@KHACH_HANG, '')
	SET @KHO_HANG = ISNULL(@KHO_HANG, '')
	SET @TRANG_THAI = ISNULL(@TRANG_THAI, '')

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
		SET @ORDER_CLAUSE = ' KPX_ID ';
	----------

---- Xây dựng nội dung câu SQL  
	SET @V_SQL = N'
		SELECT
			COUNT(*) OVER () MAXCNT,'
			+ @FIELD + '
			,KPX.PhieuXuatId KPX_ID,KPX.CtrVersion KPX_CTRVERSION,KPX.MaTrangThai 
		FROM
			KhoPhieuXuat KPX WITH(NOLOCK, READUNCOMMITTED)
			LEFT JOIN KhoKhachHang KH WITH(NOLOCK, READUNCOMMITTED) ON KPX.KhachHangId = KH.KhachHangId
			LEFT JOIN KhoKhoHang KHO WITH(NOLOCK, READUNCOMMITTED) ON KPX.KhoXuat = KHO.KhoHangId
			LEFT JOIN NhanVien NV WITH(NOLOCK, READUNCOMMITTED) ON KPX.NguoiTao = NV.NhanVienId
			LEFT JOIN TrangThai TT WITH(NOLOCK, READUNCOMMITTED) ON KPX.MaTrangThai = TT.MaTrangThai
	'

	-- Where clause @IS_VIEW_ALL
	IF @IS_VIEW_ALL = '0' and @LOGIN_ID<>''
	BEGIN		
	 IF(@V_WHERE_CLAUSE!='')
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (KPX.NguoiTao =' + @LOGIN_ID + ')'
	END

	-- Where clause @SEARCH_STRING
	 
	-- Where clause @START_DATE @END_DATE
	IF( @START_DATE <> '' AND @END_DATE <> '')
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND KPX.NgayChungTu BETWEEN  ''' + @START_DATE + ''' AND '''+ @END_DATE + '''';
	ELSE IF @START_DATE <> ''
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND KPX.NgayChungTu >=  ''' + @START_DATE + '''';
	ELSE IF @END_DATE <>''
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND KPX.NgayChungTu <=  ''' + @END_DATE + '''';

	-- Where clause @KHACH_HANG
	IF( @KHACH_HANG <> '')
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND CHARINDEX(''|'' + CAST(KPX.KhachHangId AS VARCHAR(20)) + ''|'', ''|' + @KHACH_HANG + '|'') > 0 ';

	-- Where clause @KHACH_HANG
	IF( @KHO_HANG <> '')
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND CHARINDEX(''|'' + CAST(KPX.KhoXuat AS VARCHAR(20)) + ''|'', ''|' + @KHO_HANG + '|'') > 0 ';

	-- Where clause @KHACH_HANG
	IF( @TRANG_THAI <> '')
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND CHARINDEX(''|'' + CAST(KPX.MaTrangThai AS VARCHAR(20)) + ''|'', ''|' + @TRANG_THAI + '|'') > 0 ';

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