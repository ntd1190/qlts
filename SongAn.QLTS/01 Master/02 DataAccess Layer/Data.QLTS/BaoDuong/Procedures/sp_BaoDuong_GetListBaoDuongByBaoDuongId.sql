ALTER PROC [dbo].[sp_BaoDuong_GetListBaoDuongByBaoDuongId]
( 
	@BaoDuongId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	
	SELECT	BaoDuongId,
			CAST(H.TaiSanId AS VARCHAR)TaiSanId,
			ts.TenTaiSan,
			CAST(H.PhongBanId AS VARCHAR)PhongBanId,
			pb.TenPhongBan,
			CAST(h.NhanVienId AS VARCHAR)NhanVienId,
			nv.TenNhanVien,
			CONVERT(VARCHAR, H.NgayBaoDuong,103)NgayBaoDuong,
			CONVERT(VARCHAR, H.NgayDuKien,103)NgayDuKien,
			H.DuToan,
			 CAST(H.LoaiBaoDuongId AS VARCHAR)LoaiBaoDuongId,
			H.MoTa
	FROM dbo.BaoDuong H
	LEFT JOIN dbo.TaiSan ts ON ts.TaiSanId = H.TaiSanId
	LEFT JOIN dbo.PhongBan pb ON pb.PhongBanId= h.PhongBanId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = H.NhanVienId
	WHERE H.BaoDuongId = @BaoDuongId

-----------------------------------------------------
SET NOCOUNT OFF
END