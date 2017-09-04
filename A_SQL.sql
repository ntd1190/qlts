USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCapChiTiet_GetDeNghiTrangCapChiTietByDeNghiId]    Script Date: 9/4/2017 8:39:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

alter PROC [dbo].[sp_GhiTangChiTiet_GetGhiTangChiTietByDeNghiId]
	@GhiTangId INT
AS  
BEGIN
SET NOCOUNT ON  

	SELECT ct.GhiTangChiTietId,
			ct.GhiTangId,
			ct.TaiSanId,
			ts.TenTaiSan,
			ct.PhongBanId,
			pb.TenPhongBan,
			CONVERT(VARCHAR, ct.NgayBatDauSuDung,103)NgayBatDauSuDung,
			ct.NhanVienId,
			nv.TenNhanVien,
			ct.SoLuong
	FROM dbo.GhiTangChiTiet ct
	LEFT JOIN dbo.PhongBan pb ON pb.PhongBanId = ct.PhongBanId
	LEFT JOIN dbo.TaiSan ts ON ts.TaiSanId = ct.TaiSanId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = ct.NhanVienId
	WHERE ct.GhiTangId = @GhiTangId

	
SET NOCOUNT OFF
END
GO

