USE [QLTS]
GO



ALTER PROC [dbo].[sp_BienBanKiemKe_GetListReportBienBanKiemKeById]
( 
	@BienBanKiemKeId INT
)
AS  
BEGIN
------------------------------------------------  
	-- giatriconlai = nguyengia - (hao mòn nam * so nam sd)
	
	SELECT NguoiKiemKe,ChucVu, DaiDien, VaiTro  FROM dbo.BanKiemKe WHERE BienBanKiemKeId = @BienBanKiemKeId

	SELECT	H.NgayKiemKe,
			H.NgayChungTu,
			H.SoChungTu,
			TS.MaTaiSan,
			ts.TenTaiSan,
			PB.TenPhongBan,
			L.SoLuong,
			L.SoLuongKiemKe,
			(L.SoLuongKiemKe - L.SoLuong) SoLuongChenhLech,
			SUM(ISNULL(NG.GiaTri,0)) NguyenGia,
			SUM(ISNULL(NG.GiaTri,0)) - (
								DATEDIFF(YEAR, TS.NgayBDHaoMon, H.NgayKiemKe) * (SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeHaoMon / 100)
								) GiaTriConLai,
			(L.SoLuong						* SUM(ISNULL(NG.GiaTri,0))) NguyenGiaKT,
			(L.SoLuongKiemKe				* SUM(ISNULL(NG.GiaTri,0))) NguyenGiaKK,
			((L.SoLuongKiemKe - L.SoLuong)	* SUM(ISNULL(NG.GiaTri,0))) NguyenGiaCL,
			(L.SoLuong						* (SUM(ISNULL(NG.GiaTri,0)) - (DATEDIFF(YEAR, TS.NgayBDHaoMon, H.NgayKiemKe) * (SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeHaoMon / 100)))) GiaTriKT,
			(L.SoLuongKiemKe				* (SUM(ISNULL(NG.GiaTri,0)) - (DATEDIFF(YEAR, TS.NgayBDHaoMon, H.NgayKiemKe) * (SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeHaoMon / 100)))) GiaTriKK,
			((L.SoLuongKiemKe - L.SoLuong)	* (SUM(ISNULL(NG.GiaTri,0)) - (DATEDIFF(YEAR, TS.NgayBDHaoMon, H.NgayKiemKe) * (SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeHaoMon / 100)))) GiaTriCL
			,H.GhiChu

	FROM dbo.BienBanKiemKe H
	JOIN dbo.BienBanKiemKeChiTiet L ON L.BienBanKiemKeId= h.BienBanKiemKeId
	LEFT JOIN dbo.PhongBan PB ON pb.PhongBanId = H.PhongBanId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = l.TaiSanId
	LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = ts.TaiSanId
	WHERE H.BienBanKiemKeId = @BienBanKiemKeId
	GROUP BY H.BienBanKiemKeId,
			ts.TaiSanId,
			TS.MaTaiSan,
			ts.TenTaiSan,
			H.PhongBanId,
			PB.TenPhongBan,
			L.SoLuong,
			L.SoLuongKiemKe,
			TS.NgayBDHaoMon,
			H.NgayKiemKe,
			H.NgayChungTu,
			TS.TyLeHaoMon,
			H.GhiChu,
			H.SoChungTu
	

-----------------------------------------------------
END
