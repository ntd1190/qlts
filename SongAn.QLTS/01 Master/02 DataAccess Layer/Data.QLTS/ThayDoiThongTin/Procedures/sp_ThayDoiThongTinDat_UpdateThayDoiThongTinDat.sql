/**************************************************
1. Create Date	: 2017.09.15
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTinDat_UpdateThayDoiThongTinDat]
						 @CoSoId				=	NULL
						,@NhanVienId			=	NULL
						,@MESSAGE				=	@MESSAGE	OUTPUT

						-- THAY ĐỔI THÔNG TIN
						,@ThayDoiThongTinId		=	NULL
						,@TaiSanId				=	NULL
						,@Ngay					=	NULL
						,@TenTaiSanCu			=	NULL
						,@LyDo					=	NULL
						,@DuyetId				=	NULL
						,@NguoiDuyet			=	NULL
						,@NguoiTao				=	NULL
						,@NgayTao				=	NULL
						,@CtrVersion			=	NULL

						-- THÔNG TIN TÀI SẢN MỚI
						,@TenTaiSanMoi			=	NULL

						-- THÔNG TIN KÊ KHAI ĐẤT MỚI
						,@DiaChi				=	NULL
						,@GiayTo				=	NULL
						,@DienTich				=	NULL
						,@LamTruSo				=	NULL
						,@CoSoHDSuNghiep		=	NULL
						,@NhaO					=	NULL
						,@ChoThue				=	NULL
						,@BoTrong				=	NULL
						,@BiLanChiem			=	NULL
						,@SuDungKhac			=	NULL

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.15 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_ThayDoiThongTinDat_UpdateThayDoiThongTinDat]
	 @CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT

	-- THAY ĐỔI THÔNG TIN
	,@ThayDoiThongTinId		INT				=	NULL
	,@TaiSanId				INT				=	NULL
	,@Ngay					DATETIME		=	NULL
	,@TenTaiSanCu			NVARCHAR(MAX)	=	NULL
	,@LyDo					NVARCHAR(MAX)	=	NULL
	,@DuyetId				INT				=	NULL
	,@NguoiDuyet			INT				=	NULL
	,@NguoiTao				INT				=	NULL
	,@NgayTao				DATETIME		=	NULL
	,@CtrVersion			INT				=	NULL

	-- THÔNG TIN TÀI SẢN MỚI
	,@TenTaiSanMoi			NVARCHAR(MAX)	=	NULL

	-- THÔNG TIN KÊ KHAI ĐẤT MỚI
	,@DiaChi				NVARCHAR(MAX)	=	NULL
	,@GiayTo				NVARCHAR(MAX)	=	NULL
	,@DienTich				NUMERIC(18,4)	=	NULL
	,@LamTruSo				NUMERIC(18,4)	=	NULL
	,@CoSoHDSuNghiep		NUMERIC(18,4)	=	NULL
	,@NhaO					NUMERIC(18,4)	=	NULL
	,@ChoThue				NUMERIC(18,4)	=	NULL
	,@BoTrong				NUMERIC(18,4)	=	NULL
	,@BiLanChiem			NUMERIC(18,4)	=	NULL
	,@SuDungKhac			NUMERIC(18,4)	=	NULL
AS
BEGIN
	SET NOCOUNT ON;
	-- BIẾN NỘI BỘ
	DECLARE	@V_TRANS_NAME		NVARCHAR(500)	=	N'TDTT_DAT_UPDATE'
	-- THAY ĐỔI THONG TIN ĐẤT
	,@DiaChiCu			NVARCHAR(MAX)		=	NULL
	,@GiayToCu			NVARCHAR(MAX)		=	NULL
	,@DienTichCu		NUMERIC(18, 4)		=	NULL
	,@LamTruSoCu		NUMERIC(18, 4)		=	NULL
	,@CoSoHDSuNghiepCu	NUMERIC(18, 4)		=	NULL
	,@NhaOCu			NUMERIC(18, 4)		=	NULL
	,@ChoThueCu			NUMERIC(18, 4)		=	NULL
	,@BoTrongCu			NUMERIC(18, 4)		=	NULL
	,@BiLanChiemCu		NUMERIC(18, 4)		=	NULL
	,@SuDungKhacCu		NUMERIC(18, 4)		=	NULL

	-- INPUT DEFAULT
	SET	@CoSoId			=	ISNULL(@CoSoId, 0)
	SET	@NhanVienId		=	ISNULL(@NhanVienId, 0)
	SET	@MESSAGE		=	ISNULL(@MESSAGE, '')

	SET	@LyDo			=	ISNULL(@LyDo, '')
	SET	@TaiSanId		=	ISNULL(@TaiSanId, 0)

BEGIN TRY
	-- KIỂM TRA @TaiSanId
	IF @TaiSanId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin tài sản';
		THROW 51000, @MESSAGE, 1;
	END

	-- KIỂM TRA @TaiSanId
	IF @ThayDoiThongTinId = 0
	BEGIN
		SET @MESSAGE = N'INPUT|1|Không tìm thấy thông tin';
		THROW 51000, @MESSAGE, 1;
	END

	-- LẤY THÔNG TIN KÊ KHAI CŨ
	SELECT		 @TenTaiSanCu		=	ISNULL(TenTaiSanCu, TS.TenTaiSan)
				,@BiLanChiemCu		=	ISNULL(TDTT_Dat.BiLanChiemCu, TTKK_Dat.BiLanChiem)
				,@BoTrongCu			=	ISNULL(TDTT_Dat.BoTrongCu, TTKK_Dat.BoTrong)
				,@ChoThueCu			=	ISNULL(TDTT_Dat.ChoThueCu, TTKK_Dat.ChoThue)
				,@CoSoHDSuNghiepCu	=	ISNULL(TDTT_Dat.CoSoHDSuNghiepCu, TTKK_Dat.CoSoHDSuNghiep)
				,@DiaChiCu			=	ISNULL(TDTT_Dat.DiaChiCu, TTKK_Dat.DiaChi)
				,@DienTichCu		=	ISNULL(TDTT_Dat.DienTichCu, TTKK_Dat.DienTich)
				,@GiayToCu			=	ISNULL(TDTT_Dat.GiayToCu, TTKK_Dat.GiayTo)
				,@LamTruSoCu		=	ISNULL(TDTT_Dat.LamTruSoCu, TTKK_Dat.LamTruSo)
				,@NhaOCu			=	ISNULL(TDTT_Dat.NhaOCu, TTKK_Dat.NhaO)
				,@SuDungKhacCu		=	ISNULL(TDTT_Dat.SuDungKhacCu, TTKK_Dat.SuDungKhac)
	FROM		ThayDoiThongTin TDTT
				LEFT JOIN ThayDoiThongTin_Dat TDTT_Dat ON TDTT.ThayDoiThongTinId = TDTT_Dat.ThayDoiThongTinId
				LEFT JOIN TaiSan TS ON TDTT.TaiSanId = TS.TaiSanId
				LEFT JOIN ThongTinKeKhai_Dat TTKK_Dat ON TDTT.TaiSanId = TTKK_Dat.TaiSanId
	WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId

	IF @TenTaiSanCu			= @TenTaiSanMoi			SET @TenTaiSanCu		= NULL
	IF @DiaChiCu			= @DiaChi				SET @DiaChiCu			= NULL
	IF @GiayToCu			= @GiayTo				SET @GiayToCu			= NULL
	IF @DienTichCu			= @DienTich				SET @DienTichCu			= NULL
	IF @LamTruSoCu			= @LamTruSo				SET @LamTruSoCu			= NULL
	IF @CoSoHDSuNghiepCu	= @CoSoHDSuNghiep		SET @CoSoHDSuNghiepCu	= NULL
	IF @NhaOCu				= @NhaO					SET @NhaOCu				= NULL
	IF @ChoThueCu			= @ChoThue				SET @ChoThueCu			= NULL
	IF @BoTrongCu			= @BoTrong				SET @BoTrongCu			= NULL
	IF @BiLanChiemCu		= @BiLanChiem			SET @BiLanChiemCu		= NULL
	IF @SuDungKhacCu		= @SuDungKhac			SET @SuDungKhacCu		= NULL

BEGIN TRANSACTION @V_TRANS_NAME
	-- UPDATE THAY ĐỔI THÔNG TIN
	UPDATE	 ThayDoiThongTin	
	SET		 TaiSanId		=	@TaiSanId
			,TenTaiSanCu	=	@TenTaiSanCu
			,Ngay			=	@Ngay
			,LyDo			=	@LyDo
			,CtrVersion		=	CtrVersion + 1
	WHERE ThayDoiThongTinId = @ThayDoiThongTinId

	-- UPDATE TÊN TÀI SẢN MỚI
	UPDATE	TaiSan
	SET		TenTaiSan	=	@TenTaiSanMoi
	WHERE	TaiSanId = @TaiSanId

	-- UPDATE THAY ĐỔI THÔNG TIN ĐẤT
	UPDATE	ThayDoiThongTin_Dat
	SET		 DiaChiCu			= @DiaChiCu
			,GiayToCu			= @GiayToCu
			,DienTichCu			= @DienTichCu
			,LamTruSoCu			= @LamTruSoCu
			,CoSoHDSuNghiepCu	= @CoSoHDSuNghiepCu
			,NhaOCu				= @NhaOCu
			,ChoThueCu			= @ChoThueCu
			,BoTrongCu			= @BoTrongCu
			,BiLanChiemCu		= @BiLanChiemCu
			,SuDungKhacCu		= @SuDungKhacCu
	WHERE ThayDoiThongTinId = @ThayDoiThongTinId

	-- UPDATE THÔNG TIN KE KHAI ĐẤT
	UPDATE		ThongTinKeKhai_Dat
	SET			 DiaChi			=	@DiaChi
				,GiayTo			=	@GiayTo
				,DienTich		=	@DienTich
				,LamTruSo		=	@LamTruSo
				,CoSoHDSuNghiep	=	@CoSoHDSuNghiep
				,NhaO			=	@NhaO
				,ChoThue		=	@ChoThue
				,BoTrong		=	@BoTrong
				,BiLanChiem		=	@BiLanChiem
				,SuDungKhac		=	@SuDungKhac
	WHERE		TaiSanId = @TaiSanId

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
	SELECT * FROM ThayDoiThongTin WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	SET NOCOUNT OFF;
END