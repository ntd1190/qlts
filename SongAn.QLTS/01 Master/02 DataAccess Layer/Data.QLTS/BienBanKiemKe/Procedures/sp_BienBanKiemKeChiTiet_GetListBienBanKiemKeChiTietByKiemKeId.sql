ALTER PROC [dbo].[sp_BienBanKiemKeChiTiet_GetListBienBanKiemKeChiTietByKiemKeId]
( 
	@BienBanKiemKeId INT,
	@PhongBanId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	-- giatriconlai = nguyengia - (hao mòn nam * so nam sd)
	DECLARE @V_NgayKiemKe DATETIME
	if @BienBanKiemKeId = 0 
	set @V_NgayKiemKe = GETDATE();
	else
	SELECT @V_NgayKiemKe = NgayKiemKe FROM dbo.BienBanKiemKe WHERE BienBanKiemKeId = @BienBanKiemKeId

	IF EXISTS(SELECT 1 FROM dbo.BienBanKiemKe H JOIN dbo.BienBanKiemKeChiTiet L ON L.BienBanKiemKeId = H.BienBanKiemKeId WHERE H.BienBanKiemKeId = @BienBanKiemKeId)
	BEGIN
		SELECT H.BienBanKiemKeId,
				CAST(ts.TaiSanId AS VARCHAR) TaiSanId,
				TS.MaTaiSan,
				ts.TenTaiSan,
				CAST(H.PhongBanId AS VARCHAR) PhongBanId,
				PB.TenPhongBan,
				L.SoLuong,
				L.SoLuongKiemKe,
				SUM(ISNULL(NG.GiaTri,0)) NguyenGia,
				SUM(ISNULL(NG.GiaTri,0)) - (
									DATEDIFF(YEAR, TS.NgayBDHaoMon, H.NgayKiemKe) * (SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeHaoMon / 100)
								 ) GiaTriConLai

		FROM dbo.BienBanKiemKe H
		JOIN dbo.BienBanKiemKeChiTiet L ON L.BienBanKiemKeId= h.BienBanKiemKeId
		LEFT JOIN dbo.PhongBan PB ON pb.PhongBanId = H.PhongBanId
		LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = l.TaiSanId
		LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = ts.TaiSanId
		WHERE H.BienBanKiemKeId = @BienBanKiemKeId
		GROUP BY H.BienBanKiemKeId,
				ts.TaiSanId,
				TS.MaTaiSan,
				ts.TenTaiSan,
				H.PhongBanId,
				PB.TenPhongBan,
				L.SoLuong,
				L.SoLuongKiemKe,
				TS.NgayBDHaoMon,
				H.NgayKiemKe,
				TS.TyLeHaoMon
	END
	ELSE
	BEGIN
		SELECT  0 BienBanKiemKeId,
				CAST(ts.TaiSanId AS VARCHAR) TaiSanId,
				TS.MaTaiSan,
				ts.TenTaiSan,
				CAST(H.PhongBanId AS VARCHAR) PhongBanId,
				PB.TenPhongBan,
				SUM(H.SLTon + H.SLTang - H.SLGiam) SoLuong,
				SUM(H.SLTon + H.SLTang - H.SLGiam) SoLuongKiemKe,
				TS.NguyenGia,
				TS.NguyenGia - (
									DATEDIFF(YEAR, TS.NgayBDHaoMon, GETDATE()) * (TS.NguyenGia * TS.TyLeHaoMon / 100)
								) GiaTriConLai

		FROM dbo.TheoDoi H
		LEFT JOIN dbo.PhongBan PB ON pb.PhongBanId = H.PhongBanId
		LEFT JOIN 
		(
			SELECT TS.TaiSanId, TS.MaTaiSan, TS.TenTaiSan, SUM(ISNULL(NG.GiaTri,0)) NguyenGia, TS.NgayBDHaoMon, TS.TyLeHaoMon
			FROM dbo.TaiSan TS LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = ts.TaiSanId
			GROUP BY TS.TaiSanId, TS.MaTaiSan, TS.TenTaiSan, TS.NgayBDHaoMon, TS.TyLeHaoMon
		) AS TS ON TS.TaiSanId = H.TaiSanId 
		WHERE PB.PhongBanId = @PhongBanId  AND h.Nam = YEAR(@V_NgayKiemKe)
		GROUP BY 
				ts.TaiSanId,
				TS.MaTaiSan,
				ts.TenTaiSan,
				H.PhongBanId,
				PB.TenPhongBan,
				TS.NgayBDHaoMon,
				TS.TyLeHaoMon,
				TS.NguyenGia
		HAVING  SUM(H.SLTon + H.SLTang - H.SLGiam) >0
	END

-----------------------------------------------------
SET NOCOUNT OFF
END