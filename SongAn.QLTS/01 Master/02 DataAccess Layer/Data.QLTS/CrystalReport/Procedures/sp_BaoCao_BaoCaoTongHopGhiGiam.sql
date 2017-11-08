USE [QLTS]
GO

/*
EXEC [dbo].[sp_BaoCao_BaoCaoTongHopGhiGiam] @TuNgay = '2017-10-05 02:17:04', -- datetime
    @DenNgay = '2017-10-05 02:17:04', -- datetime
    @NhanVienId = N'1', -- nvarchar(10)
    @CoSoId = N'1' -- nvarchar(10)
*/


ALTER PROC [dbo].[sp_BaoCao_BaoCaoTongHopGhiGiam]
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
			H.NgayGhiGiam,
			H.NoiDung,
			-----------------------------------------------line
			TS.TenTaiSan, LTS.TenLoai LoaiTaiSan, TS.NamSanXuat, NSX.TenNuocSanXuat, TS.SoQDTC, PB.TenPhongBan, L.SoLuong,
			TD.NgayBatDauSuDung, @TuNgay TuNgay, @DenNgay DenNgay

	FROM dbo.GhiGiam H
	JOIN dbo.GhiGiamChiTiet L ON l.GhiGiamId = H.GhiGiamId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = L.TaiSanId
	LEFT JOIN dbo.LoaiTaiSan LTS ON LTS.LoaiId = TS.LoaiId
	LEFT JOIN dbo.NuocSanXuat NSX ON NSX.NuocSanXuatId = TS.NuocSanXuatId
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = L.PhongBanId
	LEFT JOIN TheoDoi TD ON l.TaiSanId = TD.TaiSanId and l.PhongBanId=TD.PhongBanId and l.NhanVienId=TD.NhanVienId AND TD.Nam = YEAR(@TuNgay)
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = H.CoSoId
	WHERE CAST(H.NgayGhiGiam AS DATE) BETWEEN CAST(@TuNgay AS DATE) AND CAST(@DenNgay AS DATE)
	AND CS.CoSoId= @CoSoId
	ORDER BY H.NgayChungTu, H.SoChungTu
-----------------------------------------------------
END
