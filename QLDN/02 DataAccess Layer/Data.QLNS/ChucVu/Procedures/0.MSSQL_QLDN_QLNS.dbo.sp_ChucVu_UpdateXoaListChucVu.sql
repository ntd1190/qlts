/*************************************************************  
1. Create Date	: 2017.06.02
2. Creator		: Nguyen Thanh Binh
3. Description	: Update xoa thong tin chuc vu
4. Function		: QLDNMAIN/chucvu/list
5. Example		: 
					EXEC [sp_ChucVu_UpdateXoaChucVu]
						@ChucVuId			= 7
					  , @CtrVersion			= 1
6. Precaution	:
7. History		:
				  2017.06.02(Nguyen Thanh Binh) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_ChucVu_UpdateXoaChucVu]
	    @ChucVuId			int				= null
	  , @LoginId			int				= null
	  , @CtrVersion			INT				= null 
	
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
	SET @ChucVuId = ISNULL(@ChucVuId, '')
	IF(@ChucVuId = '')
		SET @ChucVuId = 0

	UPDATE ChucVu 
	SET 
		XoaYN = 'Y'
		, CtrVersion = CtrVersion + 1
	WHERE
		ChucVuId = @ChucVuId

	SELECT * FROM ChucVu WHERE ChucVuId = @ChucVuId
END