/*************************************************************  
1. Create Date	: 2017.06.07
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: UPDATE XÓA KHO HÀNG
4. Function		: QLDNKHO/KHOKHOHANG/LIST
5. Example		: 
					DECLARE		 @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoKhoHang_UpdateXoaListKhoKhoHang]
					 @KHO_HANG_IDS			= '1'
					,@LOGIN_ID				= '68'
					,@MESSAGE				=	@MESSAGE OUTPUT

					SELECT @MESSAGE
6. Precaution	:
7. History		:
				  2017.06.07(NGUYỄN THANH BÌNH) - Tạo mới
				  2017.07.24(NGUYỄN THANH BÌNH) - KIỂM TRA RÀNG BUỘC UPDATE XÓA
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoKhoHang_UpdateXoaListKhoKhoHang]
	    @KHO_HANG_IDS			NVARCHAR(MAX)		= null
	    ,@LOGIN_ID				INT					= null
		,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
	SET @KHO_HANG_IDS = ISNULL(@KHO_HANG_IDS, '')
	IF(@KHO_HANG_IDS = '')
		SET @KHO_HANG_IDS = 0

	-- KIỂM TRA RÀNG BUỘC

	-- kiểm tra phiếu nhập
	IF EXISTS (
		SELECT * 
		FROM KhoPhieuNhap 
		WHERE CHARINDEX('|' + CAST(KhoNhap AS VARCHAR(20)) + '|', '|' + @KHO_HANG_IDS + '|') > 0
	)
	BEGIN
	SET @MESSAGE = N'FOREIGN_KEY|0|Không thể xóa kho hàng'
	SELECT * FROM KhoKhoHang WHERE KhoHangId = 0
	RETURN
	END

	-- kiểm tra phiếu xuất
	IF EXISTS (
		SELECT * 
		FROM KhoPhieuXuat 
		WHERE CHARINDEX('|' + CAST(KhoXuat AS VARCHAR(20)) + '|', '|' + @KHO_HANG_IDS + '|') > 0
	)
	BEGIN
	SET @MESSAGE = N'FOREIGN_KEY|0|Không thể xóa kho hàng'
	SELECT * FROM KhoKhoHang WHERE KhoHangId = 0
	RETURN
	END

	-- kiểm tra phiếu chuyển
	IF EXISTS (
		SELECT * 
		FROM KhoPhieuChuyen 
		WHERE CHARINDEX('|' + CAST(KhoNhap AS VARCHAR(20)) + '|', '|' + @KHO_HANG_IDS + '|') > 0
				OR CHARINDEX('|' + CAST(KhoXuat AS VARCHAR(20)) + '|', '|' + @KHO_HANG_IDS + '|') > 0
	)
	BEGIN
	SET @MESSAGE = N'FOREIGN_KEY|0|Không thể xóa kho hàng'
	SELECT * FROM KhoKhoHang WHERE KhoHangId = 0
	RETURN
	END

	UPDATE KhoKhoHang
	SET 
		XoaYN = 'Y'
	WHERE
		CHARINDEX('|' + CAST(KhoHangId AS VARCHAR(20)) + '|', '|' + @KHO_HANG_IDS + '|') > 0

	SELECT * FROM KhoKhoHang WHERE CHARINDEX('|' + CAST(KhoHangId AS VARCHAR(20)) + '|', '|' + @KHO_HANG_IDS + '|') > 0
END

