/**************************************************
1. Create Date	: 2017.09.15
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTinNha_UpdateThayDoiThongTinNha]
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

						-- THÔNG TIN KÊ KHAI MỚI
						,@DiaChi				=	NULL
						,@GiayTo				=	NULL
						,@CapHang				=	NULL
						,@SoTang				=	NULL
						,@NamSuDung				=	NULL
						,@DienTich				=	NULL
						,@TongDienTichSan		=	NULL
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
ALTER PROCEDURE [dbo].[sp_ThayDoiThongTinNha_UpdateThayDoiThongTinNha]
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

	-- THÔNG TIN KÊ KHAI NHÀ MỚI
	,@ThuocDat				INT				=	NULL
	,@DiaChi				NVARCHAR(MAX)	=	NULL
	,@GiayTo				NVARCHAR(MAX)	=	NULL
	,@CapHang				INT				=	NULL
	,@SoTang				INT				=	NULL
	,@NamSuDung				NUMERIC(18,4)	=	NULL
	,@DienTich				NUMERIC(18,4)	=	NULL
	,@TongDienTichSan		NUMERIC(18,4)	=	NULL
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
	DECLARE	@V_TRANS_NAME		NVARCHAR(MAX)	=	N'TDTT_NHA_UPDATE'
	-- THAY ĐỔI THÔNG TIN NHÀ
	,@DiaChiCu				NVARCHAR(MAX)	=	NULL
	,@GiayToCu				NVARCHAR(MAX)	=	NULL
	,@CapHangCu				INT				=	NULL
	,@SoTangCu				INT				=	NULL
	,@NamSuDungCu			NUMERIC(18,4)	=	NULL
	,@DienTichCu			NUMERIC(18,4)	=	NULL
	,@TongDienTichSanCu		NUMERIC(18,4)	=	NULL
	,@LamTruSoCu			NUMERIC(18,4)	=	NULL
	,@CoSoHDSuNghiepCu		NUMERIC(18,4)	=	NULL
	,@NhaOCu				NUMERIC(18,4)	=	NULL
	,@ChoThueCu				NUMERIC(18,4)	=	NULL
	,@BoTrongCu				NUMERIC(18,4)	=	NULL
	,@BiLanChiemCu			NUMERIC(18,4)	=	NULL
	,@SuDungKhacCu			NUMERIC(18,4)	=	NULL

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

	-- LẤY THÔNG TIN KÊ KHAI CŨ
	SELECT		 @TenTaiSanCu		=	ISNULL(TDTT.TenTaiSanCu, TS.TenTaiSan)
				,@BiLanChiemCu		=	ISNULL(TDTT_Nha.BiLanChiemCu, TTKK_Nha.BiLanChiem)
				,@BoTrongCu			=	ISNULL(TDTT_Nha.BoTrongCu, TTKK_Nha.BoTrong)
				,@CapHangCu			=	ISNULL(TDTT_Nha.CapHangCu, TTKK_Nha.CapHang)
				,@ChoThueCu			=	ISNULL(TDTT_Nha.ChoThueCu, TTKK_Nha.ChoThue)
				,@CoSoHDSuNghiepCu	=	ISNULL(TDTT_Nha.CoSoHDSuNghiepCu, TTKK_Nha.CoSoHDSuNghiep)
				,@DiaChiCu			=	ISNULL(TDTT_Nha.DiaChiCu, TTKK_Nha.DiaChi)
				,@DienTichCu		=	ISNULL(TDTT_Nha.DienTichCu, TTKK_Nha.DienTich)
				,@GiayToCu			=	ISNULL(TDTT_Nha.GiayToCu, TTKK_Nha.GiayTo)
				,@LamTruSoCu		=	ISNULL(TDTT_Nha.LamTruSoCu, TTKK_Nha.LamTruSo)
				,@NamSuDungCu		=	ISNULL(TDTT_Nha.NamSuDungCu, TTKK_Nha.NamSuDung)
				,@NhaOCu			=	ISNULL(TDTT_Nha.NhaOCu, TTKK_Nha.NhaO)
				,@SoTangCu			=	ISNULL(TDTT_Nha.SoTangCu, TTKK_Nha.SoTang)
				,@SuDungKhacCu		=	ISNULL(TDTT_Nha.SuDungKhacCu, TTKK_Nha.SuDungKhac)
				,@TongDienTichSanCu	=	ISNULL(TDTT_Nha.TongDienTichSanCu, TTKK_Nha.TongDienTichSan)
	FROM		ThayDoiThongTin TDTT
				LEFT JOIN ThayDoiThongTin_Nha TDTT_Nha ON TDTT.ThayDoiThongTinId = TDTT_Nha.ThayDoiThongTinId
				LEFT JOIN TaiSan TS ON TDTT.TaiSanId = TS.TaiSanId
				LEFT JOIN ThongTinKeKhai_Nha TTKK_Nha ON TDTT.TaiSanId = TTKK_Nha.TaiSanId
	WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId

	IF @TenTaiSanCu			= @TenTaiSanMoi			SET @TenTaiSanCu		= NULL
	IF @DiaChiCu			= @DiaChi				SET @DiaChiCu			= NULL
	IF @GiayToCu			= @GiayTo				SET @GiayToCu			= NULL
	IF @CapHangCu			= @CapHang				SET @CapHangCu			= NULL
	IF @SoTangCu			= @SoTang				SET @SoTangCu			= NULL
	IF @NamSuDungCu			= @NamSuDung			SET @NamSuDungCu		= NULL
	IF @DienTichCu			= @DienTich				SET @DienTichCu			= NULL
	IF @TongDienTichSanCu	= @TongDienTichSan		SET @TongDienTichSanCu	= NULL
	IF @LamTruSoCu			= @LamTruSo				SET @LamTruSoCu			= NULL
	IF @CoSoHDSuNghiepCu	= @CoSoHDSuNghiep		SET @CoSoHDSuNghiepCu	= NULL
	IF @NhaOCu				= @NhaO					SET @NhaOCu				= NULL
	IF @ChoThueCu			= @ChoThue				SET @ChoThueCu			= NULL
	IF @BoTrongCu			= @BoTrong				SET @BoTrongCu			= NULL
	IF @BiLanChiemCu		= @BiLanChiem			SET @BiLanChiemCu		= NULL
	IF @SuDungKhacCu		= @SuDungKhac			SET @SuDungKhacCu		= NULL

	PRINT @DiaChi
	PRINT @DiaChiCu
	PRINT @GiayTo
	PRINT @GiayToCu

BEGIN TRANSACTION @V_TRANS_NAME
	-- UPDATE THAY ĐỔI THÔNG TIN
	UPDATE	 ThayDoiThongTin	
	SET		 TaiSanId		=	@TaiSanId
			,TenTaiSanCu	=	@TenTaiSanCu
			,Ngay			=	@Ngay
			,LyDo			=	@LyDo
			,CtrVersion		=	CtrVersion + 1
	WHERE ThayDoiThongTinId = @ThayDoiThongTinId

	-- UPDATE THAY ĐỔI THÔNG TIN NHÀ
	UPDATE	ThayDoiThongTin_Nha
	SET		 DiaChiCu			= @DiaChiCu
			,GiayToCu			= @GiayToCu
			,CapHangCu			= @CapHangCu
			,SoTangCu			= @SoTangCu
			,NamSuDungCu		= @NamSuDungCu
			,DienTichCu			= @DienTichCu
			,TongDienTichSanCu	= @TongDienTichSanCu
			,LamTruSoCu			= @LamTruSoCu
			,CoSoHDSuNghiepCu	= @CoSoHDSuNghiepCu
			,NhaOCu				= @NhaOCu
			,ChoThueCu			= @ChoThueCu
			,BoTrongCu			= @BoTrongCu
			,BiLanChiemCu		= @BiLanChiemCu
			,SuDungKhacCu		= @SuDungKhacCu
	WHERE ThayDoiThongTinId = @ThayDoiThongTinId

	-- UPDATE TÊN TÀI SẢN MỚI
	UPDATE	TaiSan
	SET		TenTaiSan	=	@TenTaiSanMoi
	WHERE	TaiSanId = @TaiSanId

	-- UPDATE THÔNG TIN KE KHAI
	UPDATE		ThongTinKeKhai_Nha
	SET			 DiaChi				=	@DiaChi
				,GiayTo				=	@GiayTo
				,CapHang			=	@CapHang
				,SoTang				=	@SoTang
				,NamSuDung			=	@NamSuDung
				,DienTich			=	@DienTich
				,TongDienTichSan	=	@TongDienTichSan
				,LamTruSo			=	@LamTruSo
				,CoSoHDSuNghiep		=	@CoSoHDSuNghiep
				,NhaO				=	@NhaO
				,ChoThue			=	@ChoThue
				,BoTrong			=	@BoTrong
				,BiLanChiem			=	@BiLanChiem
				,SuDungKhac			=	@SuDungKhac
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
