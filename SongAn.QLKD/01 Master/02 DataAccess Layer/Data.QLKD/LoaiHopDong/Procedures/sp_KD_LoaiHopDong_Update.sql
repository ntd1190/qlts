/***************************************************
1. Create Date	: 2017.11.13
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC sp_KD_LoaiHopDong_Update
						 @LoaiHopDongId		=	1
						,@MaLoaiHopDong		=	'DB001'
						,@TenLoaiHopDong	=	N'Quận 13'
						,@GhiChu			=	N'gò vấp'
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
ALTER PROCEDURE sp_KD_LoaiHopDong_Update
	 @LoaiHopDongId		INT					=	NULL
	,@MaLoaiHopDong		VARCHAR(MAX)		=	NULL
	,@TenLoaiHopDong	NVARCHAR(MAX)		=	NULL
	,@GhiChu			NVARCHAR(MAX)		=	NULL
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
DECLARE @V_LOAIHOPDONGID INT = NULL
	,@V_CTRVERSION INT = NULL

SET @USER_ID = ISNULL(@USER_ID,0)
SET @NHANVIEN_ID = ISNULL(@NHANVIEN_ID,0)
SET @MESSAGE = ''

SET @LoaiHopDongId = ISNULL(@LoaiHopDongId,0)
SET @CtrVersion = ISNULL(@CtrVersion,-1)

SELECT @V_LOAIHOPDONGID = LoaiHopDongId
	,@V_CTRVERSION = CtrVersion
FROM KDLoaiHopDong WHERE LoaiHopDongId = @LoaiHopDongId

if @V_LOAIHOPDONGID IS NULL
BEGIN
	SET @MESSAGE = N'LoaiHopDongId|1|Không tìm thấy thông tin';
	THROW 51000, @MESSAGE, 1;
END

if @V_CTRVERSION <> @CtrVersion
BEGIN
	SET @MESSAGE = N'CtrVersion|1|Có người dùng khác thay đổi thông tin';
	THROW 51000, @MESSAGE, 1;
END

UPDATE KDLoaiHopDong
SET  MaLoaiHopDong = @MaLoaiHopDong
	,TenLoaiHopDong = @TenLoaiHopDong
	,GhiChu = @GhiChu
	,CtrVersion = CtrVersion + 1
WHERE LoaiHopDongId = @LoaiHopDongId
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

SELECT * FROM KDLoaiHopDong WHERE LoaiHopDongId = @LoaiHopDongId

SET NOCOUNT OFF;
END