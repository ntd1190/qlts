/*************************************************************  
1. Create Date	: 2017.07.28
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: UPDATE XÓA CHI NHÁNH
4. Function		: QLDNKHO/CHINHANH/LIST
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoPhieuBaoHanh_UpdatXoaListPhieuBaoHanh]
						 @PHIEUBAOHANH_ID		=	'9'
						,@LOGIN_ID				=	68
						,@CTRVERSION			=	2
						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.07.28 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuBaoHanh_UpdatXoaListPhieuBaoHanh]
         @PHIEUBAOHANH_ID	INT				=	NULL
        ,@CTRVERSION		INT				=	NULL
		,@LOGIN_ID			INT				=	NULL
		,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
--------------------------------------------------
	DECLARE	@V_CTRVERSION		INT				=	NULL
	DECLARE	@V_TRANGTHAI		NVARCHAR(MAX)	=	NULL
	DECLARE	@V_HAS_ERROR		BIT				=	0
----------
	SET @MESSAGE = ISNULL(@MESSAGE, '')

	SET @PHIEUBAOHANH_ID = ISNULL(@PHIEUBAOHANH_ID, '')
	IF(@PHIEUBAOHANH_ID = '')
		SET @PHIEUBAOHANH_ID = 0

	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '')
	IF(@LOGIN_ID = '')
		SET @LOGIN_ID = 0
----------
---- KIỂM TRA ĐIỀU KIỆN UPDATE
	SELECT	 @V_CTRVERSION = CtrVersion
			,@V_TRANGTHAI = TrangThaiTiepNhan
	FROM KhoPhieuBaoHanh WHERE PhieuBaoHanhId = @PHIEUBAOHANH_ID

	-- KIỂM TRA CtrVersion
	IF @V_HAS_ERROR = 0 AND @CtrVersion <> @V_CTRVERSION
	BEGIN
		SET @MESSAGE = N'CTR_VERSION|1|Phiếu này đã có người dùng khác thay đổi thông tin'
		SET @V_HAS_ERROR = 1
	END

	-- KIỂM TRA TrangThaiTiepNhan
	IF @V_HAS_ERROR = 0 AND @V_TRANGTHAI = 'PBH_KT'
	BEGIN
		SET @MESSAGE = N'TRANG_THAI|1|Phiếu bảo hành đã kết thúc'
		SET @V_HAS_ERROR = 1
	END
----------
	IF @V_HAS_ERROR = 0
	BEGIN
		UPDATE	KhoPhieuBaoHanh
		SET		 XoaYN = 'Y'
				,CtrVersion = CtrVersion + 1
		WHERE	PhieuBaoHanhId = @PHIEUBAOHANH_ID
	END
----------
	IF @V_HAS_ERROR = 0
		SELECT * FROM KhoPhieuBaoHanh WHERE PhieuBaoHanhId = @PHIEUBAOHANH_ID
	ELSE
		SELECT * FROM KhoPhieuBaoHanh WHERE PhieuBaoHanhId = 0
RETURN
END