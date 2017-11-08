ALTER PROC [dbo].[sp_GhiGiam_ReportGhiGiamById]
( 
	  @GhiGiamId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT gg.SoChungTu,gg.NgayChungTu,gg.NgayGhiGiam,PB.TenPhongBan,gg.NoiDung, a.GhiGiamId,a.GhiGiamChiTietId,b.MaTaiSan,
	b.TaiSanId,b.DonViTinh,b.TenTaiSan,CAST(c.XuLyId AS VARCHAR) as XuLyId,c.TenXuLy,ISNULL((TD.SLTon + TD.SLTang - TD.SLGiam),0) as SoLuongTon ,
	a.SoLuong,ISNULL(sum(d.GiaTri),0) as NguyenGia,cs.MaCoSo,cs.TenCoSo   
	from GhiGiam gg inner join GhiGiamChiTiet  a  on gg.GhiGiamId = a. GhiGiamId
	left join TaiSan b on a.TaiSanId=b.TaiSanId  left join XuLy c on a.XuLyId=c.XuLyId
	left join NguyenGia d on a.TaiSanId=d.TaiSanId
	LEFT JOIN TheoDoi TD ON b.TaiSanId = TD.TaiSanId and a.PhongBanId=TD.PhongBanId and a.NhanVienId=TD.NhanVienId
	LEFT JOIN PhongBan PB ON gg.PhongBanId = PB.PhongBanId
	left join CoSo cs on gg.CoSoId=cs.CoSoId
	where gg.GhiGiamId = @GhiGiamId
	group by  gg.SoChungTu,gg.NgayChungTu,gg.NgayGhiGiam,gg.NoiDung,a.GhiGiamId,a.GhiGiamChiTietId,b.TaiSanId,b.MaTaiSan,b.DonViTinh,b.TenTaiSan,PB.TenPhongBan,a.NhanVienId,c.TenXuLy,a.SoLuong,TD.SLTon,TD.SLTang,TD.SLGiam,c.XuLyId,cs.MaCoSo,cs.TenCoSo  
-----------------------------------------------------
SET NOCOUNT OFF
END

