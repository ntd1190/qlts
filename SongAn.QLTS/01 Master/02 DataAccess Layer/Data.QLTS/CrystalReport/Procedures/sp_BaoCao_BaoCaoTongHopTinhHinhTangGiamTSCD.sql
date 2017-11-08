USE [QLTS]
GO

/*

EXEC [dbo].[sp_BaoCao_BaoCaoTongHopTinhHinhTangGiamTSCD] @TuNgay = '2017-7-1 02:17:04', -- datetime
    @DenNgay = '2017-09-30 02:17:04', -- datetime
    @NhanVienId = N'1', -- nvarchar(10)
    @CoSoId = N'1' -- nvarchar(10)

*/


ALTER PROC [dbo].[sp_BaoCao_BaoCaoTongHopTinhHinhTangGiamTSCD]
( 
	@TuNgay DATETIME,
	@DenNgay DATETIME,
	@NhanVienId NVARCHAR(10),
	@CoSoId NVARCHAR(10)
)
AS  
BEGIN
------------------------------------------------  
	DECLARE @V_QUY NVARCHAR(10)
	
	IF(DAY(@TuNgay) = 1 AND MONTH(@TuNgay) = 1 AND DAY(@DenNgay) = 31 AND MONTH(@DenNgay) = 3)
	BEGIN SET @V_QUY = 'Quý: 1' END 
	ELSE IF(DAY(@TuNgay) = 1 AND MONTH(@TuNgay) = 4 AND DAY(@DenNgay) = 30 AND MONTH(@DenNgay) = 6)
	BEGIN SET @V_QUY = 'Quý: 2' END 
	ELSE IF(DAY(@TuNgay) = 1 AND MONTH(@TuNgay) = 7 AND DAY(@DenNgay) = 30 AND MONTH(@DenNgay) = 9)
	BEGIN SET @V_QUY = 'Quý: 3' END 
	ELSE IF(DAY(@TuNgay) = 1 AND MONTH(@TuNgay) = 10 AND DAY(@DenNgay) = 31 AND MONTH(@DenNgay) = 12)
	BEGIN SET @V_QUY = 'Quý: 4' END 
	ELSE 
	BEGIN SET @V_QUY = '' END 


	SELECT TD.MaCoSo, TD.TenCoSo, @V_QUY Quy, @TuNgay TuNgay, @DenNgay DenNgay,
		   TS.TenTaiSan, TS.DonViTinh, 
		   ISNULL(TD.TonDau,0) TonDau,
		   ISNULL(GT.SLTang,0) SLTang,
		   ISNULL(GG.SLGiam,0) SLGiam,
		   ISNULL(TD.TonDau,0) + ISNULL(GT.SLTang,0) - ISNULL(GG.SLGiam,0) TonCuoi,
		   ISNULL(SUM(NG.GiaTri),0) * ISNULL(TD.TonDau,0) GiaTriTonDau,
		   ISNULL(SUM(NG.GiaTri),0) * ISNULL(GT.SLTang,0) GiaTriGhiTang,
		   ISNULL(SUM(NG.GiaTri),0) * ISNULL(GG.SLGiam,0) GiaTriGhiGiam,
		   ISNULL(SUM(NG.GiaTri),0) * (ISNULL(TD.TonDau,0) + ISNULL(GT.SLTang,0) - ISNULL(GG.SLGiam,0)) GiaTriTonCuoi
	FROM
    (
		SELECT	CS.MaCoSo, CS.TenCoSo,
				TD.TaiSanId, SUM(TD.SLTon) TonDau
		FROM dbo.TheoDoi TD
		JOIN dbo.TaiSan TS ON TS.TaiSanId = TD.TaiSanId
		JOIN dbo.CoSo CS ON CS.CoSoId = TS.CoSoId
		WHERE TD.Nam = YEAR(@TuNgay) AND TS.CoSoId = @CoSoId
		GROUP BY TD.TaiSanId, CS.MaCoSo, CS.TenCoSo
	) AS TD
	LEFT JOIN
	(
		SELECT L.TaiSanId, SUM(L.SoLuong) SLTang
		FROM dbo.GhiTang H
		JOIN dbo.GhiTangChiTiet L ON L.GhiTangId = H.GhiTangId
		WHERE CAST(H.NgayGhiTang AS DATE) BETWEEN CAST(@TuNgay AS DATE) AND CAST(@DenNgay AS DATE)
		AND H.CoSoId = @CoSoId
		GROUP BY L.TaiSanId
	) AS GT ON GT.TaiSanId = TD.TaiSanId
	LEFT JOIN
	(
		SELECT L.TaiSanId, SUM(L.SoLuong) SLGiam
		FROM dbo.GhiGiam H
		JOIN dbo.GhiGiamChiTiet L ON l.GhiGiamId = H.GhiGiamId
		WHERE CAST(H.NgayGhiGiam AS DATE) BETWEEN CAST(@TuNgay AS DATE) AND CAST(@DenNgay AS DATE)
		AND H.CoSoId = @CoSoId
		GROUP BY L.TaiSanId
	) AS GG ON GG.TaiSanId = TD.TaiSanId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = TD.TaiSanId
	LEFT JOIN dbo.LoaiTaiSan LTS ON LTS.LoaiId = TS.LoaiId
	LEFT JOIN dbo.NhomTaiSan NTS ON NTS.NhomId = LTS.NhomId
	LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = TS.TaiSanId
	GROUP BY TS.TenTaiSan, TS.DonViTinh,
			 TD.TonDau,
			 GT.SLTang,
			 GG.SLGiam,
			 TD.MaCoSo,
			 TD.TenCoSo

	
-----------------------------------------------------
END
