/*************************************************************  
1. Create Date	: 2017.06.05
2. Creator		: Nguyễn Thanh Bình
3. Description	: Update xóa kho loại hàng hóa
4. Function		: QLDNMAIN/KhoLoaiHangHoa/list
5. Example		: 
					DECLARE		 @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoLoaiHangHoa_UpdateXoaListKhoLoaiHangHoa]
					 @LOAI_HANG_HOA_IDS		= '1'
					,@LOGIN_ID				= '68'
					,@MESSAGE				=	@MESSAGE OUTPUT

					SELECT @MESSAGE
6. Precaution	:
7. History		:
				  2017.06.05(Nguyễn Thanh Bình) - Tạo mới
				  2017.07.25(NGUYỄN THANH BÌNH) - KIỂM TRA RÀNG BUỘC UPDATE XÓA
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoLoaiHangHoa_UpdateXoaListKhoLoaiHangHoa]
	    @LOAI_HANG_HOA_IDS		NVARCHAR(4000)		= null
	    ,@LOGIN_ID				INT					= null
		,@MESSAGE				NVARCHAR(MAX)		OUTPUT
	
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
	SET @MESSAGE = ISNULL(@MESSAGE, '')
	SET @LOAI_HANG_HOA_IDS = ISNULL(@LOAI_HANG_HOA_IDS, '')
	IF(@LOAI_HANG_HOA_IDS = '')
		SET @LOAI_HANG_HOA_IDS = 0

---- KIỂM TRA RÀNG BUỘC
	-- kiểm tra hàng hóa
	IF EXISTS (
		SELECT LoaiHangHoaId
		FROM KhoHangHoa
		WHERE CHARINDEX('|' + CAST(LoaiHangHoaId AS VARCHAR(20)) + '|', '|' + @LOAI_HANG_HOA_IDS + '|') > 0
	)
	BEGIN
	SET @MESSAGE = N'FOREIGN_KEY|0|Không thể xóa loại hàng hóa'
	SELECT * FROM KhoLoaiHangHoa WHERE LoaiHangHoaId = 0
	RETURN
	END
----------
	UPDATE KhoLoaiHangHoa
	SET 
		XoaYN = 'Y'
	WHERE
		CHARINDEX('|' + CAST(LoaiHangHoaId AS VARCHAR(20)) + '|', '|' + @LOAI_HANG_HOA_IDS + '|') > 0

	SELECT * FROM KhoLoaiHangHoa WHERE CHARINDEX('|' + CAST(LoaiHangHoaId AS VARCHAR(20)) + '|', '|' + @LOAI_HANG_HOA_IDS + '|') > 0
END