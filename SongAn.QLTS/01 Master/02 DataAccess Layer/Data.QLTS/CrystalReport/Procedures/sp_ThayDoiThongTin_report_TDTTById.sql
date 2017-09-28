/**************************************************
1. Create Date	: 2017.09.27
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_ThayDoiThongTin_report_TDTTById]
						 @ThayDoiThongTinId			=	82
6. Precaution	:
7. History		:
				  2017.09.27 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_ThayDoiThongTin_report_TDTTById]
	@ThayDoiThongTinId		INT			=	NULL
AS  
BEGIN
SET NOCOUNT ON
--------------------------------------------------
SET @ThayDoiThongTinId = ISNULL(@ThayDoiThongTinId, 0)
SELECT		-- THÔNG TIN CHUNG
			 TDTT.Ngay,TS.LoaiKeKhai,CS.TenCoSo TenDonVi,CS_QL.TenCoSo TenDonViChuQuan
			--,TS.TenTaiSan				,TDTT.TenTaiSanCu
			,CASE WHEN TDTT.TenTaiSanCu IS NOT NULL THEN TS.TenTaiSan ELSE TDTT.TenTaiSanCu END TenTaiSan
			,ISNULL(TDTT.TenTaiSanCu,TS.TenTaiSan) TenTaiSanCu
			
			-- THÔNG TIN NHÀ
			
			--,TTKK_NHA.DiaChi			TTKK_NHA_DiaChi			,TDTT_NHA.DiaChiCu				TDTT_NHA_DiaChiCu
			,CASE WHEN TDTT_NHA.DiaChiCu IS NOT NULL THEN TTKK_NHA.DiaChi ELSE TDTT_NHA.DiaChiCu END TTKK_NHA_DiaChi
			,ISNULL(TDTT_NHA.DiaChiCu,TTKK_NHA.DiaChi) TDTT_NHA_DiaChiCu

			--,TTKK_NHA.DienTich			TTKK_NHA_DienTich			,TDTT_NHA.DienTichCu				TDTT_NHA_DienTichCu
			,CASE WHEN TDTT_NHA.DienTichCu IS NOT NULL THEN TTKK_NHA.DienTich ELSE TDTT_NHA.DienTichCu END TTKK_NHA_DienTich
			,ISNULL(TDTT_NHA.DienTichCu,TTKK_NHA.DienTich) TDTT_NHA_DienTichCu
			--,TTKK_NHA.TongDienTichSan			TTKK_NHA_TongDienTichSan			,TDTT_NHA.TongDienTichSanCu				TDTT_NHA_TongDienTichSanCu
			,CASE WHEN TDTT_NHA.TongDienTichSanCu IS NOT NULL THEN TTKK_NHA.TongDienTichSan ELSE TDTT_NHA.TongDienTichSanCu END TTKK_NHA_TongDienTichSan
			,ISNULL(TDTT_NHA.TongDienTichSanCu,TTKK_NHA.TongDienTichSan) TDTT_NHA_TongDienTichSanCu
			--,TTKK_NHA.BoTrong			TTKK_NHA_BoTrong			,TDTT_NHA.BoTrongCu				TDTT_NHA_BoTrongCu
			,CASE WHEN TDTT_NHA.BoTrongCu IS NOT NULL THEN TTKK_NHA.BoTrong ELSE TDTT_NHA.BoTrongCu END TTKK_NHA_BoTrong
			,ISNULL(TDTT_NHA.BoTrongCu,TTKK_NHA.BoTrong) TDTT_NHA_BoTrongCu
			--,TTKK_NHA.ChoThue			TTKK_NHA_ChoThue			,TDTT_NHA.ChoThueCu				TDTT_NHA_ChoThueCu
			,CASE WHEN TDTT_NHA.ChoThueCu IS NOT NULL THEN TTKK_NHA.ChoThue ELSE TDTT_NHA.ChoThueCu END TTKK_NHA_ChoThue
			,ISNULL(TDTT_NHA.ChoThueCu,TTKK_NHA.ChoThue) TDTT_NHA_ChoThueCu
			--,TTKK_NHA.CoSoHDSuNghiep	TTKK_NHA_CoSoHDSuNghiep		,TDTT_NHA.CoSoHDSuNghiepCu		TDTT_NHA_CoSoHDSuNghiepCu
			,CASE WHEN TDTT_NHA.CoSoHDSuNghiepCu IS NOT NULL THEN TTKK_NHA.CoSoHDSuNghiep ELSE TDTT_NHA.CoSoHDSuNghiepCu END TTKK_NHA_CoSoHDSuNghiep
			,ISNULL(TDTT_NHA.CoSoHDSuNghiepCu,TTKK_NHA.CoSoHDSuNghiep) TDTT_NHA_CoSoHDSuNghiepCu
			--,TTKK_NHA.LamTruSo			TTKK_NHA_LamTruSo			,TDTT_NHA.LamTruSoCu			TDTT_NHA_LamTruSoCu
			,CASE WHEN TDTT_NHA.LamTruSoCu IS NOT NULL THEN TTKK_NHA.LamTruSo ELSE TDTT_NHA.ChoThueCu END TTKK_NHA_LamTruSo
			,ISNULL(TDTT_NHA.LamTruSoCu,TTKK_NHA.LamTruSo) TDTT_NHA_LamTruSoCu
			--,TTKK_NHA.NhaO				TTKK_NHA_NhaO				,TDTT_NHA.NhaOCu				TDTT_NHA_NhaOCu
			,CASE WHEN TDTT_NHA.NhaOCu IS NOT NULL THEN TTKK_NHA.NhaO ELSE TDTT_NHA.NhaOCu END TTKK_NHA_NhaO
			,ISNULL(TDTT_NHA.NhaOCu,TTKK_NHA.NhaO) TDTT_NHA_NhaOCu

			-- THÔNG TIN ĐẤT
			
			--,TTKK_DAT.DiaChi			TTKK_DAT_DiaChi				,TDTT_DAT.DiaChiCu				TDTT_DAT_DiaChiCu
			,CASE WHEN TDTT_DAT.DiaChiCu IS NOT NULL THEN TTKK_DAT.DiaChi ELSE TDTT_DAT.DiaChiCu END TTKK_DAT_DiaChi
			,ISNULL(TDTT_DAT.DiaChiCu,TTKK_DAT.DiaChi) TDTT_DAT_DiaChiCu
			--,TTKK_DAT.DienTich			TTKK_DAT_DienTich			,TDTT_DAT.DienTichCu			TDTT_DAT_DienTichCu
			,CASE WHEN TDTT_DAT.DienTichCu IS NOT NULL THEN TTKK_DAT.DienTich ELSE TDTT_DAT.DienTichCu END TTKK_DAT_DienTich
			,ISNULL(TDTT_DAT.DienTichCu,TTKK_DAT.DienTich) TDTT_DAT_DienTichCu
			--,TTKK_DAT.LamTruSo			TTKK_DAT_LamTruSo			,TDTT_DAT.LamTruSoCu			TDTT_DAT_LamTruSoCu
			,CASE WHEN TDTT_DAT.LamTruSoCu IS NOT NULL THEN TTKK_DAT.LamTruSo ELSE TDTT_DAT.LamTruSoCu END TTKK_DAT_LamTruSo
			,ISNULL(TDTT_DAT.LamTruSoCu,TTKK_DAT.LamTruSo) TDTT_DAT_LamTruSoCu
			--,TTKK_DAT.CoSoHDSuNghiep	TTKK_DAT_CoSoHDSuNghiep		,TDTT_DAT.CoSoHDSuNghiepCu		TDTT_DAT_CoSoHDSuNghiepCu
			,CASE WHEN TDTT_DAT.CoSoHDSuNghiepCu IS NOT NULL THEN TTKK_DAT.CoSoHDSuNghiep ELSE TDTT_DAT.CoSoHDSuNghiepCu END TTKK_DAT_CoSoHDSuNghiep
			,ISNULL(TDTT_DAT.CoSoHDSuNghiepCu,TTKK_DAT.CoSoHDSuNghiep) TDTT_DAT_CoSoHDSuNghiepCu
			--,TTKK_DAT.NhaO				TTKK_DAT_NhaO				,TDTT_DAT.NhaOCu				NhaOCu
			,CASE WHEN TDTT_DAT.NhaOCu IS NOT NULL THEN TTKK_DAT.NhaO ELSE TDTT_DAT.NhaOCu END TTKK_DAT_NhaO
			,ISNULL(TDTT_DAT.NhaOCu,TTKK_DAT.NhaO) TDTT_DAT_NhaOCu
			--,TTKK_DAT.ChoThue			TTKK_DAT_ChoThue			,TDTT_DAT.ChoThueCu				TDTT_DAT_ChoThueCu
			,CASE WHEN TDTT_DAT.ChoThueCu IS NOT NULL THEN TTKK_DAT.ChoThue ELSE TDTT_DAT.ChoThueCu END TTKK_DAT_ChoThue
			,ISNULL(TDTT_DAT.ChoThueCu,TTKK_DAT.ChoThue) TDTT_DAT_ChoThueCu
			--,TTKK_DAT.BoTrong			TTKK_DAT_BoTrong			,TDTT_DAT.BoTrongCu				TDTT_DAT_BoTrongCu
			,CASE WHEN TDTT_DAT.BoTrongCu IS NOT NULL THEN TTKK_DAT.BoTrong ELSE TDTT_DAT.BoTrongCu END TTKK_DAT_BoTrong
			,ISNULL(TDTT_DAT.BoTrongCu,TTKK_DAT.BoTrong) TDTT_DAT_BoTrongCu

			-- THÔNG TIN OTO
			
			--,TTKK_OTO.BienKiemSoat			TTKK_OTO_BienKiemSoat			,TDTT_OTO.BienKiemSoatCu				TDTT_OTO_BienKiemSoatCu
			,CASE WHEN TDTT_OTO.BienKiemSoatCu IS NOT NULL THEN TTKK_OTO.BienKiemSoat ELSE TDTT_OTO.BienKiemSoatCu END TTKK_OTO_BienKiemSoat
			,ISNULL(TDTT_OTO.BienKiemSoatCu,TTKK_OTO.BienKiemSoat) TDTT_OTO_BienKiemSoatCu
			--,TTKK_OTO.LoaiXe			TTKK_OTO_LoaiXe			,TDTT_OTO.LoaiXeCu				TDTT_OTO_LoaiXeCu
			,CASE WHEN TDTT_OTO.LoaiXeCu IS NOT NULL THEN TTKK_OTO.LoaiXe ELSE TDTT_OTO.LoaiXeCu END TTKK_OTO_LoaiXe
			,ISNULL(TDTT_OTO.LoaiXeCu,TTKK_OTO.LoaiXe) TDTT_OTO_LoaiXeCu
			--,TTKK_OTO.TrongTai			TTKK_OTO_TrongTai			,TDTT_OTO.TrongTaiCu				TDTT_OTO_TrongTaiCu
			,CASE WHEN TDTT_OTO.TrongTaiCu IS NOT NULL THEN TTKK_OTO.TrongTai ELSE TDTT_OTO.TrongTaiCu END TTKK_OTO_TrongTai
			,ISNULL(TDTT_OTO.TrongTaiCu,TTKK_OTO.TrongTai) TDTT_OTO_TrongTaiCu

FROM		ThayDoiThongTin TDTT
			LEFT JOIN CoSo CS ON TDTT.CoSoId = CS.CoSoId
			LEFT JOIN CoSo CS_QL ON CS.TrucThuoc = CS_QL.CoSoId
			LEFT JOIN TaiSan TS ON TDTT.TaiSanId = TS.TaiSanId

			LEFT JOIN ThayDoiThongTin_Dat TDTT_DAT ON TDTT.ThayDoiThongTinId = TDTT_DAT.ThayDoiThongTinId
			LEFT JOIN ThongTinKeKhai_Dat TTKK_DAT ON TDTT.TaiSanId = TTKK_DAT.TaiSanId

			LEFT JOIN ThayDoiThongTin_Nha TDTT_NHA ON TDTT.ThayDoiThongTinId = TDTT_NHA.ThayDoiThongTinId
			LEFT JOIN ThongTinKeKhai_Nha TTKK_NHA ON TDTT.TaiSanId = TTKK_NHA.TaiSanId

			LEFT JOIN ThayDoiThongTin_Oto TDTT_OTO ON TDTT.ThayDoiThongTinId = TDTT_OTO.ThayDoiThongTinId
			LEFT JOIN ThongTinKeKhai_Oto TTKK_OTO ON TDTT.TaiSanId = TTKK_OTO.TaiSanId
WHERE		TDTT.ThayDoiThongTinId = @ThayDoiThongTinId
--------------------------------------------------
SET NOCOUNT OFF
END

