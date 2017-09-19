USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_DieuChuyenChiTiet_GetDieuChuyenChiTietByDieuChuyenId]    Script Date: 9/19/2017 10:35:12 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROC [dbo].[sp_DieuChuyenChiTiet_GetDieuChuyenChiTietByDieuChuyenId]
	@DieuChuyenId INT
AS  
BEGIN
SET NOCOUNT ON  

	SELECT ct.DieuChuyenChiTietId,
			ct.DieuChuyenId,
			CAST(ct.TaiSanId AS VARCHAR)TaiSanId,
			ts.MaTaiSan,
			ts.TenTaiSan,
			ts.DonViTinh,
			CAST(ct.PhongBanSuDung AS VARCHAR)PhongBanSuDung,
			pbsd.TenPhongBan TenPhongBanSuDung,
			CAST(ct.NhanVienSuDung AS VARCHAR)NhanVienSuDung,
			nvsd.TenNhanVien TenNhanVienSuDung,
			CAST(ct.PhongBanChuyenDen AS VARCHAR)PhongBanChuyenDen,
			pbcd.TenPhongBan TenPhongBanChuyenDen,
			CAST(ct.NhanVienTiepNhan AS VARCHAR)NhanVienTiepNhan,
			nvtn.TenNhanVien TenNhanVienTiepNhan,
			ct.SoLuong,
			ISNULL(td.SLTon + td.SLTang - td.SLGiam,0)SoLuongTon,
			ct.LyDo
	FROM dbo.DieuChuyenChiTiet ct
	LEFT JOIN dbo.TaiSan ts ON ts.TaiSanId = ct.TaiSanId
	LEFT JOIN dbo.PhongBan pbsd ON pbsd.PhongBanId = ct.PhongBanSuDung
	LEFT JOIN dbo.PhongBan pbcd ON pbcd.PhongBanId = ct.PhongBanChuyenDen
	LEFT JOIN dbo.NhanVien nvsd ON nvsd.NhanVienId = ct.NhanVienSuDung
	LEFT JOIN dbo.NhanVien nvtn ON nvtn.NhanVienId = ct.NhanVienTiepNhan
	LEFT JOIN dbo.TheoDoi td ON td.TaiSanId = ts.TaiSanId AND td.PhongBanId = ct.PhongBanSuDung AND td.NhanVienId = ct.NhanVienSuDung
	WHERE ct.DieuChuyenId = @DieuChuyenId


SET NOCOUNT OFF
END
