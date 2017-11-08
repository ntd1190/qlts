

ALTER PROC [dbo].[sp_KhoaSoLieu_UpdateInsert]
( 
	@KhoaSoLieuId int =null,
	@Nam nvarchar(100) =null,
	@TrangThai nvarchar(100) =null,
	@CoSoId int =null
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	
		begin
		update KhoaSoLieu set TrangThai=@TrangThai where KhoaSoLieuId= @KhoaSoLieuId
		end
	select @@ROWCOUNT
-----------------------------------------------------
SET NOCOUNT OFF
END