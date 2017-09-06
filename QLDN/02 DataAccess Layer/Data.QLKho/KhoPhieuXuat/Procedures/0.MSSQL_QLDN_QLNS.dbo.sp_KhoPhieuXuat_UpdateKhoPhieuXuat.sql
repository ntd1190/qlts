/*************************************************************  
1. Create Date	: 2017.07.03
2. Creator		: NGUYEN THANH BINH
3. Description	: UPDATE THÔNG TIN PHIẾU XUẤT, CHI TIẾT
4. Function		: QLDNKHO/KHOPHIEUXUAT/EDIT
5. Example		: 
					--∬
					DECLARE		@MESSAGE	NVARCHAR(MAX)

					exec [sp_KhoPhieuXuat_UpdateKhoPhieuXuat] 
					  @PhieuXuatId			=	1019
					, @KhachHangId			=	32
					, @LoaiPhieu			=	'LPX_XUATBAN'
					, @SoPhieu				=	'XB030717-12'
					, @NguoiNhanHang		=	'22222'
					, @SoDienThoai			=	'22222'
					, @SoHoaDon				=	'22222'
					, @Seri					=	NULL
					, @NgayChungTu			=	'2017-07-03'
					, @NoiDung				=	'111111'
					, @TaiKhoanCo			=	22
					, @TaiKhoanNo			=	24
					, @TaiKhoanKho			=	24
					, @TaiKhoanGiaVon		=	22
					, @KhoXuat				=	2
					, @NgayThanhToan		=	NULL
					, @NgayXuat				=	'2017-07-03'
					, @ThuKho				=	51
					, @NguoiGiaoHang		=	68
					, @ChiPhi				=	'100000'
					, @ThueVAT				=	'10'
					, @TienThue				=	NULL
					, @Hinh					=	''
					, @CtrVersion			=	2
					, @CHI_TIET				=	'22,4141,414|16,111,333'
					, @LOGIN_ID				=	1
					, @MESSAGE				=	@MESSAGE OUTPUT

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.07.03 (NGUYEN THANH BINH) - TẠO MỚI
				  2017.07.19 (NGUYEN THANH BINH) - BỔ SUNG SỐ ĐIỆN THOẠI
				  2017.07.21 (NGUYEN THANH BINH) - BỔ SUNG LOAI PHIẾU
				  2017.08.16 (NGUYEN THANH BINH) - THÊM LÔ HÀNG, THỜI GIAN BẢO HÀNH, GIÁ NHẬP VÀO CHI TIẾT
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuXuat_UpdateKhoPhieuXuat]
( 
	  @PhieuXuatId		INT					=	NULL
	, @KhachHangId		INT					=	NULL
	, @LoaiPhieu		NVARCHAR(MAX)		=	NULL
	, @SoPhieu			NVARCHAR(MAX)		=	NULL
	, @NguoiNhanHang	NVARCHAR(MAX)		=	NULL
	, @SoDienThoai		NVARCHAR(MAX)		=	NULL
	, @SoHoaDon			NVARCHAR(MAX)		=	NULL
	, @Seri				NVARCHAR(MAX)		=	NULL
	, @NgayChungTu		DATETIME			=	NULL
	, @NoiDung			NVARCHAR(MAX)		=	NULL
	, @TaiKhoanCo		INT					=	NULL
	, @TaiKhoanNo		INT					=	NULL
	, @TaiKhoanKho		INT					=	NULL
	, @TaiKhoanGiaVon	INT					=	NULL
	, @KhoXuat			INT					=	NULL
	, @NgayThanhToan	DATETIME			=	NULL
	, @NgayXuat			DATETIME			=	NULL
	, @ThuKho			INT					=	NULL
	, @NguoiGiaoHang	INT					=	NULL
	, @ChiPhi			DECIMAL				=	NULL
	, @ThueVAT			DECIMAL				=	NULL
	, @TienThue			DECIMAL				=	NULL
	, @CtrVersion		INT					=	NULL
	, @Hinh				NVARCHAR(MAX)		=	NULL
	, @CHI_TIET			NVARCHAR(MAX)		=	NULL			-- '22,4141,414|16,111,333'
	, @LOGIN_ID			INT					=	NULL
	, @MESSAGE			NVARCHAR(MAX)		OUTPUT
)
AS  
BEGIN
SET NOCOUNT ON
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
---- Biến nội bộ có tiền tố V_ phía trước
DECLARE		@CTR_VERSION			INT		=	0

	-- KIỂM TRA @CHI_TIET
	SET @CHI_TIET = ISNULL(@CHI_TIET,'')
	IF @CHI_TIET = ''
	BEGIN
		SET @MESSAGE = N'CHECK_INPUT|1|Không tim thấy thông tin chi tiết'
		SELECT * FROM KhoPhieuXuat WHERE PhieuXuatId = 0
		RETURN
	END
	--------------------

	-- KIỂM TRA @CtrVersion
	SELECT @CTR_VERSION = CtrVersion FROM KhoPhieuXuat WHERE PhieuXuatId = @PhieuXuatId
	IF @CtrVersion <> @CTR_VERSION
	BEGIN
		SET @MESSAGE = N'CTR_VERSION|1|Phiếu này đã có người dùng khác thay đổi thông tin'
		SELECT * FROM KhoPhieuXuat WHERE PhieuXuatId = 0
		RETURN
	END
	/* Số lượng xuất phải > 0*/
	IF EXISTS(		
		SELECT pxct.* from fn_KhoPhieuChiTiet(@CHI_TIET) pxct
		WHERE pxct.SoLuong <= 0
	)
	BEGIN
		SET @MESSAGE = N'CTR_VERSION|1|Số lượng xuất không được <= 0'
		print @MESSAGE
		SELECT * FROM KhoPhieuXuat WHERE PhieuXuatId = @PhieuXuatId
		RETURN
	END

	/* Số lượng xuất phải <= số lượng tồn*/
	--DECLARE @V_RESULT BIT =0	
	--exec sp_KhoHangHoa_CheckSoLuongTonKhoById @NGAY = @NgayXuat , @KHO_ID =@KhoXuat ,	@HANG_HOA_ID =@CHI_TIET, @LOGIN_ID =@LOGIN_ID, @RESULT= @V_RESULT OUTPUT 
	--IF @V_RESULT = 0 
	--BEGIN
	--	SET @MESSAGE = N'TON_CUOI|4|Số lượng xuất lớn hơn số lượng tồn hoặc không có trong kho'
	--	print @MESSAGE
	--	SELECT * FROM KhoPhieuXuat WHERE PhieuXuatId = @PhieuXuatId
	--	RETURN
	--END
	-------------------------------------------------------------
	

BEGIN TRANSACTION
BEGIN TRY

	-- UPDATE PHIẾU XUẤT
	UPDATE	KhoPhieuXuat
	SET		  KhachHangId=@KhachHangId
			, LoaiPhieu=@LoaiPhieu
			, SoPhieu=@SoPhieu
			, NguoiNhanHang=@NguoiNhanHang
			, SoDienThoai=@SoDienThoai
			, SoHoaDon=@SoHoaDon
			, Seri=@Seri
			, NgayChungTu=@NgayChungTu
			, NoiDung=@NoiDung
			, TaiKhoanCo=@TaiKhoanCo
			, TaiKhoanNo=@TaiKhoanNo
			, TaiKhoanKho=@TaiKhoanKho
			, TaiKhoanGiaVon=@TaiKhoanGiaVon
			, KhoXuat=@KhoXuat
			, NgayThanhToan=@NgayThanhToan
			, NgayXuat=@NgayXuat
			, ThuKho=@ThuKho
			, NguoiGiaoHang=@NguoiGiaoHang
			, ChiPhi=@ChiPhi
			, Hinh=@Hinh
			, ThueVAT=@ThueVAT
			, TienThue=@TienThue
			, CtrVersion=@CtrVersion+1

	WHERE	PhieuXuatId=@PhieuXuatId

	-- UPDATE CHI TIẾT
	DELETE KhoPhieuXuatChiTiet WHERE PhieuXuatId=@PhieuXuatId

	INSERT INTO KhoPhieuXuatChiTiet(	PhieuXuatId		,HangHoaId	,SoLuong	,DonGia	,LoHang, ThoiGianBaoHanh	,GiaNhap	)
	SELECT								@PhieuXuatId	,HangHoaId	,SoLuong	,DonGia	,LoHang, ThoiGianBaoHanh	,GiaNhap	FROM fn_KhoPhieuXuatChiTiet(@CHI_TIET)
	COMMIT

	SELECT * FROM KhoPhieuXuat WHERE PhieuXuatId = @PhieuXuatId
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
