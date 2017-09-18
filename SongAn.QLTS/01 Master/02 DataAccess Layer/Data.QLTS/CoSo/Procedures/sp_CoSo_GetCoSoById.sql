USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_CoSo_GetCoSoById]    Script Date: 08/23/2017 08:36:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROC [dbo].[sp_CoSo_GetCoSoById]
( 
	  @CoSoId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.CoSoId,a.MaCoSo,a.TenCoSo,CONVERT(varchar, a.LoaiCoSoId) as LoaiCoSoId,a.TrucThuoc,b.MaCoSo as MaTrucThuoc,b.TenCoSo as TenTrucThuoc,a.DienThoai,a.DiaChi,a.GhiChu,a.CtrVersion
	FROM CoSo a left join CoSo b on a.TrucThuoc=b.CoSoId where a.CoSoId = @CoSoId
-----------------------------------------------------
SET NOCOUNT OFF
END

