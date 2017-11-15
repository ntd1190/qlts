/***************************************************
1. Create Date	: 2017.11.15
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KD_DuLieu_Delete]
						 @DuLieuIds			=	2
						,@CtrVersion		=	0

						,@USER_ID			=	NULL
						,@NHANVIEN_ID		=	6
						,@MESSAGE			=	@MESSAGE	OUTPUT

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.11.15 (NGUYỄN THANH BÌNH) - Tạo mới
***************************************************/
ALTER PROCEDURE [dbo].[sp_KD_DuLieu_Delete]
	 @DuLieuIds			VARCHAR(MAX)		=	NULL
	,@CtrVersion		INT					=	NULL

	,@USER_ID			INT					=	NULL
	,@NHANVIEN_ID		INT					=	NULL
	,@FUNCTIONCODE		VARCHAR(MAX)		=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON;
BEGIN TRY
--------------------------------------------------
DECLARE @V_DULIEUID INT = NULL
	,@V_CTRVERSION INT = NULL

SET @USER_ID = ISNULL(@USER_ID,0)
SET @NHANVIEN_ID = ISNULL(@NHANVIEN_ID,0)
SET @MESSAGE = ''

SET @DuLieuIds = ISNULL(@DuLieuIds,'')
SET @CtrVersion = ISNULL(@CtrVersion,-1)

--SELECT @V_DULIEUID = DuLieuId
--	,@V_CTRVERSION = CtrVersion
--FROM KDDuLieu WHERE DuLieuId = @DuLieuId

--if @V_DULIEUID IS NULL
--BEGIN
--	SET @MESSAGE = N'DuLieuId|1|Không tìm thấy thông tin';
--	THROW 51000, @MESSAGE, 1;
--END

--if @V_CTRVERSION <> @CtrVersion
--BEGIN
--	SET @MESSAGE = N'CtrVersion|1|Có người dùng khác thay đổi thông tin';
--	THROW 51000, @MESSAGE, 1;
--END

SELECT * FROM KDDuLieu WHERE CHARINDEX('|' + CAST(DuLieuId AS VARCHAR(10)) + '|', '|' + @DuLieuIds + '|') > 0

DELETE KDDuLieu
WHERE CHARINDEX('|' + CAST(DuLieuId AS VARCHAR(10)) + '|', '|' + @DuLieuIds + '|') > 0

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