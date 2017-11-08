USE [QLTS]
GO



ALTER PROC [dbo].[sp_KhaiThac_GetListKhaiThacById]
( 
	@KhaiThacId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	SELECT	H.KhaiThacId, H.TaiSanId,H.PhongBanId,H.NhanVienId NhanVienIdKT, TS.TenTaiSan, TS.DonViTinh, 
			H.KhachHangNCCId, TenKhachHang, H.SoChungTu, H.SoLuongKhaiThac, H.DonGiaKhaiThac, 
			CONVERT(VARCHAR,H.ThoiGianBatDau,103)ThoiGianBatDau, CONVERT(VARCHAR,H.ThoiGianKetThuc,103)ThoiGianKetThuc, H.TienThu, H.NopNganSach, H.DonVi, H.GhiChu, 
			H.NguoiTao, nv.TenNhanVien TenNguoiTao, H.NgayTao, H.CtrVersion, HD.SoHopDong, H.HopDongId
	FROM dbo.KhaiThac H
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = H.NguoiTao 
	LEFT JOIN dbo.KhachHang KH ON KH.KhachHangId = H.KhachHangNCCId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = H.TaiSanId	
	LEFT JOIN dbo.HopDong HD ON HD.HopDongId = H.HopDongId
	WHERE H.KhaiThacId = @KhaiThacId

-----------------------------------------------------
SET NOCOUNT OFF
END
