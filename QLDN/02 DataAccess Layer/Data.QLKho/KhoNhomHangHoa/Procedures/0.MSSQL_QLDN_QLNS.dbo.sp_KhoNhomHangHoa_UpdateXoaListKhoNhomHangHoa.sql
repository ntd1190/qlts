/*************************************************************  
1. Create Date	: 2017.07.25
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: UPDATE XÓA KHO HÀNG
4. Function		: QLDNKHO/KHONHOMHANGHOA/LIST
5. Example		: 
					DECLARE		 @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoNhomHangHoa_UpdateXoaListKhoNhomHangHoa]
					 @NHOMHANG_IDS			= '1'
					,@LOGIN_ID				= '68'
					,@MESSAGE				=	@MESSAGE OUTPUT

					SELECT @MESSAGE
6. Precaution	:
7. History		:
				  2017.07.25(NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoNhomHangHoa_UpdateXoaListKhoNhomHangHoa]
	     @NHOMHANG_IDS			NVARCHAR(MAX)		= null
	    ,@LOGIN_ID				INT					= null
		,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
	SET @MESSAGE = ISNULL(@MESSAGE, '')

	SET @NHOMHANG_IDS = ISNULL(@NHOMHANG_IDS, '')
	IF(@NHOMHANG_IDS = '')
		SET @NHOMHANG_IDS = 0

---- KIỂM TRA RÀNG BUỘC
	-- kiểm tra phiếu nhập
	IF EXISTS (
		SELECT NhomHangHoaId
		FROM KhoHangHoa 
		WHERE CHARINDEX('|' + CAST(NhomHangHoaId AS VARCHAR(20)) + '|', '|' + @NHOMHANG_IDS + '|') > 0
	)
	BEGIN
	SET @MESSAGE = N'FOREIGN_KEY|0|Không thể xóa nhóm hàng'
	SELECT * FROM KhoNhomHangHoa WHERE NhomHangHoaId = 0
	RETURN
	END
----------

	UPDATE KhoNhomHangHoa
	SET 
		XoaYN = 'Y'
	WHERE
		CHARINDEX('|' + CAST(NhomHangHoaId AS VARCHAR(20)) + '|', '|' + @NHOMHANG_IDS + '|') > 0

	SELECT * FROM KhoNhomHangHoa WHERE CHARINDEX('|' + CAST(NhomHangHoaId AS VARCHAR(20)) + '|', '|' + @NHOMHANG_IDS + '|') > 0
END

