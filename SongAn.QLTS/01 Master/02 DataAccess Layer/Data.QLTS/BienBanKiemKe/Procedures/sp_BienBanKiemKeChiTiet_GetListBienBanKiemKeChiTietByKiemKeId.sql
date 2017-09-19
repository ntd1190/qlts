USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_BienBanKiemKeChiTiet_GetListBienBanKiemKeChiTietByKiemKeId]    Script Date: 9/19/2017 10:32:04 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


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
				SUM(ISNULL(NG.GiaTri,0)) NguyenGia,
				SUM(ISNULL(NG.GiaTri,0)) - (
									DATEDIFF(YEAR, TS.NgayBDHaoMon, GETDATE()) * (SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeHaoMon / 100)
								 ) GiaTriConLai

		FROM dbo.TheoDoi H
		LEFT JOIN dbo.PhongBan PB ON pb.PhongBanId = H.PhongBanId
		LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = H.TaiSanId
		LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = ts.TaiSanId
		WHERE PB.PhongBanId = @PhongBanId
		GROUP BY 
				ts.TaiSanId,
				TS.MaTaiSan,
				ts.TenTaiSan,
				H.PhongBanId,
				PB.TenPhongBan,
				TS.NgayBDHaoMon,
				TS.TyLeHaoMon
	END

-----------------------------------------------------
SET NOCOUNT OFF
END