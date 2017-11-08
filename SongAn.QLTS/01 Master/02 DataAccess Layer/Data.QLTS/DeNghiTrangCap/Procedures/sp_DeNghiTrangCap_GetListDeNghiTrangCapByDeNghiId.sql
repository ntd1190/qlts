ALTER PROC [dbo].[sp_DeNghiTrangCap_GetListDeNghiTrangCapByDeNghiId]
( 
	@DeNghiId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	SELECT H.DeNghiId, 
			Convert(varchar,H.Ngay,103) Ngay, 
			H.SoPhieu, 
			CAST(H.PhanLoaiId AS VARCHAR) PhanLoaiId, 
			PL.TenPhanLoai, 
			CAST(H.PhongBanId AS VARCHAR) PhongBanId, 
			PB.TenPhongBan, 
			H.NoiDung,H.DuyetId,H.NoiDungDuyet,D.TrangThai
	FROM dbo.DeNghiTrangCap H
	LEFT JOIN QLTS_MAIN.dbo.NguoiDung ON NguoiDung.NhanVienId = H.NguoiTao
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = h.PhongBanId
	LEFT JOIN dbo.PhanLoai PL ON PL.PhanLoaiId = h.PhanLoaiId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = h.NguoiTao
	LEFT JOIN dbo.Duyet D ON D.DuyetId = h.DuyetId
	WHERE H.DeNghiId = @DeNghiId
-----------------------------------------------------
SET NOCOUNT OFF
END
