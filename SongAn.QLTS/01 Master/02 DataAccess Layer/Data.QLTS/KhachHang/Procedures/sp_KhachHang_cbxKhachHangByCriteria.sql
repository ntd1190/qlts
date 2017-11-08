USE [QLTS]
GO


ALTER PROC [dbo].[sp_KhachHang_cbxKhachHangByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.KhachHangId,a.MaKhachHang,a.TenKhachHang
	FROM KhachHang a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId 
	Where a.CoSoId = @CoSoId

	

-----------------------------------------------------
SET NOCOUNT OFF
END

