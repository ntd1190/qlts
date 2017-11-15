/***************************************************
1. Create Date	: 2017.11.13
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC sp_KD_DuLieu_Update
						 @DuLieuId			=	'1'
						,@MaDuLieu			=	'DB001'
						,@TenDuLieu			=	N'Quận 12'
						,@ViTri				=	N'gò vấp'
						,@FileDinhKem		=	'122345'
						,@NguoiTao			=	NULL
						,@NgayTao			=	NULL
						,@CtrVersion		=	0
	
						,@USER_ID			=	NULL
						,@NHANVIEN_ID		=	6
						,@MESSAGE			=	@MESSAGE	OUTPUT

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.11.13 (NGUYỄN THANH BÌNH) - Tạo mới
***************************************************/
ALTER PROCEDURE sp_KD_DuLieu_Update
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
DECLARE @V_DULIEUID INT = NULL
	,@V_CTRVERSION INT = NULL

SET @USER_ID = ISNULL(@USER_ID,0)
SET @NHANVIEN_ID = ISNULL(@NHANVIEN_ID,0)
SET @MESSAGE = ''

SET @DuLieuId = ISNULL(@DuLieuId,0)
SET @CtrVersion = ISNULL(@CtrVersion,-1)

SELECT @V_DULIEUID = DuLieuId
	,@V_CTRVERSION = CtrVersion
FROM KDDuLieu WHERE DuLieuId = @DuLieuId

if @V_DULIEUID IS NULL
BEGIN
	SET @MESSAGE = N'DuLieuId|1|Không tìm thấy thông tin';
	THROW 51000, @MESSAGE, 1;
END

if @V_CTRVERSION <> @CtrVersion
BEGIN
	SET @MESSAGE = N'CtrVersion|1|Có người dùng khác thay đổi thông tin';
	THROW 51000, @MESSAGE, 1;
END

UPDATE KDDuLieu
SET  MaDuLieu = @MaDuLieu
	,TenDuLieu = @TenDuLieu
	,ViTri = @ViTri
	,FileDinhKem = @FileDinhKem
	,CtrVersion = CtrVersion + 1
WHERE DuLieuId = @DuLieuId
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