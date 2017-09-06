/*************************************************************  
1. Create Date	: 2017.07.25
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: UPDATE XÓA KHO HÀNG
4. Function		: QLDNKHO/KHOKHOHANG/LIST
5. Example		: 
					DECLARE		 @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoKhachHang_UpdateXoaListKhachHang]
					 @KHACHHANG_IDS			= '1'
					,@LOGIN_ID				= '68'
					,@MESSAGE				=	@MESSAGE OUTPUT

					SELECT @MESSAGE
6. Precaution	:
7. History		:
				  2017.07.25(NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoKhachHang_UpdateXoaListKhachHang]
	    @KHACHHANG_IDS		NVARCHAR(MAX)		= NULL
		,@LOGIN_ID			INT					= NULL
		,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
	SET @KHACHHANG_IDS = ISNULL(@KHACHHANG_IDS, '')
	IF(@KHACHHANG_IDS = '')
		SET @KHACHHANG_IDS = 0

---- KIỂM TRA RÀNG BUỘC
	-- KIỂM TRA RÀNG BUỘC PHIẾU NHẬP
	IF EXISTS (
		SELECT KhachHangId
		FROM KhoPhieuNhap
		WHERE CHARINDEX('|' + CAST(KhachHangId AS VARCHAR(20)) + '|', '|' + @KHACHHANG_IDS + '|') > 0
	)
	BEGIN
	SET @MESSAGE = N'FOREIGN_KEY|1|Không thể xóa khách hàng'
	SELECT * FROM KhoKhachHang WHERE KhachHangId = 0
	RETURN
	END

	-- KIỂM TRA RÀNG BUỘC PHIẾU XUẤT
	IF EXISTS (
		SELECT KhachHangId
		FROM KhoPhieuXuat
		WHERE CHARINDEX('|' + CAST(KhachHangId AS VARCHAR(20)) + '|', '|' + @KHACHHANG_IDS + '|') > 0
	)
	BEGIN
	SET @MESSAGE = N'FOREIGN_KEY|2|Không thể xóa khách hàng'
	SELECT * FROM KhoKhachHang WHERE KhachHangId = 0
	RETURN
	END
	-- KIỂM TRA RÀNG BUỘC PHIẾU CHI
	IF EXISTS (
		SELECT KhachHangId
		FROM KhoPhieuChi
		WHERE CHARINDEX('|' + CAST(KhachHangId AS VARCHAR(20)) + '|', '|' + @KHACHHANG_IDS + '|') > 0
	)
	BEGIN
	SET @MESSAGE = N'FOREIGN_KEY|3|Không thể xóa khách hàng'
	SELECT * FROM KhoKhachHang WHERE KhachHangId = 0
	RETURN
	END
	-- KIỂM TRA RÀNG BUỘC PHIẾU THU
	IF EXISTS (
		SELECT KhachHangId
		FROM KhoPhieuThu
		WHERE CHARINDEX('|' + CAST(KhachHangId AS VARCHAR(20)) + '|', '|' + @KHACHHANG_IDS + '|') > 0
	)
	BEGIN
	SET @MESSAGE = N'FOREIGN_KEY|4|Không thể xóa khách hàng'
	SELECT * FROM KhoKhachHang WHERE KhachHangId = 0
	RETURN
	END
----------

	UPDATE KhoKhachHang
	SET 
		XoaYN = 'Y'
	WHERE
		CHARINDEX('|' + CAST(KhachHangId AS VARCHAR(20)) + '|', '|' + @KHACHHANG_IDS + '|') > 0

	SELECT * FROM KhoKhachHang WHERE CHARINDEX('|' + CAST(KhachHangId AS VARCHAR(20)) + '|', '|' + @KHACHHANG_IDS + '|') > 0
END

