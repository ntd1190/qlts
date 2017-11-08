USE [QLTS]
GO



ALTER PROC [dbo].[sp_KhoPhieuNhapChiTiet_GetListKhoPhieuNhapChiTietById]
( 
	@KhoPhieuNhapId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	SELECT L.KhoPhieuNhapChiTietId, L.KhoPhieuNhapId,
		   L.TaiSanId, TS.TenTaiSan, TS.DonViTinh,
		   L.SoLuong, L.DonGia, L.GiaMua, L.GiaBan,
		   L.VAT, L.HanDung, L.LoSanXuat,
		   (L.SoLuong*L.DonGia)*L.VAT/100 TienThue
	FROM dbo.KhoPhieuNhapChiTiet L
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = L.TaiSanId
	WHERE L.KhoPhieuNhapId = @KhoPhieuNhapId

-----------------------------------------------------
SET NOCOUNT OFF
END