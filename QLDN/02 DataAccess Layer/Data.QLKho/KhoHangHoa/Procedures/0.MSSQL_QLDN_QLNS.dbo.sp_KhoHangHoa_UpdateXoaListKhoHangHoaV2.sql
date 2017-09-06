/*************************************************************  
1. Create Date	: 2017.07.24
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: UPDATE XÓA HÀNG HÓA
4. Function		: QLDNKHO/KHOHANGHOA/LIST
5. Example		: 
					DECLARE		 @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoHangHoa_UpdateXoaListKhoHangHoaV2]
					 @HANG_HOA_IDS			= '16|22'
					,@MESSAGE				=	@MESSAGE OUTPUT

					SELECT @MESSAGE
6. Precaution	:
7. History		:
				  2017.07.24(NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoHangHoa_UpdateXoaListKhoHangHoaV2]
	     @HANG_HOA_IDS			NVARCHAR(MAX)		= null
		,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
	SET @MESSAGE = ISNULL(@MESSAGE, '')

	SET @HANG_HOA_IDS = ISNULL(@HANG_HOA_IDS, '')
	IF(@HANG_HOA_IDS = '')
		SET @HANG_HOA_IDS = 0

	-- KIỂM TRA RÀNG BUỘC

	-- kiểm tra phiếu nhập
	IF EXISTS (
		SELECT HangHoaId
		FROM KhoPhieuNhapChiTiet
		WHERE CHARINDEX('|' + CAST(HangHoaId AS VARCHAR(20)) + '|', '|' + @HANG_HOA_IDS + '|') > 0
	)
	BEGIN
	SET @MESSAGE = N'FOREIGN_KEY|0|Không thể xóa hàng hóa'
	SELECT * FROM KhoHangHoa WHERE HangHoaId = 0
	RETURN
	END

	-- kiểm tra phiếu xuất
	IF EXISTS (
		SELECT HangHoaId
		FROM KhoPhieuXuatChiTiet
		WHERE CHARINDEX('|' + CAST(HangHoaId AS VARCHAR(20)) + '|', '|' + @HANG_HOA_IDS + '|') > 0
	)
	BEGIN
	SET @MESSAGE = N'FOREIGN_KEY|0|Không thể xóa hàng hóa'
	SELECT * FROM KhoHangHoa WHERE HangHoaId = 0
	RETURN
	END

	-- kiểm tra phiếu chuyển
	IF EXISTS (
		SELECT HangHoaId
		FROM KhoPhieuChuyenChiTiet
		WHERE CHARINDEX('|' + CAST(HangHoaId AS VARCHAR(20)) + '|', '|' + @HANG_HOA_IDS + '|') > 0
	)
	BEGIN
	SET @MESSAGE = N'FOREIGN_KEY|0|Không thể xóa hàng hóa'
	SELECT * FROM KhoHangHoa WHERE HangHoaId = 0
	RETURN
	END

	UPDATE KhoHangHoa
	SET 
		XoaYN = 'Y'
	WHERE
		CHARINDEX('|' + CAST(HangHoaId AS VARCHAR(20)) + '|', '|' + @HANG_HOA_IDS + '|') > 0

	SELECT * FROM KhoHangHoa WHERE CHARINDEX('|' + CAST(HangHoaId AS VARCHAR(20)) + '|', '|' + @HANG_HOA_IDS + '|') > 0
END

