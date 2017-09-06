/*************************************************************  
1. Create Date	: 2017.07.03
2. Creator		: NGUYEN THANH BINH
3. Description	: THÊM THÔNG TIN PHIẾU XUẤT, CHI TIẾT
4. Function		: QLDNKHO/KHOPHIEUXUAT/EDIT
5. Example		: 
					--∬
					DECLARE		@MESSAGE	NVARCHAR(MAX)

					exec [sp_KhoPhieuXuat_InsertKhoPhieuXuat] 
					  @KhachHangId			=	32
					, @LoaiPhieu			=	'LPX_XUATBAN'
					, @SoPhieu				=	'XB030717-8'
					, @NguoiNhanHang		=	'1111111'
					, @SoDienThoai			=	'22222'
					, @SoHoaDon				=	'1111111'
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
					, @CHI_TIET				=	'22,4141,414|16,111,333'
					, @LOGIN_ID				=	1
					, @MESSAGE				=	@MESSAGE OUTPUT

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.07.03 (NGUYEN THANH BINH) - TẠO MỚI
				  2017.07.19 (NGUYEN THANH BINH) - BỔ SUNG SỐ ĐIỆN THOẠI
				  2017.07.21 (NGUYEN THANH BINH) - BỔ SUNG LOAI PHIẾU
				  2017.08.16 (NGUYEN THANH BINH) - THÊM LÔ HÀNG, THỜI GIAN BẢO HÀNH VÀO CHI TIẾT
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuXuat_InsertKhoPhieuXuat]
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
	, @Hinh				NVARCHAR(MAX)		=	NULL
	, @CtrVersion		INT					=	NULL

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
DECLARE		@V_PHIEU_XUAT_ID		INT		=	0
DECLARE		@V_HAS_ERROR			INT		=	0

	-- KIỂM TRA @CHI_TIET
	SET @CHI_TIET = ISNULL(@CHI_TIET,'')
	IF @CHI_TIET = ''
	BEGIN
		SET @MESSAGE = N'CHECK_INPUT|1|Không tim thấy thông tin chi tiết'
		SELECT * FROM KhoTheKho WHERE TheKhoId = 0
		RETURN
	END
	--------------------

	-- KIỂM TRA SỐ PHIẾU
	SELECT @V_HAS_ERROR = PhieuXuatId FROM KhoPhieuXuat WHERE SoPhieu = @SoPhieu
	IF @V_HAS_ERROR > 0
	BEGIN
		SET @MESSAGE = N'CHECK_INPUT|2|Số phiếu đã tồn tại'
		SELECT * FROM KhoPhieuXuat WHERE PhieuXuatId = 0
		RETURN
	END
	
	/* Kiểm tra số lượng nhập phải > 0 */
	IF EXISTS(		
		SELECT pxct.* from fn_KhoPhieuChiTiet(@CHI_TIET) pxct
		WHERE pxct.SoLuong <= 0
	)
	BEGIN
		SET @MESSAGE = N'TON_CUOI|4|Số lượng xuất không được <= 0'
		print @MESSAGE
		SELECT * FROM KhoPhieuXuat WHERE PhieuXuatId = @PhieuXuatId
		RETURN
	END
	/*----------------------------*/

	-------------------------------------------------------------------
	/*Kiểm tra số lượng tồn phải > số lượng nhập */
	
	--DECLARE @V_RESULT BIT =0	
	--exec sp_KhoHangHoa_CheckSoLuongTonKhoById @NGAY = @NgayXuat , @KHO_ID =@KhoXuat ,	@HANG_HOA_ID =@CHI_TIET, @LOGIN_ID =@LOGIN_ID, @RESULT= @V_RESULT OUTPUT 
	--IF @V_RESULT = 0 
	--BEGIN
	--	SET @MESSAGE = N'TON_CUOI|4|Số lượng xuất lớn hơn số lượng tồn hoặc không có trong kho'
	--	print @MESSAGE
	--	SELECT * FROM KhoPhieuXuat WHERE PhieuXuatId = @PhieuXuatId
	--	RETURN
	--END

	/*-------------------------------------------*/


	
	-------------------------------------------------------------
BEGIN TRANSACTION
BEGIN TRY

	-- INSERT PHIẾU XUẤT
	INSERT INTO KhoPhieuXuat	(	KhachHangId		,SoPhieu	,LoaiPhieu	,NguoiNhanHang	,SoDienThoai	,SoHoaDon	,Seri	,NgayChungTu	,NoiDung	,TaiKhoanCo		,TaiKhoanNo		,TaiKhoanKho	,TaiKhoanGiaVon		,KhoXuat	,NgayThanhToan		,NgayXuat	,ThuKho		,NguoiGiaoHang		,ChiPhi		,ThueVAT	,TienThue	,MaTrangThai	,Hinh	,CtrVersion	,NguoiTao		)
	VALUES						(	@KhachHangId	,@SoPhieu	,@LoaiPhieu	,@NguoiNhanHang	,@SoDienThoai	,@SoHoaDon	,@Seri	,@NgayChungTu	,@NoiDung	,@TaiKhoanCo	,@TaiKhoanNo	,@TaiKhoanKho	,@TaiKhoanGiaVon	,@KhoXuat	,@NgayThanhToan		,@NgayXuat	,@ThuKho	,@NguoiGiaoHang		,@ChiPhi	,@ThueVAT	,@TienThue	,'KPX_KN'		,@Hinh	,1			,@LOGIN_ID		)

	SET @V_PHIEU_XUAT_ID = @@IDENTITY

	-- INSERT CHI TIẾT
	INSERT INTO KhoPhieuXuatChiTiet(	PhieuXuatId			,HangHoaId	,SoLuong	,DonGia	,LoHang, ThoiGianBaoHanh	,GiaNhap	)
	SELECT								@V_PHIEU_XUAT_ID	,HangHoaId	,SoLuong	,DonGia	,LoHang, ThoiGianBaoHanh	,GiaNhap	FROM fn_KhoPhieuXuatChiTiet(@CHI_TIET)
	COMMIT

	SELECT * FROM KhoPhieuXuat WHERE PhieuXuatId = @V_PHIEU_XUAT_ID
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

