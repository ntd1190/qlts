USE [QLTS]
GO



ALTER PROC [dbo].[sp_GiayBaoHong_GetListReportGiayBaoHongById]
( 
	@GiayBaoHongId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	
	SELECT CS.MaCoSo, CS.TenCoSo, H.SoChungTu, PB.TenPhongBan,
			TS.TenTaiSan, TS.DonViTinh, TD.NgayBatDauSuDung, H.Ngay, L.LyDo, L.SoLuong, CS.GhiChu, SUM(ISNULL(NG.GiaTri,0)) * L.SoLuong GiaTriXuatDung
	FROM dbo.GiayBaoHong H 
	JOIN dbo.GiayBaoHongChiTiet L ON L.GiayBaoHongId = H.GiayBaoHongId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = L.TaiSanId
	LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = TS.TaiSanId
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = H.PhongBanId
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = H.CoSoId
	LEFT JOIN dbo.TheoDoi TD ON TD.TaiSanId = l.TaiSanId AND TD.NhanVienId = L.NhanVienId AND TD.PhongBanId = L.PhongBanId AND TD.Nam = YEAR(H.Ngay)
	WHERE H.GiayBaoHongId = @GiayBaoHongId
	GROUP BY CS.MaCoSo, CS.TenCoSo, H.SoChungTu, PB.TenPhongBan,
			L.TaiSanId, TS.TenTaiSan, TS.DonViTinh, TD.NgayBatDauSuDung, H.Ngay, L.LyDo, L.SoLuong, CS.GhiChu

-----------------------------------------------------
SET NOCOUNT OFF
END
