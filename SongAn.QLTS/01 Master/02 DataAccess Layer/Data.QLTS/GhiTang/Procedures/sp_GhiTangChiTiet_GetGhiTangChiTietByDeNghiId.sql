USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_GhiTangChiTiet_GetGhiTangChiTietByDeNghiId]    Script Date: 9/19/2017 10:38:58 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

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
			ISNULL(SUM(ng.GiaTri),0) NguyenGia
	FROM dbo.GhiTangChiTiet ct
	LEFT JOIN dbo.PhongBan pb ON pb.PhongBanId = ct.PhongBanId
	LEFT JOIN dbo.TaiSan ts ON ts.TaiSanId = ct.TaiSanId
	LEFT JOIN dbo.NguyenGia ng ON ng.TaiSanId = ts.TaiSanId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = ct.NhanVienId
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
			ct.SoLuong
	
SET NOCOUNT OFF
END
