USE [QLTS]
GO


ALTER PROC [dbo].[sp_NhanVien_cbxNhanVienByCriteria]
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

	SELECT a.NhanVienId,a.MaNhanVien,a.TenNhanVien,pbnv.PhongBanId
	FROM NhanVien a  LEFT JOIN (SELECT pbnv.NhanVienId,b.CoSoId,
		STUFF((
				select CONCAT( ',' ,u1.PhongBanId)
				from dbo.PhongBan u1 JOIN dbo.PhongBanNhanVien pbnv1 ON pbnv1.PhongBanId = u1.PhongBanId
				where pbnv1.NhanVienId = pbnv.NhanVienId
				for xml path('')
			),1,1,'') PhongBanId
			FROM dbo.PhongBanNhanVien pbnv
			JOIN PhongBan b on pbnv.PhongBanId=b.PhongBanId 
			GROUP BY pbnv.NhanVienId,b.CoSoId) pbnv ON pbnv.NhanVienId=a.NhanVienId
	Where pbnv.CoSoId = @CoSoId

-----------------------------------------------------
SET NOCOUNT OFF
END

