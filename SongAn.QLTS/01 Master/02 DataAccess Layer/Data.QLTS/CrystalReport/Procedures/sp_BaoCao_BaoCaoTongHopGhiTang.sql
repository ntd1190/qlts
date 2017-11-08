USE [QLTS]
GO

/*
EXEC [dbo].[sp_BaoCao_BaoCaoTongHopGhiTang] @TuNgay = '2017-10-05 02:12:35', -- datetime
    @DenNgay = '2017-10-05 02:12:35', -- datetime
    @NhanVienId = N'1', -- nvarchar(10)
    @CoSoId = N'1' -- nvarchar(10)
*/

ALTER PROC [dbo].[sp_BaoCao_BaoCaoTongHopGhiTang]
( 
	@TuNgay DATETIME,
	@DenNgay DATETIME,
	@NhanVienId NVARCHAR(10),
	@CoSoId NVARCHAR(10)
)
AS  
BEGIN
------------------------------------------------  
	SELECT	CS.MaCoSo, CS.TenCoSo,
			H.SoChungTu,
			H.NgayChungTu,
			H.NgayGhiTang,
			H.NoiDung,
			-----------------------------------------------line
			TS.TenTaiSan, LTS.TenLoai LoaiTaiSan, TS.NamSanXuat, NSX.TenNuocSanXuat, TS.SoQDTC, PB.TenPhongBan, NV.TenNhanVien, L.SoLuong,
			L.NgayBatDauSuDung, @TuNgay TuNgay, @DenNgay DenNgay

	FROM dbo.GhiTang H
	JOIN dbo.GhiTangChiTiet L ON L.GhiTangId = H.GhiTangId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = L.TaiSanId
	LEFT JOIN dbo.LoaiTaiSan LTS ON LTS.LoaiId = TS.LoaiId
	LEFT JOIN dbo.NuocSanXuat NSX ON NSX.NuocSanXuatId = TS.NuocSanXuatId
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = L.PhongBanId
	LEFT JOIN dbo.NhanVien NV ON NV.NhanVienId = L.NhanVienId
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = H.CoSoId
	WHERE CAST(H.NgayGhiTang AS DATE) BETWEEN CAST(@TuNgay AS DATE) AND CAST(@DenNgay AS DATE)
	AND CS.CoSoId= @CoSoId
	ORDER BY H.NgayChungTu, H.SoChungTu
-----------------------------------------------------
END
