USE [QLTS]
GO


ALTER PROC [dbo].[sp_KhoPhieuNhap_GetListReportKhoPhieuNhapById]
( 
	@KhoPhieuNhapId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	DECLARE @ThanhTienChuaVAT NUMERIC(18,4)
	SELECT @ThanhTienChuaVAT = SUM(L.SoLuong * L.DonGia)
	FROM dbo.KhoPhieuNhapChiTiet L WHERE L.KhoPhieuNhapId = @KhoPhieuNhapId

	SELECT CS.MaCoSo, CS.TenCoSo, CS.DiaChi DiaChiCoSo,
		   KTS.TenKhoTaiSan, NNS.TenNguonNganSach, NCC.TenNhaCungCap, NCC.MaSoThue MaSoThueNCC, NCC.DiaChi DiaChiNCC,
		   H.NgayNhap, H.SoPhieu, H.Seri, SoHoaDon,H.NgayHD , H.BBKiem, H.ChietKhau,
		   H.NguoiGiao, H.Loai, H.TaiKhoanNo, H.TaiKhoanCo,H.NoiDung,

		   TS.MaTaiSan, TS.TenTaiSan, TS.DonViTinh, L.SoLuong, L.DonGia, L.VAT, L.DonGia * L.SoLuong ThanhTienChuaVAT,
		   dbo.Num2Text(@ThanhTienChuaVAT) DocSo
	FROM dbo.KhoPhieuNhap H
	JOIN dbo.KhoPhieuNhapChiTiet L ON L.KhoPhieuNhapId = H.KhoPhieuNhapId
	LEFT JOIN dbo.KhoTaiSan KTS ON KTS.KhoTaiSanId = H.KhoTaiSanId
	LEFT JOIN dbo.NguonNganSach NNS ON NNS.NguonNganSachId = H.NguonNganSachId
	LEFT JOIN dbo.NhaCungCap NCC ON NCC.NhaCungCapId = H.NhaCungCapId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = L.TaiSanId
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = H.CoSoId
	WHERE H.KhoPhieuNhapId = @KhoPhieuNhapId

-----------------------------------------------------
SET NOCOUNT OFF
END
