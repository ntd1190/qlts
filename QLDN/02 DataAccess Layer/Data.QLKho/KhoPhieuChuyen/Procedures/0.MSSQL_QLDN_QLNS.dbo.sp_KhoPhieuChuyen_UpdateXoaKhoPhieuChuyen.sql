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
ALTER PROCEDURE [dbo].[sp_KhoPhieuChuyen_UpdateXoaKhoPhieuChuyen]
(
	 @PhieuChuyenId		INT				=	NULL
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
DECLARE		  @V_PHIEU_CHUYEN_ID	INT		=	0
			 ,@V_CTRVERSION			INT		=	0

---- SET DEFAULT INPUT
SET	@MESSAGE		=	N''
SET @V_PHIEU_CHUYEN_ID	=	ISNULL(@PhieuChuyenId, 0)
----------

-- BEGIN KIỂM TRA INPUT

---- KIỂM TRA @CtrVersion
SET @V_CTRVERSION = (SELECT CtrVersion FROM KhoPhieuChuyen WHERE PhieuChuyenId = @V_PHIEU_CHUYEN_ID)

IF @CtrVersion <> @V_CTRVERSION
BEGIN
	SET @MESSAGE = N'CTR_VERSION|1|Phiếu này đã có người thay đổi thông tin'
END
-----

---- KIỂM TRA LỖI
IF ISNULL(@MESSAGE, '') <> '' -- CÓ LỖI
BEGIN
	SELECT * FROM KhoPhieuChuyen WHERE PhieuChuyenId = @V_PHIEU_CHUYEN_ID
	RETURN
END

-- END KIỂM TRA INPUT

BEGIN TRANSACTION PHIEUCHUYEN_DELETE
BEGIN TRY

	-- UPDATE XÓA PHIẾU
	UPDATE	KhoPhieuChuyen
	SET		XoaYN = 'Y',
			SoPhieu=CONCAT(SoPhieu,'-',PhieuChuyenId)
	WHERE	PhieuChuyenId = @V_PHIEU_CHUYEN_ID

	-- INSERT XÓA CHI TIẾT
	UPDATE KhoPhieuChuyenChiTiet	SET XoaYN = 'Y'	WHERE	PhieuChuyenId = @V_PHIEU_CHUYEN_ID

	IF ISNULL(@MESSAGE, '') <> '' -- CÓ LỖI
	BEGIN
		ROLLBACK TRANSACTION PHIEUCHUYEN_DELETE
		SELECT * FROM KhoPhieuChuyen WHERE PhieuChuyenId = @V_PHIEU_CHUYEN_ID
		RETURN
	END
	ELSE
	BEGIN
		COMMIT TRANSACTION PHIEUCHUYEN_DELETE
		SELECT * FROM KhoPhieuChuyen WHERE PhieuChuyenId = @V_PHIEU_CHUYEN_ID
		RETURN
	END

END TRY
BEGIN CATCH
	ROLLBACK TRANSACTION PHIEUCHUYEN_DELETE
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


