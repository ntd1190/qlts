USE [QLTS]
GO

ALTER PROCEDURE [dbo].[sp_ThayDoiThongTin_DeleteThayDoiThongTin]
	 @ThayDoiThongTinId		INT				=	NULL

	,@CoSoId				INT				=	NULL
	,@NhanVienId			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON

DECLARE  @V_TRANS_NAME			NVARCHAR(MAX)	=	N'TDTT_DELETE'
		,@V_TAISANID			INT				=	NULL
		,@V_NGAY				DATETIME		=	NULL
		,@V_LAOIKEKHAI			INT				=	NULL

BEGIN TRY
	SET @MESSAGE = ISNULL(@MESSAGE,'')

	SELECT		 @V_TAISANID = TS.TaiSanId
				,@V_LAOIKEKHAI = TS.LoaiKeKhai
				,@V_NGAY = Ngay
	FROM		ThayDoiThongTin TDTT
				LEFT JOIN TAISAN TS ON TDTT.TaiSanId = TS.TaiSanId
	WHERE TDTT.ThayDoiThongTinId = @ThayDoiThongTinId
	SELECT @V_TAISANID = TAISANID FROM THAYDOITHONGTIN WHERE THAYDOITHONGTINID = @THAYDOITHONGTINID

	IF EXISTS (SELECT 1 FROM THAYDOITHONGTIN WHERE TAISANID = @V_TAISANID AND THAYDOITHONGTINID <> @THAYDOITHONGTINID AND Ngay >= @V_NGAY)
	BEGIN
		SET @MESSAGE = N'NGAY|1|Không thể xóa vì đã có nhiều thay đổi';
		THROW 51000, @MESSAGE, 1;
	END

BEGIN TRANSACTION @V_TRANS_NAME

	-- UPDATE TÀI SẢN
	UPDATE		TS
	SET			TS.TenTaiSan = ISNULL(TDTT.TenTaiSanCu,TS.TenTaiSan)
	FROM		ThayDoiThongTin TDTT
				LEFT JOIN TaiSan TS ON TDTT.TaiSanId = TS.TaiSanId
	WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId

	-- UPDATE THÔNG TIN TÀI SẢN KÊ KHAI
	IF @V_LAOIKEKHAI = 1 -- ĐẤT
	BEGIN
		UPDATE		TTKK
		SET			 TTKK.BiLanChiem		=	ISNULL(TDTT_LOAI.BiLanChiemCu,TTKK.BiLanChiem)
					,TTKK.BoTrong			=	ISNULL(TDTT_LOAI.BoTrongCu,TTKK.BoTrong)
					,TTKK.ChoThue			=	ISNULL(TDTT_LOAI.ChoThueCu,TTKK.ChoThue)
					,TTKK.CoSoHDSuNghiep	=	ISNULL(TDTT_LOAI.CoSoHDSuNghiepCu,TTKK.CoSoHDSuNghiep)
					,TTKK.DiaChi			=	ISNULL(TDTT_LOAI.DiaChiCu,TTKK.DiaChi)
					,TTKK.DienTich			=	ISNULL(TDTT_LOAI.DienTichCu,TTKK.DienTich)
					,TTKK.GiayTo			=	ISNULL(TDTT_LOAI.GiayToCu,TTKK.GiayTo)
					,TTKK.LamTruSo			=	ISNULL(TDTT_LOAI.LamTruSoCu,TTKK.LamTruSo)
					,TTKK.NhaO				=	ISNULL(TDTT_LOAI.NhaOCu,TTKK.NhaO)
					,TTKK.SuDungKhac		=	ISNULL(TDTT_LOAI.SuDungKhacCu,TTKK.SuDungKhac)
		FROM		ThongTinKeKhai_Dat TTKK
					LEFT JOIN ThayDoiThongTin TDTT ON TTKK.TaiSanId = TDTT.TaiSanId
					LEFT JOIN ThayDoiThongTin_Dat TDTT_LOAI ON TDTT.ThayDoiThongTinId = TDTT_LOAI.ThayDoiThongTinId
		WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId
	END
	-- UPDATE THÔNG TIN TÀI SẢN KÊ KHAI
	ELSE IF @V_LAOIKEKHAI = 2 -- NHÀ
	BEGIN
		UPDATE		TTKK
		SET			 TTKK.BiLanChiem		=	ISNULL(TDTT_LOAI.BiLanChiemCu,TTKK.BiLanChiem)
					,TTKK.BoTrong			=	ISNULL(TDTT_LOAI.BoTrongCu,TTKK.BoTrong)
					,TTKK.CapHang			=	ISNULL(TDTT_LOAI.CapHangCu,TTKK.CapHang)
					,TTKK.ChoThue			=	ISNULL(TDTT_LOAI.ChoThueCu,TTKK.ChoThue)
					,TTKK.CoSoHDSuNghiep	=	ISNULL(TDTT_LOAI.CoSoHDSuNghiepCu,TTKK.CoSoHDSuNghiep)
					,TTKK.DiaChi			=	ISNULL(TDTT_LOAI.DiaChiCu,TTKK.DiaChi)
					,TTKK.DienTich			=	ISNULL(TDTT_LOAI.DienTichCu,TTKK.DienTich)
					,TTKK.GiayTo			=	ISNULL(TDTT_LOAI.GiayToCu,TTKK.GiayTo)
					,TTKK.LamTruSo			=	ISNULL(TDTT_LOAI.LamTruSoCu,TTKK.LamTruSo)
					,TTKK.NamSuDung			=	ISNULL(TDTT_LOAI.NamSuDungCu,TTKK.NamSuDung)
					,TTKK.NhaO				=	ISNULL(TDTT_LOAI.NhaOCu,TTKK.NhaO)
					,TTKK.SuDungKhac		=	ISNULL(TDTT_LOAI.SuDungKhacCu,TTKK.SuDungKhac)
					,TTKK.TongDienTichSan	=	ISNULL(TDTT_LOAI.TongDienTichSanCu,TTKK.TongDienTichSan)
		FROM		ThongTinKeKhai_Nha TTKK
					LEFT JOIN ThayDoiThongTin TDTT ON TTKK.TaiSanId = TDTT.TaiSanId
					LEFT JOIN ThayDoiThongTin_Nha TDTT_LOAI ON TDTT.ThayDoiThongTinId = TDTT_LOAI.ThayDoiThongTinId
		WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId
	END
	ELSE IF @V_LAOIKEKHAI = 3 -- OTO
	BEGIN
		UPDATE		TTKK
		SET			 TTKK.BienKiemSoat		=	ISNULL(TDTT_LOAI.BienKiemSoatCu,TTKK.BienKiemSoat)
					,TTKK.ChucDanh			=	ISNULL(TDTT_LOAI.ChucDanhCu,TTKK.ChucDanh)
					,TTKK.CongSuatXe		=	ISNULL(TDTT_LOAI.CongSuatXeCu,TTKK.CongSuatXe)
					,TTKK.HienTrangSuDung	=	ISNULL(TDTT_LOAI.HienTrangSuDungCu,TTKK.HienTrangSuDung)
					,TTKK.LoaiXe			=	ISNULL(TDTT_LOAI.LoaiXeCu,TTKK.LoaiXe)
					,TTKK.NguonGocXe		=	ISNULL(TDTT_LOAI.NguonGocXeCu,TTKK.NguonGocXe)
					,TTKK.NhanHieu			=	ISNULL(TDTT_LOAI.NhanHieuCu,TTKK.NhanHieu)
					,TTKK.TrongTai			=	ISNULL(TDTT_LOAI.TrongTaiCu,TTKK.TrongTai)
		FROM		ThongTinKeKhai_Oto TTKK
					LEFT JOIN ThayDoiThongTin TDTT ON TTKK.TaiSanId = TDTT.TaiSanId
					LEFT JOIN ThayDoiThongTin_Oto TDTT_LOAI ON TDTT.ThayDoiThongTinId = TDTT_LOAI.ThayDoiThongTinId
		WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId
	END
	ELSE IF @V_LAOIKEKHAI = 4 -- TRÊN 500 TRIỆU
	BEGIN
		UPDATE		TTKK
		SET			 TTKK.HienTrangSuDung	=	ISNULL(TDTT_LOAI.HienTrangSuDungCu,TTKK.HienTrangSuDung)
					,TTKK.KyHieu			=	ISNULL(TDTT_LOAI.KyHieuCu,TTKK.KyHieu)
		FROM		ThongTinKeKhai_Tren500 TTKK
					LEFT JOIN ThayDoiThongTin TDTT ON TTKK.TaiSanId = TDTT.TaiSanId
					LEFT JOIN ThayDoiThongTin_Tren500 TDTT_LOAI ON TDTT.ThayDoiThongTinId = TDTT_LOAI.ThayDoiThongTinId
		WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId
	END


	-- DELETE THAY ĐỔI THÔNG TIN
	DELETE ThayDoiThongTin_Dat WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	DELETE ThayDoiThongTin_Nha WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	DELETE ThayDoiThongTin_Oto WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	DELETE ThayDoiThongTin_Tren500 WHERE ThayDoiThongTinId = @ThayDoiThongTinId
	DELETE ThayDoiThongTin WHERE ThayDoiThongTinId = @ThayDoiThongTinId

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

SET NOCOUNT OFF
END

