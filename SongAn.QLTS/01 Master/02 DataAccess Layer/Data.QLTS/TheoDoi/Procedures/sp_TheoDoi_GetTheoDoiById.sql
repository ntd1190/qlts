USE [QLTS]
GO


ALTER PROC [dbo].[sp_TheoDoi_GetTheoDoiById]
	@TaiSanId INT,
	@PhongBanId INT,
	@NhanVienId INT,
	@Nam NUMERIC(4,0)
AS  
BEGIN
SET NOCOUNT ON  

	SELECT CAST(TaiSanId AS VARCHAR)TaiSanId,
			CONVERT(VARCHAR, NgayGhiTang,103)NgayGhiTang,
			CONVERT(VARCHAR, NgayTrangCap,103)NgayTrangCap,
			CONVERT(VARCHAR, NgayBatDauSuDung, 103)NgayBatDauSuDung,
			CAST(td.PhongBanId AS VARCHAR)PhongBanId,
			pb.TenPhongBan,
			CAST(td.NhanVienId AS VARCHAR)NhanVienId,
			nv.TenNhanVien,
			SLTon,
			td.Nam,
			HD.HopDongId, HD.SoHopDong
	FROM dbo.TheoDoi td
	LEFT JOIN dbo.PhongBan pb ON pb.PhongBanId = td.PhongBanId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = td.NhanVienId
	LEFT JOIN dbo.HopDong HD ON HD.HopDongId = td.HopDongId
	WHERE TaiSanId = @TaiSanId
	AND td.PhongBanId = @PhongBanId
	AND td.NhanVienId = @NhanVienId
	AND td.Nam = @Nam
	
SET NOCOUNT OFF
END
