/*************************************************************  
1. Create Date	: 2017.07.31
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÊM THÔNG TIN CHI TIẾT
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoPhieuBaoHanh_DeleteChiTiet]
						 @PhieuBaoHanhChiTietId		=	21

						,@LOGIN_ID					=	68
						,@MESSAGE					=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.07.31 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuBaoHanh_DeleteChiTiet]
         @PhieuBaoHanhChiTietId		INT				=	NULL

		,@LOGIN_ID					INT				=	NULL
		,@MESSAGE					NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
--------------------------------------------------
DECLARE	@V_HAS_ERROR				BIT				=	0
----------
	SET @MESSAGE		= ''

	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '')
	IF(@LOGIN_ID = '')
		SET @LOGIN_ID = 0

----------
	IF @V_HAS_ERROR = 0 AND EXISTS (	SELECT	PhieuBaoHanhChiTietId 
										FROM	KhoPhieuBaoHanhChiTiet KPBHCT
												LEFT JOIN KhoPhieuBaoHanh KPBH ON KPBHCT.PhieuBaoHanhId = KPBH.PhieuBaoHanhId
										WHERE KPBHCT.PhieuBaoHanhChiTietId = @PhieuBaoHanhChiTietId AND KPBH.TrangThaiTiepNhan = 'PBH_KT')
	BEGIN
		SET @V_HAS_ERROR = 1
		SET @MESSAGE = N'TRANG_THAI|1|Phiếu bảo hành đã kết thúc'
	END
----------
	IF @V_HAS_ERROR = 0
		SELECT * FROM KhoPhieuBaoHanhChiTiet WHERE PhieuBaoHanhChiTietId = @PhieuBaoHanhChiTietId
	ELSE
		SELECT * FROM KhoPhieuBaoHanhChiTiet WHERE PhieuBaoHanhChiTietId = 0
----------
	IF @V_HAS_ERROR = 0
		DELETE FROM KhoPhieuBaoHanhChiTiet
		WHERE		PhieuBaoHanhChiTietId = @PhieuBaoHanhChiTietId
----------
	RETURN
--------------------------------------------------
END