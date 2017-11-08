

ALTER PROC [dbo].[sp_KhoaSoLieuThang_GetListKhoaSoLieuThang]
( 
	@NhanVienId varchar(10) = null,
	@CoSoId varchar(10) = null
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	SELECT * FROM dbo.KhoaSoLieuThang WHERE CoSoId = @CoSoId ORDER BY ThangNam DESC

-----------------------------------------------------
SET NOCOUNT OFF
END