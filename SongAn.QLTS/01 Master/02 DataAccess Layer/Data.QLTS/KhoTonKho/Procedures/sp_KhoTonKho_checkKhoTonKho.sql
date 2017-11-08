USE [QLTS]
GO



ALTER PROC [dbo].[sp_KhoTonKho_checkKhoTonKho]
( 
	@KhoTaiSanId INT,
	@TaiSanId INT,
	@ThangNam varchar(4),
	@DonGia numeric(18,4)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	select COUNT(*) as NumberRow from KhoTonKhoChiTiet a inner join KhoTonKho b on a.KhoTonKhoId=b.KhoTonKhoId where b.KhoTaiSanId=@KhoTaiSanId and a.TaiSanId=@TaiSanId and b.ThangNam=@ThangNam and a.DonGia=@DonGia

-----------------------------------------------------
SET NOCOUNT OFF
END