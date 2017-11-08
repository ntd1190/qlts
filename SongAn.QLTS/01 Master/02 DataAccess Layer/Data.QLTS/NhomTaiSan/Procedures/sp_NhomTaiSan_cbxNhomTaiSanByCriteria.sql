USE [QLTS]
GO


ALTER PROC [dbo].[sp_NhomTaiSan_cbxNhomTaiSanByCriteria]
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

	SELECT a.NhomId,a.MaNhom,a.TenNhom
	FROM NhomTaiSan a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId 


	

-----------------------------------------------------
SET NOCOUNT OFF
END

