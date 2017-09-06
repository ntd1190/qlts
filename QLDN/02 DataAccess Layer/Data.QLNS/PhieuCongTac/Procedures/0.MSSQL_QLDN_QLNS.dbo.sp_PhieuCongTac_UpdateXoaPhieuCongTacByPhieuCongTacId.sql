/*************************************************************  
1. Create Date	: 2017.05.24
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: UPDATE XÓA PHIẾU CÔNG TÁC VÀ CHI TIẾT
4. Function		: QLDNMAIN/PHIEUCONGTAC/LIST
5. Example		: 
					--∬
					exec [sp_PhieuCongTac_UpdateXoaPhieuCongTacByPhieuCongTacId]  
					  @PHIEU_CONG_TAC_ID		=	'35'
					, @CTRVERSION				=	'3'
					, @XOA						=	'Y' -- Y|N
					, @MESSAGE					=	NULL

6. Precaution	:
7. History		:
				  2017.05.24(Nguyễn Thanh Bình) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_PhieuCongTac_UpdateXoaPhieuCongTacByPhieuCongTacId]

	  @PHIEU_CONG_TAC_ID		INT				=	NULL
	, @CTRVERSION				INT				=	NULL
	, @XOA						NVARCHAR(20)	=	NULL

	, @MESSAGE					NVARCHAR(4000)	OUTPUT

AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
	---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE	@V_CTRVERSION		INT

	SET @MESSAGE = '';

	/* LẤY CTRVERSION TRONG DB ĐỂ KIỂM TRA */
	SET @V_CTRVERSION = (SELECT CtrVersion FROM PhieuCongTac WHERE PhieuCongTacId = @PHIEU_CONG_TAC_ID)

	/* KIỂM TRA CTRVERSION */
	IF(@V_CTRVERSION <> @CTRVERSION)
	BEGIN
		SET @MESSAGE = ''
		RETURN 0
	END

	/* UPDATE XÓA PHIẾU CÔNG TÁC */
	UPDATE	PhieuCongTac
	SET		XoaYN = @XOA, CtrVersion = (CtrVersion + 1)
	WHERE
			PhieuCongTacId = @PHIEU_CONG_TAC_ID

	/* UPDATE XÓA CHI TIẾT PHIẾU CÔNG TÁC */
	UPDATE	PhieuCongTacChiTiet
	SET		XoaYN= @XOA, CtrVersion = (CtrVersion + 1)
	WHERE
			PhieuCongTacId = @PHIEU_CONG_TAC_ID

	SELECT @@ROWCOUNT
END