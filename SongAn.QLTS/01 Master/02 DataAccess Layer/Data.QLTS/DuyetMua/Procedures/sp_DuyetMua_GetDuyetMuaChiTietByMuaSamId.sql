ALTER PROC [dbo].[sp_DuyetMua_GetDuyetMuaChiTietByMuaSamId]
( 
	  @MuaSamId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT a.MuaSamId,a.MuaSamChiTietId,a.TenTaiSan,a.LoaiId,b.TenLoai,CAST(c.PhuongThucId AS VARCHAR) PhuongThucId, c.TenPhuongThuc,a.DonViTinh,a.MoTa,Convert(varchar(10),CONVERT(date,a.Ngay,106),103) AS Ngay,a.SoLuong,a.DonGia,CAST(d.HinhThucId AS VARCHAR) HinhThucId,d.TenHinhThuc,a.DuToan,a.GhiChu,a.DuyetId  from KeHoachMuaSamChiTiet  a 
	left join LoaiTaiSan b on a.LoaiId=b.LoaiId left join PhuongThuc c on a.PhuongThucId=c.PhuongThucId left join HinhThuc d on a.HinhThucId=d.HinhThucId
	where MuaSamId= @MuaSamId
-----------------------------------------------------
SET NOCOUNT OFF
END

