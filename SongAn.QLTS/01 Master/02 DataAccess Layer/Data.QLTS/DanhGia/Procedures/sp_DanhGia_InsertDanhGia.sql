/**************************************************
1. Create Date	: 2017.09.20
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @NguyenGiaList dbo.NguyenGiaType
					INSERT INTO @NguyenGiaList VALUES(0,1,9000000)
					INSERT INTO @NguyenGiaList VALUES(0,2,5000000)
					INSERT INTO @NguyenGiaList VALUES(0,3,2000000)

					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_DanhGia_InsertDanhGia]
				---- THÔNG TIN ĐÁNH GIÁ
					 @DanhGiaId				=	NULL
					,@SoChungTu				=	N'CT0001'
					,@NgayChungTu			=	'2017-09-20'
					,@NgayDanhGia			=	'2017-09-20'
					,@NoiDung				=	NULL
					,@TaiSanId				=	1069
					,@PhongBanId			=	7
					,@NhanVienId			=	4
					,@SLTonCu				=	1
					,@SoNamSuDungCu			=	5
					,@TyLeHaoMonCu			=	20
					,@HaoMonLuyKeCu			=	0
					,@NguoiTao				=	7
					,@NgayTao				=	'2017-09-20'

				---- THÔNG TIN TÀI SẢN MỚI
					,@SoNamSuDung			=	5
					,@TyLeHaoMon			=	20
					,@HaoMonLuyKe			=	0
					,@SLTon					=	1

					,@NguyenGiaList			=	@NguyenGiaList

					,@COSO_ID				=	1
					,@NHANVIEN_ID			=	7
					,@MESSAGE				=	@MESSAGE	OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.20 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
/*
DROP TYPE NguyenGiaType
CREATE TYPE NguyenGiaType AS TABLE
( 
	TaiSanId			INT,
	NguonNganSachId		INT,
	GiaTri				numeric(18, 4)
)
*/
ALTER PROCEDURE [dbo].[sp_DanhGia_InsertDanhGia]
---- THÔNG TIN ĐÁNH GIÁ
	 @DanhGiaId				INT				=	NULL
	,@SoChungTu				NVARCHAR(MAX)	=	NULL
	,@NgayChungTu			DATETIME		=	NULL
	,@NgayDanhGia			DATETIME		=	NULL
	,@NoiDung				NVARCHAR(MAX)	=	NULL
	,@TaiSanId				INT				=	NULL
	,@PhongBanId			INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@SLTonCu				NUMERIC(18, 4)	=	NULL
	,@SoNamSuDungCu			INT				=	NULL
	,@TyLeHaoMonCu			NUMERIC(5,2)	=	NULL
	,@HaoMonLuyKeCu			NUMERIC(18,4)	=	NULL
	,@CoSoId				INT				=	NULL
	,@NguoiTao				INT				=	NULL
	,@NgayTao				DATETIME		=	NULL

---- THÔNG TIN TÀI SẢN MỚI
    ,@SoNamSuDung			INT				=	NULL
    ,@TyLeHaoMon			NUMERIC(5,2)	=	NULL
    ,@HaoMonLuyKe			NUMERIC(18,4)	=	NULL
    ,@SLTon					NUMERIC(18,4)	=	NULL

	,@NguyenGiaList		NguyenGiaType			READONLY

	,@COSO_ID				INT				=	NULL
	,@NHANVIEN_ID			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ
	DECLARE  @V_TRANS_NAME		NVARCHAR(MAX)	=	N'DG_INSERT'
			,@V_MATAISAN		NVARCHAR(MAX)	=	''

	-- INPUT DEFAULT
	SET @COSO_ID		=	ISNULL(@COSO_ID, 0)
	SET @NHANVIEN_ID	=	ISNULL(@NHANVIEN_ID, 0)
	SET @MESSAGE		=	ISNULL(@MESSAGE, '')

	SET	@TaiSanId		=	ISNULL(@TaiSanId, 0)
	SET	@NhanVienId		=	ISNULL(@NhanVienId, 0)
	SET	@PhongBanId		=	ISNULL(@PhongBanId, 0)
	SET	@NguoiTao		=	ISNULL(@NguoiTao, @NHANVIEN_ID)
	SET	@NgayTao		=	ISNULL(@NgayTao, GETDATE())

BEGIN TRY

BEGIN TRANSACTION @V_TRANS_NAME

	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE	=	N'TaiSanId|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END
	IF @NhanVienId = 0
	BEGIN
		SET @MESSAGE	=	N'NhanVienId|1|Không tìm thấy thông tin nhân viên';
		THROW 51000, @MESSAGE, 1;
	END
	IF @PhongBanId = 0
	BEGIN
		SET @MESSAGE	=	N'PhongBanId|1|Không tìm thấy thông tin phòng ban';
		THROW 51000, @MESSAGE, 1;
	END

	SELECT @SLTonCu			=	ISNULL(TD.SLTon + TD.SLTang - TD.SLGiam, 0)
	FROM TheoDoi TD
	WHERE TD.NhanVienId = @NhanVienId AND TD.PhongBanId = @PhongBanId AND TD.TaiSanId = @TaiSanId

	SELECT	@SoNamSuDungCu = SoNamSuDung
			,@TyLeHaoMonCu = TyLeHaoMon
			,@HaoMonLuyKeCu = HaoMonLuyKe
	FROM	TaiSan
	WHERE	TaiSanId = @TaiSanId

		-- SET THÔNG TIN BỊ THAY ĐỔI
	IF @SLTonCu				= @SLTon				SET @SLTonCu			= NULL
	IF @SoNamSuDungCu		= @SoNamSuDung			SET @SoNamSuDungCu		= NULL
	IF @TyLeHaoMonCu		= @TyLeHaoMon			SET @TyLeHaoMonCu		= NULL
	IF @HaoMonLuyKeCu		= @HaoMonLuyKeCu		SET @HaoMonLuyKeCu		= NULL

	-- INSERT ĐÁNH GIÁ
	INSERT INTO DanhGia	(	SoChungTu	,NgayChungTu	,NgayDanhGia	,NoiDung	,TaiSanId	,PhongBanId		,NhanVienId		,HaoMonLuyKeCu	,SoNamSuDungCu	,TyLeHaoMonCu	,SLTonCu	,CoSoId		,NguoiTao	,NgayTao	)
	VALUES				(	@SoChungTu	,@NgayChungTu	,@NgayDanhGia	,@NoiDung	,@TaiSanId	,@PhongBanId	,@NhanVienId	,@HaoMonLuyKeCu	,@SoNamSuDungCu	,@TyLeHaoMonCu	,@SLTonCu	,@COSO_ID	,@NguoiTao	,@NgayTao	)

	SET @DanhGiaId	=	@@IDENTITY

	-- INSERT ĐÁNH GIÁ NGUYÊN GIÁ TỪ BẢNG NGUYÊN GIÁ
	INSERT INTO DanhGia_NguyenGia	(	DanhGiaId	,NguonNganSachId		,GiaTriCu					)
	SELECT								@DanhGiaId	,NG_NEW.NguonNganSachId	,NG_OLD.GiaTri
	FROM		NguyenGia NG_OLD
				LEFT JOIN @NguyenGiaList NG_NEW ON NG_OLD.TaiSanId = @TaiSanId and NG_NEW.NguonNganSachId = NG_OLD.NguonNganSachId
	WHERE		NG_NEW.GiaTri <> NG_OLD.GiaTri

	INSERT INTO DanhGia_NguyenGia	(	DanhGiaId	,NguonNganSachId		,GiaTriCu					)
	SELECT								@DanhGiaId	,NG_NEW.NguonNganSachId	,NULL
	FROM		NguyenGia NG_OLD
				LEFT JOIN @NguyenGiaList NG_NEW ON NG_OLD.TaiSanId = @TaiSanId and NG_NEW.NguonNganSachId = NG_OLD.NguonNganSachId
	WHERE		NG_NEW.GiaTri = NG_OLD.GiaTri

	-- UPDATE THÔNG TIN TÀI SẢN MỚI
	UPDATE	TaiSan
	SET		 SoNamSuDung	=	@SoNamSuDung
			,TyLeHaoMon		=	@TyLeHaoMon
			,HaoMonLuyKe	=	@HaoMonLuyKe
	WHERE	TaiSanId = @TaiSanId

	-- UPDATE NGUYÊN GIÁ MỚI
	 DELETE NguyenGia WHERE TaiSanId = @TaiSanId

	INSERT INTO NguyenGia (	TaiSanId	,NguonNganSachId	,GiaTri )
	SELECT					@TaiSanId	,NguonNganSachId	,GiaTri
	FROM @NguyenGiaList

	
	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
	BEGIN
		RAISERROR	(@ErrorMessage, -- Message text.
					 @ErrorSeverity, -- Severity.
					 @ErrorState -- State.
					);
	END
END CATCH
	SELECT * FROM DanhGia WHERE DanhGiaId = @DanhGiaId
	SET NOCOUNT OFF;
END
