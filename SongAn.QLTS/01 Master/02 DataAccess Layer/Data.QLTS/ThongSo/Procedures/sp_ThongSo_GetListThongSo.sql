

ALTER PROC [dbo].[sp_ThongSo_GetListThongSo]
( 
	@NhanVienId varchar(10) = null
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	select a.ThongSoId,a.Loai,Isnull(b.Ten,a.Ten) as Ten,a.TaiSan from ThongSo a 
	left join ThongSoUser b on a.ThongSoId=b.ThongSoId  AND b.NhanVienId = @NhanVienId

-----------------------------------------------------
SET NOCOUNT OFF
END