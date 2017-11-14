/***************************************************
1. Create Date	: 2017.11.13
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC sp_KD_DiaBan_Update
						 @DiaBanId		=	3
						,@MaDiaBan		=	'DB001'
						,@TenDiaBan		=	N'Quận 12'
						,@DiaChi		=	N'gò vấp'
						,@NguoiTao		=	NULL
						,@NgayTao		=	NULL
						,@CtrVersion	=	0
	
						,@USER_ID		=	NULL
						,@NHANVIEN_ID	=	6
						,@MESSAGE		=	@MESSAGE	OUTPUT

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.11.13 (NGUYỄN THANH BÌNH) - Tạo mới
***************************************************/
ALTER PROCEDURE sp_KD_DiaBan_Update
	 @DiaBanId		INT					=	NULL
	,@MaDiaBan		VARCHAR(MAX)		=	NULL
	,@TenDiaBan		NVARCHAR(MAX)		=	NULL
	,@DiaChi		NVARCHAR(MAX)		=	NULL
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
DECLARE @V_DIABANID INT = NULL
	,@V_CTRVERSION INT = NULL

SET @USER_ID = ISNULL(@USER_ID,0)
SET @NHANVIEN_ID = ISNULL(@NHANVIEN_ID,0)
SET @MESSAGE = ''

SET @DiaBanId = ISNULL(@DiaBanId,0)
SET @CtrVersion = ISNULL(@CtrVersion,-1)

SELECT @V_DIABANID = DiaBanId
	,@V_CTRVERSION = CtrVersion
FROM KDDiaBan WHERE DiaBanId = @DiaBanId

if @V_DIABANID IS NULL
BEGIN
	SET @MESSAGE = N'DiaBanId|1|Không tìm thấy thông tin';
	THROW 51000, @MESSAGE, 1;
END

if @V_CTRVERSION <> @CtrVersion
BEGIN
	SET @MESSAGE = N'CtrVersion|1|Có người dùng khác thay đổi thông tin';
	THROW 51000, @MESSAGE, 1;
END

UPDATE KDDiaBan
SET  MaDiaBan = @MaDiaBan
	,TenDiaBan = @TenDiaBan
	,DiaChi = @DiaChi
	,CtrVersion = CtrVersion + 1
WHERE DiaBanId = @DiaBanId
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

SELECT * FROM KDDiaBan WHERE DiaBanId = @DiaBanId

SET NOCOUNT OFF;
END