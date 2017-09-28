/**************************************************
1. Create Date	: 2017.09.25
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_DanhGia_DeleteDanhGia]
					 @DanhGiaId				=	84

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
ALTER PROCEDURE [dbo].[sp_DanhGia_DeleteDanhGia]
	 @DanhGiaId				INT				=	NULL

	,@COSO_ID				INT				=	NULL
	,@NHANVIEN_ID			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ
	DECLARE  @V_TRANS_NAME		NVARCHAR(MAX)	=	N'DG_DELETE'
			,@TaiSanId			INT				=	NULL

	-- INPUT DEFAULT
	SET @DanhGiaId		=	ISNULL(@DanhGiaId, 0)
	SET @COSO_ID		=	ISNULL(@COSO_ID, 0)
	SET @NHANVIEN_ID	=	ISNULL(@NHANVIEN_ID, 0)
	SET @MESSAGE		=	ISNULL(@MESSAGE, '')

BEGIN TRY

BEGIN TRANSACTION @V_TRANS_NAME

	IF @DanhGiaId = 0
	BEGIN
		SET @MESSAGE	=	N'DanhGiaId|1|Không tìm thấy thông tin đánh giá';
		THROW 51000, @MESSAGE, 1;
	END

	SELECT @TaiSanId = TaiSanId FROM DanhGia WHERE DanhGiaId = @DanhGiaId

	-- UPDATE TÀI SẢN
	UPDATE	TS
	SET		 TS.HaoMonLuyKe		=	ISNULL(DG.HaoMonLuyKeCu,TS.HaoMonLuyKe)
			,TS.SoNamSuDung		=	ISNULL(DG.SoNamSuDungCu,TS.SoNamSuDung)
			,TS.TyLeHaoMon		=	ISNULL(DG.TyLeHaoMonCu,TS.TyLeHaoMon)
	FROM	TaiSan TS
			LEFT JOIN DanhGia DG ON TS.TaiSanId = DG.TaiSanId AND DG.DanhGiaId = @DanhGiaId
	WHERE	DG.DanhGiaId = @DanhGiaId

	-- UPDATE NGUYÊN GIÁ
	SELECT		TS.TaiSanId,ISNULL(DG_NG.NguonNganSachId,NG.NguonNganSachId) NguonNganSachId,ISNULL(DG_NG.GiaTriCu,NG.GiaTri) GiaTriCu,ng.GiaTri
				,CASE WHEN DG_NG.NguonNganSachId IS NULL THEN 1 ELSE 0 END isCreate
	INTO		#DANHGIA_NGUYENGIA
	FROM		(	SELECT	DanhGia_NguyenGia.GiaTriCu,DanhGia_NguyenGia.NguonNganSachId,DanhGia.TaiSanId
					FROM	DanhGia_NguyenGia
							LEFT JOIN DanhGia ON DanhGia_NguyenGia.DanhGiaId = DanhGia.DanhGiaId
					WHERE	DanhGia_NguyenGia.DanhGiaId = @DanhGiaId ) DG_NG
				FULL JOIN (	SELECT * 
							FROM NguyenGia 
							WHERE TaiSanId = @TaiSanId ) NG ON DG_NG.NguonNganSachId = NG.NguonNganSachId
				LEFT JOIN TaiSan TS ON DG_NG.TaiSanId = TS.TaiSanId OR NG.TaiSanId = TS.TaiSanId
	WHERE TS.TaiSanId = @TaiSanId
	
	DELETE NguyenGia WHERE TaiSanId = @TaiSanId

	INSERT INTO NguyenGia (	TaiSanId	,NguonNganSachId		,GiaTri		)
	SELECT					@TaiSanId	,NG.NguonNganSachId		,NG.GiaTriCu
	FROM		#DANHGIA_NGUYENGIA NG
	WHERE		NG.isCreate = 0

	-- DELTE ĐÁNH GIÁ
	DELETE DanhGia_NguyenGia WHERE DanhGiaId = @DanhGiaId
	DELETE DanhGia WHERE DanhGiaId = @DanhGiaId

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
