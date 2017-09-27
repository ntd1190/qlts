/**************************************************
1. Create Date	: 2017.09.25
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @NguyenGiaList dbo.NguyenGiaType
					INSERT INTO @NguyenGiaList VALUES(0,1,9000000)
					INSERT INTO @NguyenGiaList VALUES(0,2,5000000)
					INSERT INTO @NguyenGiaList VALUES(0,3,2000000)

					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_DanhGia_UpdateDanhGia]
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
				  2017.09.25 (NGUYỄN THANH BÌNH) - Tạo mới
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
ALTER PROCEDURE [dbo].[sp_DanhGia_UpdateDanhGia]
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
	DECLARE  @V_TRANS_NAME		NVARCHAR(MAX)	=	N'DG_UPDATE'
			,@V_MATAISAN		NVARCHAR(MAX)	=	''

	-- INPUT DEFAULT
	SET @COSO_ID		=	ISNULL(@COSO_ID, 0)
	SET @NHANVIEN_ID	=	ISNULL(@NHANVIEN_ID, 0)
	SET @MESSAGE		=	ISNULL(@MESSAGE, '')

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

	-- LÂY THÔNG TIN CŨ TỪ DB
	SELECT	 @SLTonCu		= ISNULL(DG.SLTonCu, ISNULL(TD.SLTon + TD.SLTang - TD.SLGiam, 0))
			,@SoNamSuDungCu = ISNULL(DG.SoNamSuDungCu, TS.SoNamSuDung)
			,@TyLeHaoMonCu	= ISNULL(DG.TyLeHaoMonCu, TS.TyLeHaoMon)
			,@HaoMonLuyKeCu = ISNULL(DG.HaoMonLuyKeCu, TS.HaoMonLuyKe)
	FROM	DanhGia DG
			LEFT JOIN TaiSan TS ON DG.TaiSanId = TS.TaiSanId
			LEFT JOIN TheoDoi TD ON DG.NhanVienId = TD.NhanVienId AND DG.PhongBanId = TD.PhongBanId AND DG.TaiSanId = TD.TaiSanId
	WHERE	DG.DanhGiaId = @DanhGiaId

	-- SET THÔNG TIN BỊ THAY ĐỔI
	IF @SLTonCu				= @SLTon				SET @SLTonCu			= NULL
	IF @SoNamSuDungCu		= @SoNamSuDung			SET @SoNamSuDungCu		= NULL
	IF @TyLeHaoMonCu		= @TyLeHaoMon			SET @TyLeHaoMonCu		= NULL
	IF @HaoMonLuyKeCu		= @HaoMonLuyKe			SET @HaoMonLuyKeCu		= NULL

	PRINT CONCAT('@HaoMonLuyKeCu:',@HaoMonLuyKeCu)
	PRINT CONCAT('@HaoMonLuyKe:',@HaoMonLuyKe)
	-- INSERT ĐÁNH GIÁ
	UPDATE	DanhGia
	SET		 NoiDung		=	@NoiDung
			,HaoMonLuyKeCu	=	@HaoMonLuyKeCu
			,SoNamSuDungCu	=	@SoNamSuDungCu
			,TyLeHaoMonCu	=	@TyLeHaoMonCu
			,SLTonCu		=	@SLTonCu
	WHERE	DanhGiaId = @DanhGiaId

	-- INSERT ĐÁNH GIÁ NGUYÊN GIÁ TỪ BẢNG NGUYÊN GIÁ
	SELECT		TS.TaiSanId,ISNULL(DG_NG.NguonNganSachId,NG.NguonNganSachId) NguonNganSachId,ISNULL(DG_NG.GiaTriCu,NG.GiaTri) GiaTriCu,ng.GiaTri
	INTO		#DANHGIA_NGUYENGIA
	FROM		(	SELECT	DanhGia_NguyenGia.GiaTriCu,DanhGia_NguyenGia.NguonNganSachId,DanhGia.TaiSanId
					FROM	DanhGia_NguyenGia
							LEFT JOIN DanhGia ON DanhGia_NguyenGia.DanhGiaId = DanhGia.DanhGiaId
					WHERE	DanhGia_NguyenGia.DanhGiaId = @DanhGiaId ) DG_NG
				FULL JOIN (	SELECT * 
							FROM NguyenGia 
							WHERE TaiSanId = @TaiSanId ) NG ON DG_NG.NguonNganSachId = NG.NguonNganSachId
				LEFT JOIN TaiSan TS ON DG_NG.TaiSanId = TS.TaiSanId OR NG.TaiSanId = TS.TaiSanId
	
	DELETE DanhGia_NguyenGia WHERE DanhGiaId = @DanhGiaId

	INSERT INTO DanhGia_NguyenGia	(	DanhGiaId	,NguonNganSachId		,GiaTriCu		)
	SELECT								@DanhGiaId	,NG.NguonNganSachId		,NG.GiaTriCu
	FROM		(	SELECT	_NG.GiaTriCu, _NGL.GiaTri,_NG.NguonNganSachId
					FROM	#DANHGIA_NGUYENGIA _NG
							 JOIN @NguyenGiaList _NGL ON _NG.NguonNganSachId = _NGL.NguonNganSachId) NG
	WHERE		ISNULL(NG.GiaTri,0) <> ISNULL(NG.GiaTriCu,0)

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
	IF OBJECT_ID('tempdb..#DANHGIA_NGUYENGIA') IS NOT NULL
		DROP TABLE #DANHGIA_NGUYENGIA

	SELECT * FROM DanhGia WHERE DanhGiaId = @DanhGiaId
	SET NOCOUNT OFF;
END
