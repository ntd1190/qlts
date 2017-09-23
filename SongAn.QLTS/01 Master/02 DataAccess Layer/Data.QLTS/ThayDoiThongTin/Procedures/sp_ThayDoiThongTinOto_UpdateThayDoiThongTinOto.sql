/**************************************************
1. Create Date	: 2017.09.15
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTinOto_UpdateThayDoiThongTinOto]
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
						,@NhanHieu				=	NULL
						,@BienKiemSoat			=	NULL
						,@CongSuatXe			=	NULL
						,@TrongTai				=	NULL
						,@ChucDanh				=	NULL
						,@NguonGocXe			=	NULL
						,@LoaiXe				=	NULL
						,@HienTrangSuDung		=	NULL

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.15 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_ThayDoiThongTinOto_UpdateThayDoiThongTinOto]
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
	,@NhanHieu				NVARCHAR(MAX)	=	NULL
	,@BienKiemSoat			NVARCHAR(MAX)	=	NULL
	,@CongSuatXe			NUMERIC(4,0)	=	NULL
	,@TrongTai				NUMERIC(4,0)	=	NULL
	,@ChucDanh				NVARCHAR(MAX)	=	NULL
	,@NguonGocXe			NVARCHAR(MAX)	=	NULL
	,@LoaiXe				INT				=	NULL
	,@HienTrangSuDung		INT				=	NULL

AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ
	DECLARE	@V_TRANS_NAME		NVARCHAR(500)	=	N'TDTT_OTO_UPDATE'
	-- THAY ĐỔI THÔNG TIN OTO
	,@NhanHieuCu			NVARCHAR(MAX)	=	NULL
	,@BienKiemSoatCu		NVARCHAR(MAX)	=	NULL
	,@CongSuatXeCu			NUMERIC(4,0)	=	NULL
	,@TrongTaiCu			NUMERIC(4,0)	=	NULL
	,@ChucDanhCu			NVARCHAR(MAX)	=	NULL
	,@NguonGocXeCu			NVARCHAR(MAX)	=	NULL
	,@LoaiXeCu				INT				=	NULL
	,@HienTrangSuDungCu		INT				=	NULL

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
	SELECT		 @TenTaiSanCu			=	ISNULL(TDTT.TenTaiSanCu, TS.TenTaiSan)
				,@BienKiemSoatCu		=	ISNULL(TDTT_Oto.BienKiemSoatCu, TTKK_Oto.BienKiemSoat)
				,@ChucDanhCu			=	ISNULL(TDTT_Oto.ChucDanhCu, TTKK_Oto.ChucDanh)
				,@CongSuatXeCu			=	ISNULL(TDTT_Oto.CongSuatXeCu, TTKK_Oto.CongSuatXe)
				,@HienTrangSuDungCu		=	ISNULL(TDTT_Oto.HienTrangSuDungCu, TTKK_Oto.HienTrangSuDung)
				,@LoaiXeCu				=	ISNULL(TDTT_Oto.LoaiXeCu, TTKK_Oto.LoaiXe)
				,@NguonGocXeCu			=	ISNULL(TDTT_Oto.NguonGocXeCu, TTKK_Oto.NguonGocXe)
				,@NhanHieuCu			=	ISNULL(TDTT_Oto.NhanHieuCu, TTKK_Oto.NhanHieu)
				,@TrongTaiCu			=	ISNULL(TDTT_Oto.TrongTaiCu, TTKK_Oto.TrongTai)
	FROM		ThayDoiThongTin TDTT
				LEFT JOIN ThayDoiThongTin_Oto TDTT_Oto ON TDTT.ThayDoiThongTinId = TDTT_Oto.ThayDoiThongTinId
				LEFT JOIN TaiSan TS ON TDTT.TaiSanId = TS.TaiSanId
				LEFT JOIN ThongTinKeKhai_Oto TTKK_Oto ON TDTT.TaiSanId = TTKK_Oto.TaiSanId
	WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId

	-- SET THÔNG TIN BỊ THAY ĐỔI
	IF @TenTaiSanCu			= @TenTaiSanMoi		SET @TenTaiSanCu		= NULL
	IF @NhanHieuCu			= @NhanHieu			SET @NhanHieuCu			= NULL
	IF @BienKiemSoatCu		= @BienKiemSoat		SET @BienKiemSoatCu		= NULL
	IF @CongSuatXeCu		= @CongSuatXe		SET @CongSuatXeCu		= NULL
	IF @TrongTaiCu			= @TrongTai			SET @TrongTaiCu			= NULL
	IF @ChucDanhCu			= @ChucDanh			SET @ChucDanhCu			= NULL
	IF @NguonGocXeCu		= @NguonGocXe		SET @NguonGocXeCu		= NULL
	IF @LoaiXeCu			= @LoaiXe			SET @LoaiXeCu			= NULL
	IF @HienTrangSuDungCu	= @HienTrangSuDung	SET @HienTrangSuDungCu	= NULL

BEGIN TRANSACTION @V_TRANS_NAME
	-- UPDATE THAY ĐỔI THÔNG TIN
	UPDATE	 ThayDoiThongTin	
	SET		 TenTaiSanCu	=	@TenTaiSanCu
			,LyDo			=	@LyDo
			,CtrVersion		=	CtrVersion + 1
	WHERE ThayDoiThongTinId = @ThayDoiThongTinId

	UPDATE	ThayDoiThongTin_Oto
	set		 BienKiemSoatCu			=	@BienKiemSoatCu
			,ChucDanhCu				=	@ChucDanhCu
			,CongSuatXeCu			=	@CongSuatXeCu
			,HienTrangSuDungCu		=	@HienTrangSuDungCu
			,LoaiXeCu				=	@LoaiXeCu
			,NguonGocXeCu			=	@NguonGocXeCu
			,NhanHieuCu				=	@NhanHieuCu
			,TrongTaiCu				=	@TrongTaiCu
	WHERE ThayDoiThongTinId = @ThayDoiThongTinId

	-- UPDATE TÊN TÀI SẢN MỚI
	UPDATE	TaiSan
	SET		TenTaiSan	=	@TenTaiSanMoi
	WHERE	TaiSanId = @TaiSanId

	-- UPDATE THÔNG TIN KE KHAI
	UPDATE		ThongTinKeKhai_Oto
	SET			NhanHieu		=	@NhanHieu
			   ,BienKiemSoat	=	@BienKiemSoat
			   ,CongSuatXe		=	@CongSuatXe
			   ,TrongTai		=	@TrongTai
			   ,ChucDanh		=	@ChucDanh
			   ,NguonGocXe		=	@NguonGocXe
			   ,LoaiXe			=	@LoaiXe
			   ,HienTrangSuDung	=	@HienTrangSuDung
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
