ALTER PROC [dbo].[sp_CoSo_cbxCoSoByCriteria]
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

	SELECT a.CoSoId,a.MaCoSo,a.TenCoSo
	FROM CoSo a LEFT JOIN NhanVien b on a.NguoiTao=b.NhanVienId 
-----------------------------------------------------
SET NOCOUNT OFF
END

