/***************************************************
1. Create Date	: 2017.11.15
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC sp_KD_DuLieu_Insert
						 @DuLieuId			=	NULL
						,@MaDuLieu			=	'DB001'
						,@TenDuLieu			=	N'Quận 12'
						,@ViTri				=	N'gò vấp'
						,@FileDinhKem		=	'122345'

						,@NguoiTao			=	NULL
						,@NgayTao			=	NULL
						,@CtrVersion		=	NULL
	
						,@USER_ID			=	NULL
						,@NHANVIEN_ID		=	6
						,@FUNCTIONCODE		=	''
						,@MESSAGE			=	@MESSAGE	OUTPUT

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.11.15 (NGUYỄN THANH BÌNH) - Tạo mới
***************************************************/
ALTER PROCEDURE sp_KD_DuLieu_Insert
	 @DuLieuId			INT					=	NULL
	,@MaDuLieu			VARCHAR(MAX)		=	NULL
	,@TenDuLieu			NVARCHAR(MAX)		=	NULL
	,@ViTri				NVARCHAR(MAX)		=	NULL
	,@FileDinhKem		VARCHAR(MAX)		=	NULL

	,@NguoiTao			INT					=	NULL
	,@NgayTao			DATETIME			=	NULL
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
SET @USER_ID = ISNULL(@USER_ID,0)
SET @NHANVIEN_ID = ISNULL(@NHANVIEN_ID,0)
SET @MESSAGE = ''

SET @DuLieuId = ISNULL(@DuLieuId,0)
SET @NgayTao = ISNULL(@NgayTao,GETDATE())
SET @NguoiTao = ISNULL(@NguoiTao,@NHANVIEN_ID)
SET @CtrVersion = ISNULL(@CtrVersion,0)


INSERT INTO KDDuLieu
	(MaDuLieu	,TenDuLieu	,ViTri	,FileDinhKem	,NguoiTao	,NgayTao	,CtrVersion)
VALUES 
	(@MaDuLieu	,@TenDuLieu	,@ViTri	,@FileDinhKem	,@NguoiTao	,@NgayTao	,@CtrVersion)

SET @DuLieuId = @@IDENTITY

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

SELECT * FROM KDDuLieu WHERE DuLieuId = @DuLieuId

SET NOCOUNT OFF;
END