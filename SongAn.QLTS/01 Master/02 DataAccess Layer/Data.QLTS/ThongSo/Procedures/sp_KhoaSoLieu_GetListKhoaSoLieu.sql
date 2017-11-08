

ALTER PROC [dbo].[sp_KhoaSoLieu_GetListKhoaSoLieu]
( 
	@NhanVienId varchar(10) = null,
	@CoSoId varchar(10) = null
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	select * from KhoaSoLieu where CoSoId=@CoSoId
	order by Nam desc
	

-----------------------------------------------------
SET NOCOUNT OFF
END