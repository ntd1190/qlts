USE [QLTS]
GO


ALTER PROC [dbo].[sp_KhachHang_cbxKhachHangById]
( 
	  @CoSoId	        nvarchar(500)	= null				
	, @NhanVienId	    nvarchar(500)	= null				
	, @Search			nvarchar(500)   = null	
	, @KhachHangId		INT   = 0	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	IF(@KhachHangId IS NULL OR @KhachHangId = '') SET @KhachHangId = 0

	SELECT a.KhachHangId,a.MaKhachHang,a.TenKhachHang
	FROM KhachHang a
	Where a.CoSoId = @CoSoId
	AND (@KhachHangId = 0 OR a.KhachHangId = @KhachHangId)

-----------------------------------------------------
SET NOCOUNT OFF
END

