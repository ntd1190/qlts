ALTER PROC [dbo].[sp_KeHoachMuaSam_ReportKeHoachMuaSamById]
( 
	  @MuaSamId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT ms.Nam,ms.NoiDung,a.TenTaiSan,a.LoaiId,b.TenLoai,CAST(c.PhuongThucId AS VARCHAR) PhuongThucId, 
	c.TenPhuongThuc,a.DonViTinh,a.MoTa,Convert(varchar(10),CONVERT(date,a.Ngay,106),103) AS Ngay,a.SoLuong,a.DonGia,CAST(d.HinhThucId AS VARCHAR) HinhThucId,
	d.TenHinhThuc,a.DuToan,a.GhiChu,a.DuyetId,cs.MaCoSo,cs.TenCoSo  
	from KeHoachMuaSam ms inner join KeHoachMuaSamChiTiet  a on ms.MuaSamId=a.MuaSamId
	left join LoaiTaiSan b on a.LoaiId=b.LoaiId left join PhuongThuc c on a.PhuongThucId=c.PhuongThucId 
	left join HinhThuc d on a.HinhThucId=d.HinhThucId
	left join CoSo cs on ms.CoSoId=cs.CoSoId
	where ms.MuaSamId= @MuaSamId
-----------------------------------------------------
SET NOCOUNT OFF
END

