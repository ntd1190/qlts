/***************************************************
1. Create Date	: 2017.11.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC sp_KD_LoaiHopDong_GetById
						 @LoaiHopDongId		=	3
	
						,@USER_ID		=	NULL
						,@NHANVIEN_ID	=	6
						,@MESSAGE		=	@MESSAGE	OUTPUT

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.11.14 (NGUYỄN THANH BÌNH) - Tạo mới
***************************************************/
ALTER PROCEDURE sp_KD_LoaiHopDong_GetById
	 @LoaiHopDongId		INT					=	NULL
	
	,@USER_ID		INT					=	NULL
	,@NHANVIEN_ID	INT					=	NULL
	,@FUNCTIONCODE	VARCHAR(MAX)		=	NULL
	,@MESSAGE		NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON;
BEGIN TRY
--------------------------------------------------
DECLARE @V_ROWCOUNT INT = NULL

SET @USER_ID = ISNULL(@USER_ID,0)
SET @NHANVIEN_ID = ISNULL(@NHANVIEN_ID,0)
SET @MESSAGE = ''

SET @LoaiHopDongId = ISNULL(@LoaiHopDongId,0)

SELECT * FROM KDLoaiHopDong WHERE LoaiHopDongId = @LoaiHopDongId

SET @V_ROWCOUNT = @@ROWCOUNT

IF @V_ROWCOUNT = 0
BEGIN
	SET @MESSAGE = N'LoaiHopDongId|1|Không tìm thấy thông tin';
	THROW 51000, @MESSAGE, 1;
END

--------------------------------------------------
END TRY
BEGIN CATCH
	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
		RAISERROR (@ErrorMessage,@ErrorSeverity,@ErrorState);
END CATCH

SET NOCOUNT OFF;
END