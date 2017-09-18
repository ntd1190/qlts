USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_NhanVien_GetNhanVienById]    Script Date: 08/23/2017 08:48:57 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROC [dbo].[sp_NhanVien_GetNhanVienById]
( 
	  @NhanVienId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.NhanVienId,a.MaNhanVien,a.TenNhanVien,b.PhongBanId,b.MaPhongBan,b.TenPhongBan,a.ChucDanh,a.Email,a.DiaChi,a.DienThoai,a.GhiChu,a.CtrVersion
	FROM NhanVien a Inner join PhongBan b on a.PhongBanId=b.PhongBanId where a.NhanVienId = @NhanVienId
-----------------------------------------------------
SET NOCOUNT OFF
END

