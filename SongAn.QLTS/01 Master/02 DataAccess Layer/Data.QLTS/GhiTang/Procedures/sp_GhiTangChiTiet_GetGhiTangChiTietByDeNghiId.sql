ALTER PROC [dbo].[sp_GhiTangChiTiet_GetGhiTangChiTietByDeNghiId]
	@GhiTangId INT
AS  
BEGIN
SET NOCOUNT ON  

	SELECT ct.GhiTangChiTietId,
			ct.GhiTangId,
			CAST(ct.TaiSanId AS VARCHAR)TaiSanId,
			ts.MaTaiSan,
			ts.TenTaiSan,
			ts.DonViTinh,
			CAST(ct.PhongBanId AS VARCHAR)PhongBanId,
			pb.TenPhongBan,
			CONVERT(VARCHAR, ct.NgayBatDauSuDung,103)NgayBatDauSuDung,
			CAST(ct.NhanVienId AS VARCHAR)NhanVienId,
			nv.TenNhanVien,
			ct.SoLuong,
			ISNULL(SUM(ng.GiaTri),0) NguyenGia,
			ct.HopDongId, HD.SoHopDong
	FROM dbo.GhiTangChiTiet ct
	LEFT JOIN dbo.PhongBan pb ON pb.PhongBanId = ct.PhongBanId
	LEFT JOIN dbo.TaiSan ts ON ts.TaiSanId = ct.TaiSanId
	LEFT JOIN dbo.NguyenGia ng ON ng.TaiSanId = ts.TaiSanId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = ct.NhanVienId
	LEFT JOIN dbo.HopDong HD ON HD.HopDongId = ct.HopDongId
	WHERE ct.GhiTangId = @GhiTangId
	GROUP BY
			ct.GhiTangChiTietId,
			ct.GhiTangId,
			ct.TaiSanId,
			ts.MaTaiSan,
			ts.TenTaiSan,
			ts.DonViTinh,
			ct.PhongBanId,
			pb.TenPhongBan,
			ct.NgayBatDauSuDung,
			ct.NhanVienId,
			nv.TenNhanVien,
			ct.SoLuong,
			ct.HopDongId, HD.SoHopDong
	
SET NOCOUNT OFF
END
