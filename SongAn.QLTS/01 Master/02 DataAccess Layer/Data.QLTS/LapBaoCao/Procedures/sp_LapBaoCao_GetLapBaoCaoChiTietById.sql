USE [QLTS]
GO


ALTER PROC [dbo].[sp_LapBaoCao_GetLapBaoCaoChiTietById]
( 
	  @LapBaoCaoId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT  a.*,b.TenBaoCao,b.Report,c.TrangThai,CONVERT(VARCHAR(10),d.TuNgay,103) as TuNgay,CONVERT(VARCHAR(10),d.DenNgay,103) as DenNgay
	from LapBaoCaoChiTiet  a 
	inner join BaoCao b on a.BaoCaoId = b.BaoCaoId
	left join Duyet c on c.DuyetId = a.DuyetId 
	left join LapBaoCao d on d.LapBaoCaoId = a.LapBaoCaoId 
	where a.LapBaoCaoId= @LapBaoCaoId
-----------------------------------------------------
SET NOCOUNT OFF
END

