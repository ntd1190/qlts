ALTER PROC [dbo].[sp_GiayBaoHongChiTiet_GetGiayBaoHongChiTietById]
	@GiayBaoHongId INT
AS  
BEGIN
SET NOCOUNT ON  
	
	SELECT CT.GiayBaoHongChiTietId,
			CT.GiayBaoHongId,
			CT.TaiSanId,
			TS.TenTaiSan,
			CT.PhongBanId,
			PB.TenPhongBan,
			CT.NhanVienId,
			NV.TenNhanVien,
			CT.SoLuong,
			CT.LyDo,
			CT.GhiChu
	FROM dbo.GiayBaoHongChiTiet CT
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = CT.TaiSanId
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = CT.PhongBanId
	LEFT JOIN dbo.NhanVien NV ON NV.NhanVienId = CT.NhanVienId
	WHERE CT.GiayBaoHongId = @GiayBaoHongId
	
SET NOCOUNT OFF
END
