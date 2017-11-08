USE [QLTS]
GO

/*
EXEC [dbo].[sp_BaoCao_BaoCaoNhapXuatTon] @TuNgay = '2017-10-01 02:17:04', -- datetime
    @DenNgay = '2017-10-31 02:17:04', -- datetime
    @NhanVienId = N'1', -- nvarchar(10)
    @CoSoId = N'1', -- nvarchar(10)
	@KhoTaiSanId = N'1' -- nvarchar(10)
*/

ALTER PROC [dbo].[sp_BaoCao_BaoCaoNhapXuatTon]
( 
	@TuNgay DATETIME,
	@DenNgay DATETIME,
	@NhanVienId NVARCHAR(10),
	@CoSoId NVARCHAR(10),
	@KhoTaiSanId NVARCHAR(100)
)
AS  
BEGIN
------------------------------------------------  
	SET DATEFORMAT YMD
    /*
	SELECT * FROM dbo.KhoTonKho
	SELECT * FROM dbo.KhoTonKhoChiTiet
	*/
	DECLARE @TenKho NVARCHAR(150), @ThangNamMin DATE
	IF (@KhoTaiSanId = '0')	SET @TenKho = N'Tất cả kho'
	ELSE 
	BEGIN
		SELECT TOP 1 @TenKho = TenKhoTaiSan FROM dbo.KhoTaiSan WHERE CoSoId = @CoSoId AND KhoTaiSanId = @KhoTaiSanId
	END

	-- giả vụ data có từ tháng 10. mà xem từ tháng 01 -> 11. lấy thang năm có tồn đầu đầu tiên
	SELECT @ThangNamMin = MIN(CONVERT(date,right(H.ThangNam,2) +'-'+left(H.ThangNam,2) + '-01')) FROM dbo.KhoTonKho H 
	WHERE H.CoSoId = @CoSoId 
	AND CONVERT(date,right(H.ThangNam,2) +'-'+left(H.ThangNam,2) + '-01') BETWEEN CAST(@TuNgay AS DATE) AND CAST(@DenNgay AS DATE)
	AND (H.KhoTaiSanId = @KhoTaiSanId OR @KhoTaiSanId = '0')

	SELECT MaCoSo, TenCoSo, @TuNgay TuNgay, @DenNgay DenNgay, @TenKho TenKho,
			--KhoTaiSanId, 
			TaiSanId, MaTaiSan, TenTaiSan, DonViTinh, TenLoai, TenNhom, DonGia,
			sum(TonDau)TonDau,				SUM(TTDauKi) TTDauKi,			
			sum(SLNhap)SLNhap,				SUM(TTNhap) TTNhap,
			sum(SLNhapChuyen)SLNhapChuyen,	sum(TTNhapChuyen) TTNhapChuyen,
			sum(SLXuat)SLXuat,				SUM(TTXuat)TTXuat,
			sum(SLXuatChuyen)SLXuatChuyen,	sum(TTXuatChuyen) TTXuatChuyen
	FROM
	(
		SELECT  ISNULL(TonDau.MaCoSo, Nhap.MaCoSo) MaCoSo, ISNULL(TonDau.TenCoSo, Nhap.TenCoSo) TenCoSo,
				ISNULL(TonDau.KhoTaiSanId, Nhap.KhoTaiSanId) KhoTaiSanId,
				ISNULL(TonDau.TaiSanId, nhap.TaiSanId) TaiSanId, TS.MaTaiSan, TS.TenTaiSan, TS.DonViTinh, LTS.TenLoai, NTS.TenNhom,
				ISNULL(TonDau, 0) TonDau,					ISNULL(TonDau.DonGia * TonDau,0) TTDauKi,
				ISNULL(TonDau.DonGia, Nhap.DonGia) DonGia,
				ISNULL(Nhap.SoLuong,0) SLNhap,				ISNULL(TonDau.DonGia, Nhap.DonGia) * ISNULL(Nhap.SoLuong,0) TTNhap,
				ISNULL(NhapChuyen.SoLuong,0) SLNhapChuyen,	ISNULL(TonDau.DonGia, Nhap.DonGia) * ISNULL(NhapChuyen.SoLuong,0) TTNhapChuyen,
				ISNULL(Xuat.SoLuong,0) SLXuat,				ISNULL(TonDau.DonGia, Nhap.DonGia) * ISNULL(Xuat.SoLuong,0) TTXuat,
				ISNULL(XuatChuyen.SoLuong,0) SLXuatChuyen,	ISNULL(TonDau.DonGia, Nhap.DonGia) * ISNULL(XuatChuyen.SoLuong,0) TTXuatChuyen
		FROM
		(
			SELECT H.KhoTaiSanId, L.TaiSanId, L.TonDau, L.DonGia, Description = N'1-Tồn đầu', CS.MaCoSo, CS.TenCoSo
			FROM dbo.KhoTonKho H
			JOIN dbo.KhoTonKhoChiTiet L ON L.KhoTonKhoId = H.KhoTonKhoId
			LEFT JOIN dbo.CoSo CS ON CS.CoSoId = H.CoSoId
			WHERE H.CoSoId = @CoSoId 
			AND CONVERT(date,right(H.ThangNam,2) +'-'+left(H.ThangNam,2) + '-01') = @ThangNamMin
			AND (H.KhoTaiSanId = @KhoTaiSanId OR @KhoTaiSanId = '0')
		
		) AS TonDau
		FULL OUTER JOIN
		(
			SELECT H.KhoTaiSanId, L.TaiSanId, SUM(L.SoLuong)SoLuong, L.DonGia, Description = N'2-Nhập', CS.MaCoSo, CS.TenCoSo
			FROM dbo.KhoPhieuNhap H
			JOIN dbo.KhoPhieuNhapChiTiet L ON L.KhoPhieuNhapId = H.KhoPhieuNhapId
			LEFT JOIN dbo.CoSo CS ON CS.CoSoId = H.CoSoId
			WHERE H.CoSoId = @CoSoId 
			AND CAST(H.NgayNhap AS DATE) BETWEEN CAST(@TuNgay AS DATE) AND CAST(@DenNgay AS DATE)
			AND (H.KhoTaiSanId = @KhoTaiSanId OR @KhoTaiSanId = '0')
			GROUP BY H.KhoTaiSanId, L.TaiSanId, L.DonGia, CS.MaCoSo, CS.TenCoSo
		) AS Nhap ON Nhap.KhoTaiSanId = TonDau.KhoTaiSanId AND Nhap.TaiSanId = TonDau.TaiSanId AND Nhap.DonGia = TonDau.DonGia
		FULL OUTER JOIN
		(
			SELECT H.KhoNhanId, L.TaiSanId, SUM(L.SoLuong)SoLuong, L.DonGia, Description = N'3-Nhập chuyển'
			FROM dbo.KhoPhieuXuat H
			JOIN dbo.KhoPhieuXuatChiTiet L ON L.KhoPhieuXuatId = H.KhoPhieuXuatId
			WHERE H.CoSoId = @CoSoId 
			AND CAST(H.NgayXuat AS DATE)  BETWEEN CAST(@TuNgay AS DATE) AND CAST(@DenNgay AS DATE) 
			AND H.Loai = 'CK'
			AND (H.KhoNhanId = @KhoTaiSanId OR @KhoTaiSanId = '0')
			GROUP BY H.KhoNhanId, L.TaiSanId, L.DonGia
		) AS NhapChuyen ON TonDau.KhoTaiSanId = NhapChuyen.KhoNhanId AND NhapChuyen.TaiSanId = TonDau.TaiSanId AND NhapChuyen.DonGia = TonDau.DonGia
		FULL OUTER JOIN
		(
			SELECT H.KhoXuatId, L.TaiSanId, SUM(L.SoLuong)SoLuong, L.DonGia, Description = N'4-Xuất'
			FROM dbo.KhoPhieuXuat H
			JOIN dbo.KhoPhieuXuatChiTiet L ON L.KhoPhieuXuatId = H.KhoPhieuXuatId
			WHERE H.CoSoId = @CoSoId 
			AND CAST(H.NgayXuat AS DATE)  BETWEEN CAST(@TuNgay AS DATE) AND CAST(@DenNgay AS DATE) 
			AND H.Loai = 'XK'
			AND (H.KhoXuatId = @KhoTaiSanId OR @KhoTaiSanId = '0')
			GROUP BY H.KhoXuatId, L.TaiSanId, L.DonGia
		) AS Xuat ON Xuat.KhoXuatId = TonDau.KhoTaiSanId AND Xuat.TaiSanId = TonDau.TaiSanId AND Xuat.DonGia = TonDau.DonGia
		FULL OUTER JOIN
		(
			SELECT H.KhoXuatId, L.TaiSanId, SUM(L.SoLuong)SoLuong, L.DonGia, Description = N'5-Xuất chuyển'
			FROM dbo.KhoPhieuXuat H
			JOIN dbo.KhoPhieuXuatChiTiet L ON L.KhoPhieuXuatId = H.KhoPhieuXuatId
			WHERE H.CoSoId = @CoSoId 
			AND CAST(H.NgayXuat AS DATE)  BETWEEN CAST(@TuNgay AS DATE) AND CAST(@DenNgay AS DATE) 
			AND H.Loai = 'CK'
			AND (H.KhoXuatId = @KhoTaiSanId OR @KhoTaiSanId = '0')
			GROUP BY H.KhoXuatId, L.TaiSanId, L.DonGia
		) AS XuatChuyen ON XuatChuyen.KhoXuatId = TonDau.KhoTaiSanId AND XuatChuyen.TaiSanId = TonDau.TaiSanId AND XuatChuyen.DonGia = TonDau.DonGia
		LEFT JOIN dbo.TaiSan TS ON (TS.TaiSanId = TonDau.TaiSanId OR TS.TaiSanId = Nhap.TaiSanId)
		LEFT JOIN dbo.LoaiTaiSan LTS ON LTS.LoaiId = TS.LoaiId
		LEFT JOIN dbo.NhomTaiSan NTS ON NTS.NhomId = LTS.NhomId
	) AS KQ
	GROUP BY MaCoSo, TenCoSo, TaiSanId, MaTaiSan, TenTaiSan, DonViTinh, TenLoai, TenNhom, DonGia
-----------------------------------------------------
END

