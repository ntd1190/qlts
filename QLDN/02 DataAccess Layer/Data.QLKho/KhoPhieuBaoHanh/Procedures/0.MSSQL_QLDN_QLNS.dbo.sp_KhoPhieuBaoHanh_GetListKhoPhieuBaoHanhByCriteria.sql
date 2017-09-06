/*************************************************************  
1. Create Date	: 2017.07.27
2. Creator		: NGUYEN THANH BINH
3. Description	: DANH SÁCH PHIẾU BẢO HÀNH
4. Function		: QLDNKHO/KHOPHIEUBAOHANH/LIST
5. Example		: 
					--∬
					DECLARE	@MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoPhieuBaoHanh_GetListKhoPhieuBaoHanhByCriteria]  
						 @FIELD					= ''
						,@START_DATE			= ''
						,@END_DATE				= ''
						,@SERIES				= ''
						,@DIENTHOAI				= '11'
						,@THONG_TIN_KHACH_HANG	= ''
						,@SAN_PHAM_CTY			= ''
						,@ORDER_CLAUSE			= ''
						,@SKIP					= 0
						,@TAKE					= 100
						,@MA_FORM				= 'FL0018'
						,@LOGIN_ID				= 68
						,@MESSAGE				= @MESSAGE OUTPUT

					SELECT @MESSAGE
6. Precaution	:
7. History		:
				  2017.07.27 (Nguyen Thanh Binh) - TẠO MỚI
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuBaoHanh_GetListKhoPhieuBaoHanhByCriteria]
( 
	 @FIELD						NVARCHAR(MAX)	= NULL			-- Danh sách các field cần lấy
	,@START_DATE				NVARCHAR(MAX)	= NULL			-- START NGÀY CHỨNG TỪ.
	,@END_DATE					NVARCHAR(MAX)	= NULL			-- END NGÀY CHỨNG TỪ.
	,@SERIES					NVARCHAR(MAX)	= NULL
	,@DIENTHOAI					NVARCHAR(MAX)	= NULL
	,@THONG_TIN_KHACH_HANG		NVARCHAR(MAX)	= NULL			-- TÊN / SỐ ĐIỆN THOẠI KHÁCH HÀNG.
	,@SAN_PHAM_CTY				NVARCHAR(MAX)	= NULL			-- DANH SÁCH TRẠNG THÁI.
	,@ORDER_CLAUSE				NVARCHAR(MAX)	= NULL			-- Mệnh đề order by (VD: NhanVienId ASC|DESC,HoTen ASC|DESC)
	,@SKIP						INT				= NULL			-- Số dòng skip (để phân trang)
	,@TAKE						INT				= NULL			-- Số dòng take (để phân trang)
	,@MA_FORM					NVARCHAR(MAX)	= NULL			-- @MA_FORM
	,@LOGIN_ID					VARCHAR(20)		= NULL				-- 
	,@MESSAGE					VARCHAR(MAX)	OUTPUT
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

	SET		@V_WHERE_CLAUSE		= N' KPBH.XoaYN = ''N'' ';
	SET		@V_ORDER_CLAUSE		= ISNULL(@V_ORDER_CLAUSE,'');

	SET @LOGIN_ID = ISNULL(@LOGIN_ID,'')
	SET @START_DATE = ISNULL(@START_DATE, '')
	SET @END_DATE = ISNULL(@END_DATE, '')
	SET @SERIES = ISNULL(@SERIES, '')
	SET @DIENTHOAI = ISNULL(@DIENTHOAI, '')
	SET @SAN_PHAM_CTY = ISNULL(@SAN_PHAM_CTY, '')
	SET @THONG_TIN_KHACH_HANG = ISNULL(@THONG_TIN_KHACH_HANG, '')

	-- KIỂM TRA @IS_VIEW_ALL
	exec MSSQL_QLDN_MAIN.dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGIN_ID = @LOGIN_ID,
		@CHUC_NANG = 'KHO0019',
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
		SET @FIELD = ' KPBH.* ';
	----------

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
		SET @ORDER_CLAUSE = ' KPBH_ID ';
	----------

---- Xây dựng nội dung câu SQL  
	SET @V_SQL = N'
		SELECT
			COUNT(*) OVER () MAXCNT,'
			+ @FIELD + '
			,KPBH.PhieuBaoHanhId KPBH_ID,KPBH.CtrVersion KPBH_CTRVERSION,KPBH.TrangThaiTiepNhan  
		FROM
			KhoPhieuBaoHanh KPBH WITH(NOLOCK, READUNCOMMITTED)
			LEFT JOIN TrangThai TT WITH(NOLOCK, READUNCOMMITTED) ON KPBH.TrangThaiTiepNhan = TT.MaTrangThai
			LEFT JOIN NhanVien NV WITH(NOLOCK, READUNCOMMITTED) ON KPBH.NguoiTao = NV.NhanVienId
	'

	-- Where clause @IS_VIEW_ALL
	IF @IS_VIEW_ALL = '0' and @LOGIN_ID<>''
	BEGIN		
	 IF(@V_WHERE_CLAUSE!='')
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (KPBH.NguoiTao =' + @LOGIN_ID + ')'
	END

	-- Where clause @SEARCH_STRING
	 
	-- Where clause @START_DATE @END_DATE
	IF( @START_DATE <> '' AND @END_DATE <> '')
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND KPBH.NgayTao BETWEEN  ''' + @START_DATE + ''' AND '''+ SUBSTRING ( @END_DATE ,0 , 10 ) + ' 23:59:59' + '''';
	ELSE IF @START_DATE <> ''
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND KPBH.NgayTao >=  ''' + @START_DATE + '''';
	ELSE IF @END_DATE <>''
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND KPBH.NgayTao <=  ''' + @END_DATE + '''';

	-- Where clause @SERIES
	IF( @SERIES <> '')
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND KPBH.SeriesNo LIKE ''%' + @SERIES +'%'' ';
	
	-- Where clause @DIENTHOAI
	IF( @DIENTHOAI <> '')
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND KPBH.DienThoai LIKE ''%' + @DIENTHOAI +'%'' ';

	-- Where clause @THONG_TIN_KHACH_HANG
	IF( @THONG_TIN_KHACH_HANG <> '')
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND KPBH.TenKhachHang LIKE ''%' + @THONG_TIN_KHACH_HANG +'%'') ';

	-- Where clause @SAN_PHAM_CTY
	IF( @SAN_PHAM_CTY <> '')
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (KPBH.SanPhamCty = ''' + @SAN_PHAM_CTY +''') ';

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