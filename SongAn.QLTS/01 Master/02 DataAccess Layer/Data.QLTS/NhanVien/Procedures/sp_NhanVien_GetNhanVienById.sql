USE [QLTS]
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
	FROM NhanVien a
	JOIN dbo.PhongBanNhanVien nvpb ON nvpb.NhanVienId = a.NhanVienId
	Inner join PhongBan b on nvpb.PhongBanId=b.PhongBanId where a.NhanVienId = @NhanVienId
-----------------------------------------------------
SET NOCOUNT OFF
END

