USE [QLTS]
GO

/*
EXEC [dbo].[sp_BaoCao_BaoCaoTongHopSoTaiSanCoDinhBieuS21] @TuNgay = '2017-09-02 08:07:29', -- datetime
    @DenNgay = '2017-10-02 08:07:29', -- datetime
    @NhanVienId = N'1', -- nvarchar(10)
    @CoSoId = N'1' -- nvarchar(10)
*/

ALTER PROC [dbo].[sp_BaoCao_BaoCaoTongHopSoTaiSanCoDinhBieuS21]
( 
	@TuNgay DATETIME,
	@DenNgay DATETIME,
	@NhanVienId NVARCHAR(10),
	@CoSoId NVARCHAR(10)
)
AS  
BEGIN
------------------------------------------------  
	DECLARE @TenCoSo NVARCHAR(250), @DiaChi NVARCHAR(500)
	SELECT @TenCoSo = TenCoSo, @DiaChi = DiaChi FROM dbo.CoSo WHERE CoSoId = @CoSoId

	SELECT H.SoChungTu SoChungTu_T, @TenCoSo TenCoSo, @DiaChi DiaChi, @TuNgay TuNgay,
		   H.NgayGhiTang NgayGhiTang, 
		   TS.TenTaiSan TenTaiSan_T, 
		   NSX.TenNuocSanXuat TenNuocSanXuat_T, 
		   L.NgayBatDauSuDung NamSuDung_T, 
		   TS.SoQDTC SoHieu_T, 
		   LTS.TenLoai TenLoai,
		   SUM(ISNULL(NG.GiaTri,0)) NguyenGia_T, 
		   TS.TyLeKhauHao TyLeKhauHao,
		   SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeKhauHao / 100 GiaTriKhauHao,
		   '' SoChungTu_G, NULL NgayGhiGiam, '' LyDoGiam,
		   NULL KhauHaoLuyke
	FROM dbo.GhiTang H
	JOIN dbo.GhiTangChiTiet L ON L.GhiTangId = H.GhiTangId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = l.TaiSanId
	LEFT JOIN dbo.LoaiTaiSan LTS ON LTS.LoaiId = TS.LoaiId
	LEFT JOIN dbo.NuocSanXuat NSX ON NSX.NuocSanXuatId = TS.NuocSanXuatId
	LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = TS.TaiSanId
	WHERE CAST(H.NgayGhiTang AS DATE) BETWEEN CAST(@TuNgay AS DATE) AND CAST(@DenNgay AS DATE)
	AND H.CoSoId = @CoSoId
	GROUP BY H.SoChungTu, H.NgayGhiTang, TS.TenTaiSan, NSX.TenNuocSanXuat, L.NgayBatDauSuDung, TS.SoQDTC, LTS.TenLoai, TS.TyLeKhauHao

	UNION ALL

	SELECT '' SoChungTu_T, @TenCoSo TenCoSo, @DiaChi DiaChi, @TuNgay TuNgay,
		   NULL NgayGhiTang, 
		   '' TenTaiSan_T, 
		   '' TenNuocSanXuat_T, 
		   NULL NamSuDung_T, 
		   '' SoHieu_T, 
		   LTS.TenLoai TenLoai,
		   NULL NguyenGia_T, 
		   TS.TyLeKhauHao TyLeKhauHao,
		   SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeKhauHao / 100 GiaTriKhauHao,
		   H.SoChungTu SoChungTu_G, H.NgayGhiGiam NgayGhiGiam, XL.TenXuLy LyDoGiam,
		   ISNULL
			(
				(SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeKhauHao / 100) * 
				(
					--so ky khau hao
					TS.SoKyKhauHao - 
					--so ky con lai
					(   CASE WHEN 
								(
									CASE WHEN KyTinhKhauHao = N'Tháng' THEN 1 
										 WHEN KyTinhKhauHao = N'Quý' THEN 3
										 WHEN KyTinhKhauHao = N'Năm' THEN 12 
										 ELSE 0 END
									* TS.SoKyKhauHao - DATEDIFF(MONTH, TS.NgayBDKhauHao, H.NgayGhiGiam)
								) > 0 THEN FLOOR(
													(
														CASE WHEN KyTinhKhauHao = N'Tháng' THEN 1 
															 WHEN KyTinhKhauHao = N'Quý' THEN 3
															 WHEN KyTinhKhauHao = N'Năm' THEN 12 
															 ELSE 0 END
														* TS.SoKyKhauHao - DATEDIFF(MONTH, TS.NgayBDKhauHao, H.NgayGhiGiam)
													) / 
													(
														CASE WHEN KyTinhKhauHao = N'Tháng' THEN 1 
															 WHEN KyTinhKhauHao = N'Quý' THEN 3
															 WHEN KyTinhKhauHao = N'Năm' THEN 12 
															 ELSE 1 END
													)
												)
										ELSE 0 END
					)
				) 
			, 0)KhauHaoLuyKe
	FROM dbo.GhiGiam H
	JOIN dbo.GhiGiamChiTiet L ON l.GhiGiamId = H.GhiGiamId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = l.TaiSanId
	LEFT JOIN dbo.LoaiTaiSan LTS ON LTS.LoaiId = TS.LoaiId
	LEFT JOIN dbo.NuocSanXuat NSX ON NSX.NuocSanXuatId = TS.NuocSanXuatId
	LEFT JOIN dbo.TheoDoi TD ON TD.TaiSanId = L.TaiSanId AND TD.NhanVienId = L.NhanVienId AND TD.PhongBanId = L.PhongBanId AND YEAR(H.NgayGhiGiam) = TD.Nam
	LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = TS.TaiSanId
	LEFT JOIN dbo.XuLy XL ON XL.XuLyId = L.XuLyId
	WHERE CAST(H.NgayGhiGiam AS DATE) BETWEEN CAST(@TuNgay AS DATE) AND CAST(@DenNgay AS DATE)
	AND H.CoSoId = @CoSoId
	GROUP BY LTS.TenLoai, TS.TyLeKhauHao, H.SoChungTu, H.NgayGhiGiam, XL.TenXuLy, TS.SoKyKhauHao, KyTinhKhauHao,TS.NgayBDKhauHao
-----------------------------------------------------
END
