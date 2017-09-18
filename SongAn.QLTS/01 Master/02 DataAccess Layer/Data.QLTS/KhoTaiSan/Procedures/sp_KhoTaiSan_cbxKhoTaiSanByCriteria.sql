USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_KhoTaiSan_cbxKhoTaiSanByCriteria]    Script Date: 08/23/2017 08:43:27 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROC [dbo].[sp_KhoTaiSan_cbxKhoTaiSanByCriteria]
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

	SELECT a.KhoTaiSanId,a.MaKhoTaiSan,a.TenKhoTaiSan
	FROM KhoTaiSan a LEFT JOIN [QLTS_MAIN].[dbo].[NguoiDung] b on a.NguoiTao=b.NhanVienId 
	Where a.CoSoId = @CoSoId

	

-----------------------------------------------------
SET NOCOUNT OFF
END

