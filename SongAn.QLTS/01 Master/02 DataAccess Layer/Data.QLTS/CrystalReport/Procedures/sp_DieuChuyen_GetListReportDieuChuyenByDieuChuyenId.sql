USE [QLTS]
GO

/*

EXEC dbo.sp_DieuChuyen_GetListReportDieuChuyenByDieuChuyenId @DieuChuyenId = N'6' -- nvarchar(10)

*/


ALTER PROC [dbo].[sp_DieuChuyen_GetListReportDieuChuyenByDieuChuyenId]
( 
	@DieuChuyenId NVARCHAR(10)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	SELECT	CS.MaCoSo, CS.TenCoSo,
			H.SoChungTu,
			H.NgayChungTu,
			H.NgayDieuChuyen,
			H.GhiChu,
			----------------------------------------------------line
			TS.TenTaiSan, TS.DonViTinh, PBSD.TenPhongBan PhongBanSuDung, PBCD.TenPhongBan PhongBanChuyenDen,
			NVSD.TenNhanVien NhanVienSuDung, NVTN.TenNhanVien NhanVienTiepNhan,
			L.SoLuong, L.LyDo

	FROM dbo.DieuChuyen H
	JOIN dbo.DieuChuyenChiTiet L ON L.DieuChuyenId = H.DieuChuyenId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = L.TaiSanId
	LEFT JOIN dbo.PhongBan PBSD ON PBSD.PhongBanId = L.PhongBanSuDung
	LEFT JOIN dbo.PhongBan PBCD ON PBCD.PhongBanId = L.PhongBanChuyenDen
	LEFT JOIN dbo.NhanVien NVSD ON NVSD.NhanVienId = L.NhanVienSuDung
	LEFT JOIN dbo.NhanVien NVTN ON NVTN.NhanVienId = L.NhanVienTiepNhan
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = H.CoSoId
	WHERE H.DieuChuyenId = @DieuChuyenId

-----------------------------------------------------
SET NOCOUNT OFF
END
