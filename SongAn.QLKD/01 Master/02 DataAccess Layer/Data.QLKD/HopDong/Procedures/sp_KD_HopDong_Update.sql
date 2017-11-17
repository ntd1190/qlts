/***************************************************
1. Create Date	: 2017.11.16
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC sp_KD_HopDong_Update
						 @HopDongId			=	1
						,@SoHopDong			=	'002-HD'
						,@TenHopDong		=	N'ABC'
						,@LoaiHopDongId		=	NULL
						,@NhanVienId		=	70
						,@KhachHangId		=	1
						,@NgayHopDong		=	'2017-11-16'
						,@NgayThanhLy		=	NULL
						,@SoTien			=	20000000
						,@SoHoaDon			=	'HD'
						,@NgayHoaDon		=	'2017-11-16'
						,@ThanhToan			=	10000000
						,@TyLe				=	10
						,@Chi				=	'N'
						,@DuLieuId			=	26
						,@NguoiTao			=	NULL
						,@NgayTao			=	NULL
						,@CtrVersion		=	0
	
						,@USER_ID			=	NULL
						,@NHANVIEN_ID		=	70
						,@FUNCTIONCODE		=	''
						,@MESSAGE			=	@MESSAGE	OUTPUT

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.11.16 (NGUYỄN THANH BÌNH) - Tạo mới
***************************************************/
ALTER PROCEDURE sp_KD_HopDong_Update
	 @HopDongId			INT					=	NULL
	,@SoHopDong			VARCHAR(20)			=	NULL
	,@TenHopDong		NCHAR(10)			=	NULL
	,@LoaiHopDongId		INT					=	NULL
	,@NhanVienId		INT					=	NULL
	,@KhachHangId		INT					=	NULL
	,@NgayHopDong		DATETIME			=	NULL
	,@NgayThanhLy		DATETIME			=	NULL
	,@SoTien			NUMERIC(18, 4)		=	NULL
	,@SoHoaDon			VARCHAR(20)			=	NULL
	,@NgayHoaDon		DATETIME			=	NULL
	,@ThanhToan			INT					=	NULL
	,@TyLe				NUMERIC(4, 2)		=	NULL
	,@Chi				VARCHAR(2)			=	NULL
	,@DuLieuId			INT					=	NULL
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
DECLARE @V_HOPDONGID INT = NULL
	,@V_CTRVERSION INT = NULL

SET @USER_ID = ISNULL(@USER_ID,0)
SET @NHANVIEN_ID = ISNULL(@NHANVIEN_ID,0)
SET @FUNCTIONCODE = ISNULL(@FUNCTIONCODE,'')
SET @MESSAGE = ''

SET @HopDongId = ISNULL(@HopDongId,0)
SET @CtrVersion = ISNULL(@CtrVersion,-1)
IF @LoaiHopDongId = 0
	SET @LoaiHopDongId = NULL

SELECT @V_HOPDONGID = HopDongId
	,@V_CTRVERSION = CtrVersion
FROM KDHopDong WHERE HopDongId = @HopDongId

IF @V_HOPDONGID IS NULL
BEGIN
	SET @MESSAGE = N'HopDongId|1|Không tìm thấy thông tin';
	THROW 51000, @MESSAGE, 1;
END

IF @V_CTRVERSION <> @CtrVersion
BEGIN
	SET @MESSAGE = N'CtrVersion|1|Có người dùng khác thay đổi thông tin';
	THROW 51000, @MESSAGE, 1;
END

UPDATE KDHopDong
SET  SoHopDong		=	@SoHopDong
    ,TenHopDong		=	@TenHopDong
    ,LoaiHopDongId	=	@LoaiHopDongId
    ,NhanVienId		=	@NhanVienId
    ,KhachHangId	=	@KhachHangId
    ,NgayHopDong	=	@NgayHopDong
    ,NgayThanhLy	=	@NgayThanhLy
    ,SoTien			=	@SoTien
    ,SoHoaDon		=	@SoHoaDon
    ,NgayHoaDon		=	@NgayHoaDon
    ,ThanhToan		=	@ThanhToan
    ,TyLe			=	@TyLe
    ,Chi			=	@Chi
    ,DuLieuId		=	@DuLieuId
    ,CtrVersion		=	CtrVersion + 1
WHERE HopDongId = @HopDongId
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

SELECT * FROM KDHopDong WHERE HopDongId = @HopDongId

SET NOCOUNT OFF;
END