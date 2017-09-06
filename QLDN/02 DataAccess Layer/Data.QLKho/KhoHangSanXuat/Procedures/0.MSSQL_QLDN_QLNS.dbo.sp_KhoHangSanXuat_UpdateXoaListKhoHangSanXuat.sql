/*************************************************************  
1. Create Date	: 2017.06.07
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: UPDATE XÓA HÃNG SẢN XUẤT
4. Function		: QLDNKHO/KHOHANGSANXUAT/LIST
5. Example		: 
					EXEC [sp_KhoHangSanXuat_UpdateXoaListKhoHangSanXuat]
						@HANG_SAN_XUAT_IDS			= '1'
6. Precaution	:
7. History		:
				  2017.06.07(NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoHangSanXuat_UpdateXoaListKhoHangSanXuat]
	    @HANG_SAN_XUAT_IDS			NVARCHAR(4000)		= null
	
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
	SET @HANG_SAN_XUAT_IDS = ISNULL(@HANG_SAN_XUAT_IDS, '')
	IF(@HANG_SAN_XUAT_IDS = '')
		SET @HANG_SAN_XUAT_IDS = 0

	UPDATE KhoHangSanXuat
	SET 
		XoaYN = 'Y'
	WHERE
		CHARINDEX('|' + CAST(HangSanXuatId AS VARCHAR(20)) + '|', '|' + @HANG_SAN_XUAT_IDS + '|') > 0

	SELECT * FROM KhoHangSanXuat WHERE CHARINDEX('|' + CAST(HangSanXuatId AS VARCHAR(20)) + '|', '|' + @HANG_SAN_XUAT_IDS + '|') > 0
END