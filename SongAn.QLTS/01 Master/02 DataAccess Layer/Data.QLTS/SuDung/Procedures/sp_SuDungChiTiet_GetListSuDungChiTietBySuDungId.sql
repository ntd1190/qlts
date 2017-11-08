USE [QLTS]
GO



ALTER PROC [dbo].[sp_SuDungChiTiet_GetListSuDungChiTietBySuDungId]
( 
	@SuDungId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	SELECT L.SuDungId,
		   CAST(L.TaiSanId AS VARCHAR)TaiSanId,
		   TS.TenTaiSan,
		   CAST(L.PhongBanId AS VARCHAR)PhongBanId,
		   PB.TenPhongBan,
		   CAST(L.NhanVienId AS VARCHAR)NhanVienId,
		   NV.TenNhanVien,
		   L.SoSanPhamPhucVu,
		   L.DonViTinhSanPham,
		   L.SoNguyenLieuSuDung,
		   L.DonViTinhNguyenLieu,
		   L.GhiChu
	FROM dbo.SuDungChiTiet L
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = L.TaiSanId
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = L.PhongBanId
	LEFT JOIN dbo.NhanVien NV ON NV.NhanVienId = L.NhanVienId
	WHERE SuDungId = @SuDungId

-----------------------------------------------------
SET NOCOUNT OFF
END