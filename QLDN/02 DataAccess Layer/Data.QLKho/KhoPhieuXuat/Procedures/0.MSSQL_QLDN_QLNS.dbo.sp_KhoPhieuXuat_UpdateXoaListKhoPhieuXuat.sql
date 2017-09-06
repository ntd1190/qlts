/*************************************************************  
1. Create Date	: 2017.06.29
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: UPDATE XÓA PHIẾU XUẤT
4. Function		: QLDNKHO/KHOPHIEUXUAT/LIST
5. Example		: 
					DECLARE	@MESSAGE	NVARCHAR(MAX)
					DECLARE	@RESULT		INT
					EXEC [sp_KhoPhieuXuat_UpdateXoaListKhoPhieuXuat]
					  @PHIEU_XUAT_ID			= 16
					, @CTRVERSION				=	32
					, @XOA						=	'Y' -- Y|N
					, @MESSAGE					=	@MESSAGE OUTPUT
					, @RESULT					=	@RESULT OUTPUT

					SELECT @MESSAGE, @RESULT
6. Precaution	:
7. History		:
				  2017.06.29 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuXuat_UpdateXoaListKhoPhieuXuat]
	    @PHIEU_XUAT_ID			INT				=	NULL
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

	SET @PHIEU_XUAT_ID = ISNULL(@PHIEU_XUAT_ID, '')
	IF(@PHIEU_XUAT_ID = '')
		SET @PHIEU_XUAT_ID = 0

	---- @MESSAGE
	SET @MESSAGE = ISNULL(@MESSAGE, '')

	---- @RESULT
	SET @RESULT = ISNULL(@RESULT, '')
	IF(@RESULT = '')
		SET @RESULT = 0

	/* LẤY CTRVERSION TRONG DB ĐỂ KIỂM TRA */
	SET @V_CTRVERSION = (SELECT CtrVersion FROM KhoPhieuXuat WHERE PhieuXuatId = @PHIEU_XUAT_ID)

	/* KIỂM TRA CTRVERSION */
	IF(@V_CTRVERSION <> @CTRVERSION)
	BEGIN
		SET @MESSAGE = 'VERSION_CONFICT'
		SELECT @MESSAGE AS MSG,@RESULT AS KQ;
		RETURN
	END

	/* UPDATE XÓA PHẾU NHẬP */
	UPDATE KhoPhieuXuat
	SET 
		XoaYN = 'Y'
		, CtrVersion = ISNULL(CtrVersion, 1) + 1
	WHERE
		PhieuXuatId = @PHIEU_XUAT_ID 

	SET @RESULT		=	@RESULT + @@ROWCOUNT

	/* UPDATE XÓA CHI TIẾT PHIẾU NHẬP */
	UPDATE KhoPhieuXuatChiTiet
	SET 
		XoaYN = 'Y'
	WHERE
		PhieuXuatId = @PHIEU_XUAT_ID 

	SELECT * FROM KhoPhieuXuat WHERE PhieuXuatId = @PHIEU_XUAT_ID 

END