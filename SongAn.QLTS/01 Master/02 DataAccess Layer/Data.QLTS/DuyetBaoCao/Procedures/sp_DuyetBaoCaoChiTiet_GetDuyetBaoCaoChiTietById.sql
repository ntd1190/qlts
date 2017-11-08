ALTER PROC [dbo].[sp_DuyetBaoCaoChiTiet_GetDuyetBaoCaoChiTietById]
	@LapBaoCaoId INT
AS  
BEGIN
SET NOCOUNT ON  
	
	SELECT  a.*,b.TenBaoCao,b.Report,c.TrangThai,CONVERT(VARCHAR(10),d.TuNgay,103) as TuNgay,CONVERT(VARCHAR(10),d.DenNgay,103) as DenNgay
	from LapBaoCaoChiTiet  a 
	inner join BaoCao b on a.BaoCaoId = b.BaoCaoId
	left join Duyet c on c.DuyetId = a.DuyetId 
	left join LapBaoCao d on d.LapBaoCaoId = a.LapBaoCaoId 
	WHERE a.LapBaoCaoId = @LapBaoCaoId
	
SET NOCOUNT OFF
END
