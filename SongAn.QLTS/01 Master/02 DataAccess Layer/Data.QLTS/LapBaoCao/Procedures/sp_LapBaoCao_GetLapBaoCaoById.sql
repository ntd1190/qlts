USE [QLTS]
GO


ALTER PROC [dbo].[sp_LapBaoCao_GetLapBaoCaoById]
( 
	  @LapBaoCaoId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.LapBaoCaoId,a.KyBaoCao,CONVERT(VARCHAR(10),a.TuNgay,103) as TuNgay,CONVERT(VARCHAR(10),a.DenNgay,103) as DenNgay,Case when a.KyBaoCao =1 then N'Năm' else Case when a.KyBaoCao =2 then N'Quí' else Case when a.KyBaoCao =3 then N'Tháng' else  N'Ngày' end end end as TenKyBaoCao  ,nv.TenNhanVien as HoTen,d.TrangThai,
	a.DienGiai,a.CoSoId,a.NoiDungDuyet,a.DuyetId,a.NgayTao,a.NgayGui,a.GuiCapTren,a.CtrVersion
	FROM LapBaoCao a LEFT JOIN [dbo].[NhanVien] nv on a.NguoiTao=nv.NhanVienId 
	left join Duyet d on a.DuyetId=d.DuyetId
	where a.LapBaoCaoId = @LapBaoCaoId
-----------------------------------------------------
SET NOCOUNT OFF
END

