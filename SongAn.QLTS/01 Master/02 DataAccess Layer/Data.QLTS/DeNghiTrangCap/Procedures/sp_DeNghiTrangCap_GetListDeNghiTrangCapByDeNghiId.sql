USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCap_GetListDeNghiTrangCapByDeNghiId]    Script Date: 9/7/2017 2:49:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


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
			H.NoiDung
	FROM dbo.DeNghiTrangCap H 
	LEFT JOIN QLTS_MAIN.dbo.NguoiDung ON NguoiDung.NhanVienId = H.NguoiTao 
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = h.PhongBanId
	LEFT JOIN dbo.PhanLoai PL ON PL.PhanLoaiId = h.PhanLoaiId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = h.NguoiTao
	WHERE H.DeNghiId = @DeNghiId

-----------------------------------------------------
SET NOCOUNT OFF
END
