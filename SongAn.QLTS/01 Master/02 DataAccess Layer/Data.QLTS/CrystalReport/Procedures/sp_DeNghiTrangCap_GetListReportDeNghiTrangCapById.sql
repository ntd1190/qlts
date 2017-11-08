USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCap_GetListReportDeNghiTrangCapById]    Script Date: 11/8/2017 9:44:19 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*

EXEC [dbo].[sp_DeNghiTrangCap_GetListReportDeNghiTrangCapById] @DeNghiId = 5 -- int

*/

ALTER PROC [dbo].[sp_DeNghiTrangCap_GetListReportDeNghiTrangCapById]
( 
	@DeNghiId NVARCHAR(10)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	SELECT	CS.MaCoSo, CS.TenCoSo,
			CONVERT(varchar,H.Ngay,103) Ngay, 
			H.SoPhieu, PL.TenPhanLoai, PB.TenPhongBan, 
			H.NoiDung, H.NoiDungDuyet, D.TrangThai,
			----------------------------------------------line
			l.TenTaiSan, L.MoTa, L.NgayDeNghi, L.SoLuong, L.DonViTinh, 
			L.DuToan, L.DuToanDuocDuyet, pt.TenPhuongThuc, L.GhiChu

	FROM dbo.DeNghiTrangCap H 
	JOIN dbo.DeNghiTrangCapChiTiet L ON L.DeNghiId = H.DeNghiId
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = h.PhongBanId
	LEFT JOIN dbo.PhanLoai PL ON PL.PhanLoaiId = h.PhanLoaiId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = h.NguoiTao
	LEFT JOIN dbo.Duyet D ON D.DuyetId = h.DuyetId
	LEFT JOIN dbo.PhuongThuc PT ON PT.PhuongThucId = L.PhuongThucId
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = H.CoSoId
	WHERE H.DeNghiId = @DeNghiId

-----------------------------------------------------
SET NOCOUNT OFF
END
