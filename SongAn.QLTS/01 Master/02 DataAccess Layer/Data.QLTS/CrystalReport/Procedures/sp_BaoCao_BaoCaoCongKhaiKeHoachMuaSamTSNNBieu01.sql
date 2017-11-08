USE [QLTS]
GO

/*
EXEC [dbo].[sp_BaoCao_BaoCaoCongKhaiKeHoachMuaSamTSNNBieu01] @TuNgay = '2017-10-05 02:12:35', -- datetime
    @DenNgay = '2017-10-05 02:12:35', -- datetime
    @NhanVienId = N'1', -- nvarchar(10)
    @CoSoId = N'1' -- nvarchar(10)
*/

ALTER PROC [dbo].[sp_BaoCao_BaoCaoCongKhaiKeHoachMuaSamTSNNBieu01]
( 
	@TuNgay DATETIME,
	@DenNgay DATETIME,
	@NhanVienId NVARCHAR(10),
	@CoSoId NVARCHAR(10)
)
AS  
BEGIN
------------------------------------------------  

	SELECT CS.MaCoSo, CS.TenCoSo, LTS.TenLoai, NTS.TenNhom, @TuNgay TuNgay, @DenNgay DenNgay,
			L.TenTaiSan, L.DonViTinh, L.SoLuong, L.DonGia, HT.TenHinhThuc, L.DuToan, L.Ngay, L.GhiChu,L.MoTa
	FROM dbo.KeHoachMuaSam H
	JOIN dbo.KeHoachMuaSamChiTiet L ON L.MuaSamId = H.MuaSamId
	LEFT JOIN dbo.LoaiTaiSan LTS ON LTS.LoaiId = L.LoaiId
	LEFT JOIN dbo.NhomTaiSan NTS ON NTS.NhomId = LTS.NhomId
	LEFT JOIN dbo.HinhThuc HT ON HT.HinhThucId = L.HinhThucId
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = H.CoSoId
	WHERE H.CoSoId = @CoSoId
	AND H.Nam = YEAR(@TuNgay)
	
-----------------------------------------------------
END

