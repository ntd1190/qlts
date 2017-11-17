/***************************************************
1. Create Date	: 2017.11.16
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC sp_KD_HopDong_Insert
						 @HopDongId			=	0
						,@SoHopDong			=	'001-HD'
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
						,@CtrVersion		=	NULL
	
						,@USER_ID			=	NULL
						,@NHANVIEN_ID		=	70
						,@FUNCTIONCODE		=	''
						,@MESSAGE			=	@MESSAGE	OUTPUT

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.11.16 (NGUYỄN THANH BÌNH) - Tạo mới
***************************************************/
ALTER PROCEDURE sp_KD_HopDong_Insert
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
SET @USER_ID = ISNULL(@USER_ID,0)
SET @NHANVIEN_ID = ISNULL(@NHANVIEN_ID,0)
SET @MESSAGE = ''

SET @HopDongId = ISNULL(@HopDongId,0)
SET @NgayTao = ISNULL(@NgayTao,GETDATE())
SET @NguoiTao = ISNULL(@NguoiTao,@NHANVIEN_ID)
SET @CtrVersion = ISNULL(@CtrVersion,0)

IF @LoaiHopDongId = 0
	SET @LoaiHopDongId = NULL


INSERT INTO KDHopDong
	(SoHopDong			,TenHopDong		,LoaiHopDongId	,NhanVienId		,KhachHangId	,NgayHopDong
	,NgayThanhLy		,SoTien			,SoHoaDon		,NgayHoaDon		,ThanhToan		,TyLe
	,Chi,DuLieuId		,NguoiTao		,NgayTao		,CtrVersion)
VALUES
	(@SoHopDong			,@TenHopDong	,@LoaiHopDongId	,@NhanVienId	,@KhachHangId	,@NgayHopDong
	,@NgayThanhLy		,@SoTien		,@SoHoaDon		,@NgayHoaDon	,@ThanhToan		,@TyLe
	,@Chi,@DuLieuId		,@NguoiTao		,@NgayTao		,@CtrVersion)

SET @HopDongId = @@IDENTITY

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