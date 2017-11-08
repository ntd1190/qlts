ALTER PROC [dbo].[sp_SuDung_GetListReportSuDungById]
( 
	@SuDungId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	--1:dat
	--2:nha
	--3:oto
	--4:tren 500
	
	SELECT CS.MaCoSo, CS.TenCoSo,
		   CAST(H.KyLap AS VARCHAR)KyLap,
		   H.Nam,
		   H.NoiDung,
		   H.NguoiTao,
		   NV.TenNhanVien TenNguoiTao,
		   H.NgayTao,
		   TS.MaTaiSan,
		   TS.TenTaiSan,
		   L.SoSanPhamPhucVu,
		   L.DonViTinhSanPham,
		   L.SoNguyenLieuSuDung,
		   L.DonViTinhNguyenLieu,
		   L.GhiChu,
		   CASE WHEN TS.LoaiKeKhai = 3 THEN N'Phương tiện đi lại' ELSE N'Tài sản cố định khác' END TenLoaiTaiSan,
		   YEAR(TD.NgayBatDauSuDung) NamSuDung,
		   SUM(ISNULL(NG.GiaTri,0)) NguyenGia,
		   SUM(ISNULL(NG.GiaTri,0)) - (
								DATEDIFF(YEAR, TS.NgayBDHaoMon, H.NgayTao) * (SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeHaoMon / 100)
								) GiaTriConLai
	FROM dbo.SuDung H
	JOIN dbo.SuDungChiTiet L ON L.SuDungId = H.SuDungId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = L.TaiSanId
	LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = ts.TaiSanId
	LEFT JOIN dbo.TheoDoi TD ON TD.TaiSanId = TS.TaiSanId AND TD.NhanVienId = l.NhanVienId AND TD.PhongBanId = l.PhongBanId AND H.Nam = YEAR(H.Nam)
	LEFT JOIN dbo.NhanVien NV ON NV.NhanVienId = h.NguoiTao
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = H.CoSoId
	WHERE H.SuDungId = @SuDungId
	GROUP BY
		   CS.MaCoSo, CS.TenCoSo,
		   H.KyLap,
		   H.Nam,
		   H.NoiDung,
		   H.NguoiTao,
		   NV.TenNhanVien,
		   H.NgayTao,
		   TS.MaTaiSan,
		   TS.TenTaiSan,
		   L.SoSanPhamPhucVu,
		   L.DonViTinhSanPham,
		   L.SoNguyenLieuSuDung,
		   L.DonViTinhNguyenLieu,
		   L.GhiChu,
		   TS.LoaiKeKhai,
		   TS.NgayBDHaoMon,
		   TS.TyLeHaoMon,
		   NgayBatDauSuDung
-----------------------------------------------------
SET NOCOUNT OFF
END

