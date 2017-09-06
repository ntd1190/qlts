/*************************************************************  
1. Create Date	: 2017.06.20
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: UPDATE THÔNG TIN PHIẾU NHẬP
4. Function		: QLDNKHO/KHOPHIEUNHAP/EDIT
5. Example		: 
					DECLARE	@MESSAGE	NVARCHAR(MAX)
					DECLARE	@RESULT		INT
					EXEC [sp_KhoPhieuNhap_UpdateKhoPhieuNhap]
					  @PhieuNhapId			=	1027	-- NOT NULL
					, @KhachHangId			=	34	-- NOT NULL
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
					, @Hinh					=	NULL
					, @CtrVersion			=	5

					, @LOGIN_ID				=	NULL
					, @MESSAGE				=	'' -- @MESSAGE OUTPUT
					, @RESULT				=	'' -- @RESULT OUTPUT

					SELECT @MESSAGE, @RESULT
6. Precaution	:
7. History		:
				  2017.06.20 (NGUYỄN THANH BÌNH) - TẠO MỚI
				  2017.06.28 (NGUYỄN THANH BÌNH) - BỔ SUNG THÊM THÔNG TIN
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuNhap_UpdateKhoPhieuNhap]
		  @PhieuNhapId			NVARCHAR(MAX)	=	NULL
		, @KhachHangId			NVARCHAR(MAX)	=	NULL
		, @NguoiGiaoHang		NVARCHAR(MAX)	=	NULL
		, @SoPhieu				NVARCHAR(MAX)	=	NULL
		, @SoHoaDon				NVARCHAR(MAX)	=	NULL
		, @Seri					NVARCHAR(MAX)	=	NULL
		, @NgayChungTu			DATETIME		=	NULL
		, @NoiDung				NVARCHAR(MAX)	=	NULL
		, @TaiKhoanCo			NVARCHAR(MAX)	=	NULL
		, @TaiKhoanNo			NVARCHAR(MAX)	=	NULL
		, @KhoNhap				NVARCHAR(MAX)	=	NULL
		, @NgayThanhToan		DATETIME		=	NULL
		, @NgayNhap				DATETIME		=	NULL
		, @NguoiNhanHang		INT				=	NULL
		, @ThuKho				INT				=	NULL
		, @ChiPhi				INT				=	NULL
		, @ThueVAT				INT				=	NULL
		, @Hinh					NVARCHAR(MAX)	=	NULL
		, @CtrVersion			NVARCHAR(MAX)	=	NULL

	    , @LOGIN_ID				NVARCHAR(MAX)	=	NULL
		, @MESSAGE				NVARCHAR(MAX)		OUTPUT
		, @RESULT				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
	---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE	@V_CTRVERSION		INT			=	NULL

	---- @PhieuNhapId
	SET @CtrVersion = ISNULL(@CtrVersion, '')
	IF(@CtrVersion = '')
		SET @CtrVersion = -1

	---- @PhieuNhapId
	SET @PhieuNhapId = ISNULL(@PhieuNhapId, '')
	IF(@PhieuNhapId = '')
		SET @PhieuNhapId = 0

	/* LẤY CTRVERSION TRONG DB ĐỂ KIỂM TRA */
	SET @V_CTRVERSION = (SELECT CtrVersion FROM KhoPhieuNhap WHERE PhieuNhapId = @PhieuNhapId)

	/* KIỂM TRA CTRVERSION */
	IF(@V_CTRVERSION <> @CtrVersion)
	BEGIN
		SET @MESSAGE = 'VERSION_CONFICT'
		SELECT @MESSAGE AS MSG,@RESULT AS KQ;
		RETURN
	END

	/* UPDATE XÓA PHẾU NHẬP */
	UPDATE	KhoPhieuNhap
	SET		  NguoiGiaoHang		=	@NguoiGiaoHang
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
			, CtrVersion		=	ISNULL(@CtrVersion, 1) + 1
	WHERE	PhieuNhapId = @PhieuNhapId

	SET @RESULT		=	@RESULT + @@ROWCOUNT

	SELECT * FROM KhoPhieuNhap WHERE PhieuNhapId = @PhieuNhapId 

END