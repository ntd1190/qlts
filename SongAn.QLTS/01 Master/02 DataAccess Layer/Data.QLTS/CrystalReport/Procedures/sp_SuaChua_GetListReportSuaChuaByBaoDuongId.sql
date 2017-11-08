USE [QLTS]
GO

/*

EXEC sp_SuaChua_GetListReportSuaChuaByBaoDuongId '1'

*/

ALTER PROC [dbo].[sp_SuaChua_GetListReportSuaChuaByBaoDuongId]
( 
	@BaoDuongId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	--SELECT * FROM dbo.BaoDuong WHERE BaoDuongId = 1
	--SELECT * FROM dbo.SuaChua WHERE BaoDuongId = 1
	--SELECT TOP 2* FROM dbo.TaiSan

	DECLARE @V_NGAYBATDAU DATETIME
			,@V_NGAYKETTHUC DATETIME

	DECLARE @TableLoaiBaoDuong TABLE
	(
		 _type INT,
		 _name NVARCHAR(100)
	)

	insert @TableLoaiBaoDuong
	select 1,N'Thay thế'
	union
	select 2,N'Bảo dưỡng'
	union
	select 3,N'Sửa chữa'

	SELECT @V_NGAYBATDAU = MIN(NgayBatDau), @V_NGAYKETTHUC = MAX(NgayKetThuc) FROM SuaChua WHERE BaoDuongId = @BaoDuongId

	SELECT	cs.MaCoSo, CS.TenCoSo,
			TS.TenTaiSan, TS.SoQDTC, TS.DonViTinh, TS.MaTaiSan, '' SoThe, PB.TenPhongBan, NV.TenNhanVien, H.DuToan, H.NgayBaoDuong, H.NgayDuKien, LBD._name TenLoaiBaoDuong,
			L.TenBoPhan, L.NoiDung, L.ChiPhi, L.KetQua, L.NgayBatDau,L.NgayKetThuc, @V_NGAYBATDAU v_ngaybatdau, @V_NGAYKETTHUC v_ngayketthuc
	FROM dbo.BaoDuong H
	JOIN dbo.SuaChua L ON L.BaoDuongId = H.BaoDuongId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = H.TaiSanId
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = H.PhongBanId
	LEFT JOIN dbo.NhanVien NV ON NV.NhanVienId = H.NhanVienId
	LEFT JOIN @TableLoaiBaoDuong LBD ON LBD._type = H.LoaiBaoDuongId
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = H.CoSoId
	WHERE H.BaoDuongId = @BaoDuongId

-----------------------------------------------------
SET NOCOUNT OFF
END