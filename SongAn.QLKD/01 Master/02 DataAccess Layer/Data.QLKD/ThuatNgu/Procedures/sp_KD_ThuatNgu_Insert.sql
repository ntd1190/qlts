/***************************************************
1. Create Date	: 2017.10.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC sp_KD_ThuatNgu_Insert
						 @ThuatNguId	=	NULL
						,@MaThuatNgu	=	'TN001'
						,@ThuatNgu		=	N'Quận 12'
						,@ViDu			=	N'gò vấp'
						,@DienGiai		=	N'gò vấp'
						,@NguoiTao		=	NULL
						,@NgayTao		=	NULL
						,@CtrVersion	=	NULL
	
						,@USER_ID		=	NULL
						,@NHANVIEN_ID	=	6
						,@FUNCTIONCODE	=	''
						,@MESSAGE		=	@MESSAGE	OUTPUT

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.10.14 (NGUYỄN THANH BÌNH) - Tạo mới
***************************************************/
ALTER PROCEDURE sp_KD_ThuatNgu_Insert
	 @ThuatNguId	INT					=	NULL
	,@MaThuatNgu	VARCHAR(MAX)		=	NULL
	,@ThuatNgu		NVARCHAR(MAX)		=	NULL
	,@ViDu			NVARCHAR(MAX)		=	NULL
	,@DienGiai		NVARCHAR(MAX)		=	NULL
	,@NguoiTao		INT					=	NULL
	,@NgayTao		DATETIME			=	NULL
	,@CtrVersion	INT					=	NULL
	
	,@USER_ID		INT					=	NULL
	,@NHANVIEN_ID	INT					=	NULL
	,@FUNCTIONCODE	VARCHAR(MAX)		=	NULL
	,@MESSAGE		NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON;
BEGIN TRY
--------------------------------------------------
SET @USER_ID = ISNULL(@USER_ID,0)
SET @NHANVIEN_ID = ISNULL(@NHANVIEN_ID,0)
SET @MESSAGE = ''

SET @ThuatNguId = ISNULL(@ThuatNguId,0)
SET @NgayTao = ISNULL(@NgayTao,GETDATE())
SET @NguoiTao = ISNULL(@NguoiTao,@NHANVIEN_ID)
SET @CtrVersion = ISNULL(@CtrVersion,0)


INSERT INTO KDThuatNgu
	(MaThuatNgu		,ThuatNgu	,ViDu	,DienGiai	,NguoiTao	,NgayTao	,CtrVersion)
VALUES 
	(@MaThuatNgu	,@ThuatNgu	,@ViDu	,@DienGiai	,@NguoiTao	,@NgayTao	,@CtrVersion)

SET @ThuatNguId = @@IDENTITY

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

SELECT * FROM KDThuatNgu WHERE ThuatNguId = @ThuatNguId

SET NOCOUNT OFF;
END