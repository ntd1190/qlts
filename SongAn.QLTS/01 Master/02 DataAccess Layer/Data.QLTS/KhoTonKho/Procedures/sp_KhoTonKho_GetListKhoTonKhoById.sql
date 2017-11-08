USE [QLTS]

GO


ALTER PROC [dbo].[sp_KhoTonKho_GetListKhoTonKhoById]
( 
	@KhoTaiSanId INT,
	@ThangNam varchar(4),
	@KhoTonKhoId INT,
	@CoSoId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	Select a.KhoTonKhoId,a.KhoTaiSanId,c.TenKhoTaiSan,a.CoSoId,a.ThangNam,a.TrangThai,b.TaiSanId,d.MaTaiSan,d.TenTaiSan,d.DonViTinh,
	b.DonGia,b.GiaMua,b.GiaBan,b.TonDau,b.TonDau * b.DonGia as SoTien,b.NguonNganSachId,e.TenNguonNganSach,b.NhaCungCapId,f.TenNhaCungCap,b.HanDung,b.LoSanXuat
	 from KhoTonKho a 
	inner join KhoTonKhoChiTiet b on a.KhoTonKhoId=b.KhoTonKhoId
	inner join KhoTaiSan c on a.KhoTaiSanId=c.KhoTaiSanId
	inner join TaiSan d on b.TaiSanId=d.TaiSanId
	left join NguonNganSach e on b.NguonNganSachId=e.NguonNganSachId
	left join NhaCungCap f on b.NhaCungCapId=f.NhaCungCapId
	where (a.KhoTonKhoId =@KhoTonKhoId or (a.KhoTaiSanId = @KhoTaiSanId and a.ThangNam = @ThangNam ) ) and a.CoSoId=@CoSoId and b.TonDau>0

-----------------------------------------------------
SET NOCOUNT OFF
END