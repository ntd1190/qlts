USE [QLTS]
GO



ALTER PROC [dbo].[sp_KhoPhieuNhap_GetListKhoPhieuNhapById]
( 
	@KhoPhieuNhapId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	SELECT H.KhoPhieuNhapId, H.KhoTaiSanId, KTS.TenKhoTaiSan,H.NguonNganSachId, NNS.TenNguonNganSach, 
		   H.NhaCungCapId, NCC.TenNhaCungCap, CONVERT(VARCHAR, H.NgayNhap, 103)NgayNhap, H.SoPhieu, H.Seri, SoHoaDon, CONVERT(VARCHAR, H.NgayHD, 103)NgayHD, H.BBKiem, H.ChietKhau,
		   H.NguoiGiao, H.Loai, H.TaiKhoanNo, H.TaiKhoanCo,H.NoiDung, H.CoSoId, H.NguoiTao, NV.TenNhanVien TenNguoiTao,
		   H.NgayTao,H.CtrVersion
	FROM dbo.KhoPhieuNhap H
	LEFT JOIN dbo.KhoTaiSan KTS ON KTS.KhoTaiSanId = H.KhoTaiSanId
	LEFT JOIN dbo.NguonNganSach NNS ON NNS.NguonNganSachId = H.NguonNganSachId
	LEFT JOIN dbo.NhaCungCap NCC ON NCC.NhaCungCapId = H.NhaCungCapId
	LEFT JOIN dbo.NhanVien NV ON NV.NhanVienId = H.NguoiTao
	WHERE H.KhoPhieuNhapId = @KhoPhieuNhapId

-----------------------------------------------------
SET NOCOUNT OFF
END