USE [QLTS]
GO

/*
EXEC [dbo].[sp_BaoCao_BaoCaoCongKhaiChoThueTSNNBieu05] @TuNgay = '2017-10-05 02:12:35', -- datetime
    @DenNgay = '2017-10-05 02:12:35', -- datetime
    @NhanVienId = N'1', -- nvarchar(10)
    @CoSoId = N'1' -- nvarchar(10)
*/

ALTER PROC [dbo].[sp_BaoCao_BaoCaoCongKhaiChoThueTSNNBieu05]
( 
	@TuNgay DATETIME,
	@DenNgay DATETIME,
	@NhanVienId NVARCHAR(10),
	@CoSoId NVARCHAR(10)
)
AS  
BEGIN

------------------------------------------------  
	SELECT @TuNgay TuNgay, @DenNgay DenNgay, CS.MaCoSo, CS.TenCoSo,
			LTS.TenLoai, NTS.TenNhom, TS.TenTaiSan, 
			KT.SoChungTu, KHNCC.TenKhachHang TenKHNCC, KT.SoLuongKhaiThac, TS.DonViTinh, 
			KT.DonGiaKhaiThac, KT.ThoiGianBatDau, KT.ThoiGianKetThuc, KT.TienThu, KT.NopNganSach, KT.DonVi, KT.GhiChu
	FROM dbo.KhaiThac KT
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = KT.TaiSanId
	LEFT JOIN dbo.LoaiTaiSan LTS ON LTS.LoaiId = TS.LoaiId
	LEFT JOIN dbo.NhomTaiSan NTS ON NTS.NhomId = LTS.NhomId
	LEFT JOIN dbo.KhachHang KHNCC ON KHNCC.KhachHangId = KT.KhachHangNCCId
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = KT.CoSoId
	WHERE 
	(
		CAST(KT.ThoiGianBatDau AS DATE) BETWEEN CAST(@TuNgay AS DATE) AND CAST(@DenNgay AS DATE) OR
		CAST(KT.ThoiGianKetThuc AS DATE) BETWEEN CAST(@TuNgay AS DATE) AND CAST(@DenNgay AS DATE)
	)
	AND KT.CoSoId = @CoSoId
-----------------------------------------------------
END

