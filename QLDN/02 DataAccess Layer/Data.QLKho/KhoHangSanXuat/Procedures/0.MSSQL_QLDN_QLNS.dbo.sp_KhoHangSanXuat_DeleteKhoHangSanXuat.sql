/*************************************************************  
1. Create Date	: 2017.06.07
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: XÓA THÔNG TIN HÃNG SẢN XUẤT
4. Function		: QLDNKHO/KHOHANGSANXUAT/LIST
5. Example		: 
					EXEC [sp_KhoHangSanXuat_DeleteKhoHangSanXuat]
					   @HANG_SAN_XUAT_ID		=	'3'
					 , @LOGIN_ID				=	'1'

6. Precaution	:
7. History		:
				  2017.06.07 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoHangSanXuat_DeleteKhoHangSanXuat]
	    @HANG_SAN_XUAT_ID	NVARCHAR(20)	= null
	  , @LOGIN_ID			VARCHAR(20)		= null
	
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
	SET @HANG_SAN_XUAT_ID = ISNULL(@HANG_SAN_XUAT_ID, '')

	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '')
	IF(@LOGIN_ID = '')
		SET @LOGIN_ID = '0'

	DELETE FROM		KhoHangSanXuat
	WHERE			HangSanXuatId	=	@HANG_SAN_XUAT_ID

	SELECT @@ROWCOUNT RESULT
END