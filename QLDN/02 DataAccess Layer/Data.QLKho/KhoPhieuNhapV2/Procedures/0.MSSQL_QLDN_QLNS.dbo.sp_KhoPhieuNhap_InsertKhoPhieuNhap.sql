/*************************************************************  
1. Create Date	: 2017.07.03
2. Creator		: NGUYEN THANH BINH
3. Description	: THÊM THÔNG TIN PHIẾU NHẬP, CHI TIẾT
4. Function		: QLDNKHO/KHOPHIEUNHAP/EDIT
5. Example		: 
					--∬
					DECLARE		@MESSAGE	NVARCHAR(MAX)
					exec [sp_KhoPhieuNhap_InsertKhoPhieuNhap] 
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
					, @SoPhieu				=	'test6'
					, @SoHoaDon				=	NULL
					, @Seri					=	NULL
					, @TaiKhoanCo			=	NULL
					, @TaiKhoanNo			=	NULL
					, @NgayThanhToan		=	NULL
					, @ChiPhi				=	NULL
					, @ThueVAT				=	NULL
					, @TienThue				=	NULL
					, @Hinh					=	NULL
					, @CtrVersion			=	7
					, @CHI_TIET				=	'22,4141,414,TEST01,12'
					, @LOGIN_ID				=	NULL
					, @MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.07.03 (NGUYEN THANH BINH) - TẠO MỚI
				  2017.08.14 (NGUYEN THANH BINH) - BỔ SUNG LÔ HÀNG
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuNhap_InsertKhoPhieuNhap]
( 
	 @PhieuNhapId			NVARCHAR(MAX)	=	NULL
	,@KhachHangId			NVARCHAR(MAX)	=	NULL
	,@LoaiPhieu			NVARCHAR(MAX)	=	NULL
	,@NguoiGiaoHang		NVARCHAR(MAX)	=	NULL
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
	,@ChiPhi				DECIMAL(24,6)	=	NULL
	,@ThueVAT				DECIMAL(24,6)	=	NULL
	,@TienThue				DECIMAL(24,6)	=	NULL
	,@Hinh					NVARCHAR(MAX)	=	NULL
	,@CtrVersion			NVARCHAR(MAX)	=	NULL

	,@CHI_TIET				NVARCHAR(MAX)	=	NULL			-- '22,4141,414|16,111,333'
	,@LOGIN_ID				NVARCHAR(MAX)	=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
)
AS  
BEGIN
SET NOCOUNT ON
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
---- Biến nội bộ có tiền tố V_ phía trước
DECLARE		@V_PHIEU_NHAP_ID		INT		=	0
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
	SELECT @V_HAS_ERROR = PhieuNhapId FROM KhoPhieuNhap WHERE SoPhieu = @SoPhieu
	IF @V_HAS_ERROR > 0
	BEGIN
		SET @MESSAGE = N'CHECK_INPUT|2|Số phiếu đã tồn tại'
		SELECT * FROM KhoPhieuNhap WHERE PhieuNhapId = 0
		RETURN
	END
	--------------------

BEGIN TRANSACTION
BEGIN TRY

	-- INSERT PHIẾU NHẬP
	INSERT INTO KhoPhieuNhap	(	KhachHangId		,LoaiPhieu	,SoPhieu	,NguoiNhanHang	,SoHoaDon	,Seri	,NgayChungTu	,NoiDung	,TaiKhoanCo		,TaiKhoanNo		,KhoNhap	,NgayThanhToan		,NgayNhap	,ThuKho		,NguoiGiaoHang		,ChiPhi		,ThueVAT	,TienThue	,MaTrangThai	,Hinh	,CtrVersion	,NguoiTao		)
	VALUES						(	@KhachHangId	,@LoaiPhieu	,@SoPhieu	,@NguoiNhanHang	,@SoHoaDon	,@Seri	,@NgayChungTu	,@NoiDung	,@TaiKhoanCo	,@TaiKhoanNo	,@KhoNhap	,@NgayThanhToan		,@NgayNhap	,@ThuKho	,@NguoiGiaoHang		,@ChiPhi	,@ThueVAT	,@TienThue	,'KPN_KN'		,@Hinh	,1			,@LOGIN_ID		)

	SET @V_PHIEU_NHAP_ID = @@IDENTITY

	-- INSERT CHI TIẾT
	INSERT INTO KhoPhieuNhapChiTiet(	PhieuNhapId			,HangHoaId	,SoLuong	,DonGia	,LoHang	,ThoiGianBaoHanh	)
	SELECT								@V_PHIEU_NHAP_ID	,HangHoaId	,SoLuong	,DonGia	,LoHang	,ThoiGianBaoHanh	FROM fn_KhoPhieuChiTiet(@CHI_TIET)
	COMMIT

	SELECT * FROM KhoPhieuNhap WHERE PhieuNhapId = @V_PHIEU_NHAP_ID
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
