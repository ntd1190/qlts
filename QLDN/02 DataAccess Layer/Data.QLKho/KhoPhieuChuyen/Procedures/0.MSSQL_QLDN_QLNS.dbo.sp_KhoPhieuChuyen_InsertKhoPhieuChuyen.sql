/*************************************************************  
1. Create Date	: 2017.08.26
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
					, @CHI_TIET				=	'16,1,15000000,,12,0|16,1,15000000,,12,0'
					, @LOGIN_ID				=	1
					, @MESSAGE				=	@MESSAGE OUTPUT

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.08.26 (NGUYEN THANH BINH) - TẠO MỚI
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuChuyen_InsertKhoPhieuChuyen]
(
	 @PhieuChuyenId		INT				=	NULL
    ,@SoPhieu			NVARCHAR(MAX)	=	NULL
    ,@NoiDung			NVARCHAR(MAX)	=	NULL
    ,@TaiKhoanNhap		INT				=	NULL
    ,@TaiKhoanXuat		INT				=	NULL
    ,@NgayXuat			DATETIME		=	NULL
    ,@NgayNhap			DATETIME		=	NULL
    ,@KhoNhap			INT				=	NULL
    ,@KhoXuat			INT				=	NULL
    ,@NguoiGiaoHang		INT				=	NULL
    ,@NguoiNhanHang		INT				=	NULL
    ,@GhiChu			NVARCHAR(MAX)	=	NULL
    ,@Hinh				NVARCHAR(MAX)	=	NULL
    ,@MaTrangThai		NVARCHAR(MAX)	=	NULL
    ,@ChiPhi			NUMERIC(24,6)	=	NULL
    ,@ThueVAT			NUMERIC(24,6)	=	NULL
    ,@NguoiTao			INT				=	NULL
    ,@NgayTao			DATETIME		=	NULL
    ,@XoaYN				NVARCHAR(MAX)	=	NULL
    ,@CtrVersion		INT				=	NULL

	, @CHI_TIET			NVARCHAR(MAX)	=	NULL
	, @LOGIN_ID			INT				=	NULL
	, @MESSAGE			NVARCHAR(MAX)		OUTPUT
)
AS  
BEGIN
--------------------------------------------------
SET NOCOUNT ON

---- Biến nội bộ có tiền tố V_ phía trước
DECLARE		 @V_PHIEU_CHUYEN_ID		INT		=	0

---- SET DEFAULT INPUT
SET	@MaTrangThai	=	N'KPC_KN'
SET	@XoaYN			=	N'N'
SET	@NguoiTao		=	ISNULL(@LOGIN_ID, 0)
SET	@NgayTao		=	GETDATE()
SET	@CtrVersion		=	1
SET	@MESSAGE		=	N''
----------

-- KIỂM TRA SỐ PHIẾU
IF @MESSAGE = '' AND EXISTS (SELECT 1 FROM KhoPhieuChuyen WHERE PhieuChuyenId <> @V_PHIEU_CHUYEN_ID AND SoPhieu = @SoPhieu)
BEGIN
	SET @MESSAGE = N'CHECK_INPUT|2|Số phiếu đã tồn tại'
END

IF ISNULL(@MESSAGE, '') <> '' -- CÓ LỖI
BEGIN
	SELECT * FROM KhoPhieuChuyen WHERE PhieuChuyenId = @V_PHIEU_CHUYEN_ID
	RETURN
END

BEGIN TRANSACTION PHIEUCHUYEN_INSERT
BEGIN TRY

	-- INSERT PHIẾU
	INSERT INTO KhoPhieuchuyen	(	SoPhieu		,NoiDung	,TaiKhoanNhap	,TaiKhoanXuat	,NgayXuat	,NgayNhap	,KhoNhap	,KhoXuat	,NguoiGiaoHang	,NguoiNhanHang	,GhiChu		,Hinh	,MaTrangThai	,ChiPhi		,ThueVAT	,NguoiTao	,NgayTao	,XoaYN	,CtrVersion		)
	VALUES						(	@SoPhieu	,@NoiDung	,@TaiKhoanNhap	,@TaiKhoanXuat	,@NgayXuat	,@NgayNhap	,@KhoNhap	,@KhoXuat	,@NguoiGiaoHang	,@NguoiNhanHang	,@GhiChu	,@Hinh	,@MaTrangThai	,@ChiPhi	,@ThueVAT	,@LOGIN_ID	,@NgayTao	,@XoaYN	,@CtrVersion	)

	SET @V_PHIEU_CHUYEN_ID = @@IDENTITY

	-- INSERT CHI TIẾT
	INSERT INTO KhoPhieuChuyenChiTiet(	PhieuChuyenId		,HangHoaId	,SoLuong	,DonGia	,LoHang	)
	SELECT								@V_PHIEU_CHUYEN_ID	,HangHoaId	,SoLuong	,DonGia	,LoHang	FROM fn_KhoPhieuChiTiet(@CHI_TIET)

	IF ISNULL(@MESSAGE, '') <> '' -- CÓ LỖI
	BEGIN
		ROLLBACK TRANSACTION PHIEUCHUYEN_INSERT
		SELECT * FROM KhoPhieuChuyen WHERE PhieuChuyenId = @V_PHIEU_CHUYEN_ID
		RETURN
	END
	ELSE
	BEGIN
		COMMIT TRANSACTION PHIEUCHUYEN_INSERT
		SELECT * FROM KhoPhieuChuyen WHERE PhieuChuyenId = @V_PHIEU_CHUYEN_ID
		RETURN
	END

END TRY
BEGIN CATCH
	ROLLBACK TRANSACTION PHIEUCHUYEN_INSERT
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

SELECT * FROM KhoPhieuChuyen WHERE PhieuChuyenId = @V_PHIEU_CHUYEN_ID

SET NOCOUNT OFF
--------------------------------------------------
END


