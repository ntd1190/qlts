USE [QLTS]
GO


/*

EXEC dbo.sp_GhiTang_GetListReportGhiTangByGhiTangId @GhiTangId = N'14' -- nvarchar(10)

*/


ALTER PROC [dbo].[sp_GhiTang_GetListReportGhiTangByGhiTangId]
( 
	@GhiTangId NVARCHAR(10)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	
	SELECT	CS.MaCoSo, CS.TenCoSo,
			H.SoChungTu,
			H.NgayChungTu,
			H.NgayGhiTang,
			H.NoiDung,
			-----------------------------------------------line
			TS.TenTaiSan, LTS.TenLoai LoaiTaiSan, TS.NamSanXuat, NSX.TenNuocSanXuat, TS.SoQDTC, PB.TenPhongBan, NV.TenNhanVien, L.SoLuong,
			L.NgayBatDauSuDung

	FROM dbo.GhiTang H
	JOIN dbo.GhiTangChiTiet L ON L.GhiTangId = H.GhiTangId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = L.TaiSanId
	LEFT JOIN dbo.LoaiTaiSan LTS ON LTS.LoaiId = TS.LoaiId
	LEFT JOIN dbo.NuocSanXuat NSX ON NSX.NuocSanXuatId = TS.NuocSanXuatId
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = L.PhongBanId
	LEFT JOIN dbo.NhanVien NV ON NV.NhanVienId = L.NhanVienId
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = H.CoSoId
	WHERE H.GhiTangId = @GhiTangId

-----------------------------------------------------
SET NOCOUNT OFF
END
