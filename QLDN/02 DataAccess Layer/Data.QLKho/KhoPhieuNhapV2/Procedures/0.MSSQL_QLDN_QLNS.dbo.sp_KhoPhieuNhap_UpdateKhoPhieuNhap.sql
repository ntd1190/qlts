/*************************************************************  
1. Create Date	: 2017.07.12
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: UPDATE THÔNG TIN PHIẾU NHẬP
4. Function		: QLDNKHO/KHOPHIEUNHAP/EDIT
5. Example		: 
					DECLARE	@MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoPhieuNhap_UpdateKhoPhieuNhap]
					  @PhieuNhapId			=	2031	-- NOT NULL
					, @KhachHangId			=	34	-- NOT NULL
					, @LoaiPhieu			=	'LPN_NHAPMOI'	-- NOT NULL
					, @KhoNhap				=	2	-- NOT NULL
					, @NgayChungTu			=	'2017-06-17'	-- NOT NULL
					, @NgayNhap				=	'2017-06-17'
					, @NguoiNhanHang		=	NULL
					, @ThuKho				=	NULL
					, @NoiDung				=	'test'	-- NOT NULL
					, @NguoiGiaoHang		=	'test'
					, @SoPhieu				=	'test'
					, @SoHoaDon				=	NULL
					, @Seri					=	NULL
					, @TaiKhoanCo			=	NULL
					, @TaiKhoanNo			=	NULL
					, @NgayThanhToan		=	NULL
					, @ChiPhi				=	NULL
					, @ThueVAT				=	NULL
					, @TienThue				=	NULL
					, @Hinh					=	NULL
					, @CtrVersion			=	1
					, @CHI_TIET				=	'22,4141,414|16,111,333'
					, @LOGIN_ID				=	NULL
					, @MESSAGE				=	@MESSAGE OUTPUT
					SELECT @MESSAGE
6. Precaution	:
7. History		:
				  2017.07.12 (NGUYỄN THANH BÌNH) - TẠO MỚI
				  2017.08.14 (NGUYEN THANH BINH) - BỔ SUNG LÔ HÀNG
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuNhap_UpdateKhoPhieuNhap]
	 @PhieuNhapId			NVARCHAR(MAX)	=	NULL
	,@KhachHangId			NVARCHAR(MAX)	=	NULL
	,@LoaiPhieu				NVARCHAR(MAX)	=	NULL
	,@NguoiGiaoHang			NVARCHAR(MAX)	=	NULL
	,@SoPhieu				NVARCHAR(MAX)	=	NULL
	,@SoHoaDon				NVARCHAR(MAX)	=	NULL
	,@Seri					NVARCHAR(MAX)	=	NULL
	,@NgayChungTu			DATETIME		=	NULL
	,@NoiDung				NVARCHAR(MAX)	=	NULL
	,@TaiKhoanCo			NVARCHAR(MAX)	=	NULL
	,@TaiKhoanNo			NVARCHAR(MAX)	=	NULL
	,@KhoNhap				NVARCHAR(MAX)	=	NULL
	,@NgayThanhToan			DATETIME		=	NULL
	,@NgayNhap				DATETIME		=	NULL
	,@NguoiNhanHang			INT				=	NULL
	,@ThuKho				INT				=	NULL
	,@ChiPhi				INT				=	NULL
	,@ThueVAT				INT				=	NULL
	,@TienThue				DECIMAL(24,6)	=	NULL
	,@Hinh					NVARCHAR(MAX)	=	NULL
	,@CtrVersion			NVARCHAR(MAX)	=	NULL

	,@CHI_TIET				NVARCHAR(MAX)	=	NULL			-- '22,4141,414|16,111,333'
	,@LOGIN_ID				NVARCHAR(MAX)	=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
	---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE	@V_CTRVERSION		INT			=	NULL

	---- @CtrVersion
	SET @CtrVersion = ISNULL(@CtrVersion, '')
	IF(@CtrVersion = '')
		SET @CtrVersion = -1

	---- @PhieuNhapId
	SET @PhieuNhapId = ISNULL(@PhieuNhapId, '')
	IF(@PhieuNhapId = '')
		SET @PhieuNhapId = 0

	/* LẤY CTRVERSION TRONG DB ĐỂ KIỂM TRA */
	SET @V_CTRVERSION = (SELECT CtrVersion FROM KhoPhieuNhap WHERE PhieuNhapId = @PhieuNhapId)

	-- KIỂM TRA @CtrVersion
	SELECT @V_CTRVERSION = CtrVersion FROM KhoPhieuNhap WHERE PhieuNhapId = @PhieuNhapId
	IF @CtrVersion <> @V_CTRVERSION
	BEGIN
		SET @MESSAGE = N'CTR_VERSION|1|Phiếu này đã có người thay đổi thông tin'
		SELECT * FROM KhoPhieuNhap WHERE PhieuNhapId = 0
		RETURN
	END

	-- KIỂM TRA @CHI_TIET
	SET @CHI_TIET = ISNULL(@CHI_TIET,'')
	IF @CHI_TIET = ''
	BEGIN
		SET @MESSAGE = N'CHECK_INPUT|1|Không tim thấy thông tin chi tiết'
		SELECT * FROM KhoPhieuNhap WHERE PhieuNhapId = 0
		RETURN
	END
	--------------------

BEGIN TRANSACTION
BEGIN TRY
	/* UPDATE XÓA PHẾU NHẬP */
	UPDATE	KhoPhieuNhap
	SET		  NguoiGiaoHang		=	@NguoiGiaoHang
			, LoaiPhieu			=	ISNULL(@LoaiPhieu, '')
			, SoPhieu			=	ISNULL(@SoPhieu, '')
			, KhachHangId		=	@KhachHangId
			, SoHoaDon			=	ISNULL(@SoHoaDon, '')
			, Seri				=	ISNULL(@Seri, '')
			, NgayChungTu		=	@NgayChungTu
			, NoiDung			=	@NoiDung
			, Hinh				=	@Hinh
			, TaiKhoanCo		=	@TaiKhoanCo
			, TaiKhoanNo		=	@TaiKhoanNo
			, KhoNhap			=	@KhoNhap
			, NgayThanhToan		=	@NgayThanhToan
			, NgayNhap			=	@NgayNhap
			, NguoiNhanHang		=	@NguoiNhanHang
			, ThuKho			=	@ThuKho
			, ChiPhi			=	ISNULL(@ChiPhi, 0)
			, ThueVAT			=	ISNULL(@ThueVAT, 0)
			, TienThue			=	ISNULL(@TienThue, 0)
			, CtrVersion		=	ISNULL(@CtrVersion, 1) + 1
	WHERE	PhieuNhapId = @PhieuNhapId

	-- UPDATE CHI TIẾT
	DELETE KhoPhieuNhapChiTiet WHERE PhieuNhapId=@PhieuNhapId

	INSERT INTO KhoPhieuNhapChiTiet(	PhieuNhapId		,HangHoaId	,SoLuong	,DonGia	,LoHang	,ThoiGianBaoHanh	)
	SELECT								@PhieuNhapId	,HangHoaId	,SoLuong	,DonGia	,LoHang	,ThoiGianBaoHanh	FROM fn_KhoPhieuChiTiet(@CHI_TIET)
	COMMIT

	SELECT * FROM KhoPhieuNhap WHERE PhieuNhapId = @PhieuNhapId 
END TRY
BEGIN CATCH
	ROLLBACK
	DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

    RAISERROR (@ErrorMessage, -- Message text.
               @ErrorSeverity, -- Severity.
               @ErrorState -- State.
               );
END CATCH
------------------------------------------------
SET NOCOUNT OFF
END
