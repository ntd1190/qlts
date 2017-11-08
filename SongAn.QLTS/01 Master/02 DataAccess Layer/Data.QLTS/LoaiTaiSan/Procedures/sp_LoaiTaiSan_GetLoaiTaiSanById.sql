USE [QLTS]
GO


ALTER PROC [dbo].[sp_LoaiTaiSan_GetLoaiTaiSanById]
( 
	  @LoaiId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.LoaiId,a.MaLoai,a.TenLoai,b.NhomId,b.MaNhom,b.TenNhom,a.GhiChu,a.CtrVersion
	FROM LoaiTaiSan a Inner join NhomTaiSan b on a.NhomId=b.NhomId where a.LoaiId = @LoaiId
-----------------------------------------------------
SET NOCOUNT OFF
END

