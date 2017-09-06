/*************************************************************  
1. Create Date	: 2017.06.15
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: UPDATE XÓA PHIẾU NHẬP
4. Function		: QLDNKHO/KHOPHIEUNHAP/LIST
5. Example		: 
					DECLARE	@MESSAGE	NVARCHAR(MAX)
					DECLARE	@RESULT		INT
					EXEC [sp_KhoPhieuNhap_UpdateXoaListKhoPhieuNhap]
					  @PHIEU_NHAP_ID			= 16
					, @CTRVERSION				=	32
					, @XOA						=	'Y' -- Y|N
					, @MESSAGE					=	@MESSAGE OUTPUT
					, @RESULT					=	@RESULT OUTPUT

					SELECT @MESSAGE, @RESULT
6. Precaution	:
7. History		:
				  2017.06.15 (NGUYỄN THANH BÌNH) - Tạo mới
				  2017.06.20 (NGUYỄN THANH BÌNH) - FIXED RETURN OUPUT NULL
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuNhap_UpdateXoaListKhoPhieuNhap]
	    @PHIEU_NHAP_ID			INT				=	NULL
	    , @CTRVERSION			INT				=	NULL
	    , @LOGIN_ID				INT				=	NULL
		, @XOA					NVARCHAR(20)	=	NULL

		, @MESSAGE				NVARCHAR(MAX)	OUTPUT
		, @RESULT				INT				OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
	---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE	@V_CTRVERSION		INT			=	NULL

	SET @PHIEU_NHAP_ID = ISNULL(@PHIEU_NHAP_ID, '')
	IF(@PHIEU_NHAP_ID = '')
		SET @PHIEU_NHAP_ID = 0

	---- @MESSAGE
	SET @MESSAGE = ISNULL(@MESSAGE, '')

	---- @RESULT
	SET @RESULT = ISNULL(@RESULT, '')
	IF(@RESULT = '')
		SET @RESULT = 0

	/* LẤY CTRVERSION TRONG DB ĐỂ KIỂM TRA */
	SET @V_CTRVERSION = (SELECT CtrVersion FROM KhoPhieuNhap WHERE PhieuNhapId = @PHIEU_NHAP_ID)

	/* KIỂM TRA CTRVERSION */
	IF(@V_CTRVERSION <> @CTRVERSION)
	BEGIN
		SET @MESSAGE = 'VERSION_CONFICT'
		SELECT @MESSAGE AS MSG,@RESULT AS KQ;
		RETURN
	END

	/* UPDATE XÓA PHẾU NHẬP */
	UPDATE KhoPhieuNhap
	SET 
		XoaYN = 'Y'
		, CtrVersion = ISNULL(CtrVersion, 1) + 1
	WHERE
		PhieuNhapId = @PHIEU_NHAP_ID 

	SET @RESULT		=	@RESULT + @@ROWCOUNT

	/* UPDATE XÓA CHI TIẾT PHIẾU NHẬP */
	UPDATE KhoPhieuNhapChiTiet
	SET 
		XoaYN = 'Y'
		, CtrVersion = ISNULL(CtrVersion, 1) + 1
	WHERE
		PhieuNhapId = @PHIEU_NHAP_ID 

	SELECT * FROM KhoPhieuNhap WHERE PhieuNhapId = @PHIEU_NHAP_ID 

END