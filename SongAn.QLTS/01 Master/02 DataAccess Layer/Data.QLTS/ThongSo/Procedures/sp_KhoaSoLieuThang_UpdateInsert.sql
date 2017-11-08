

ALTER PROC [dbo].[sp_KhoaSoLieuThang_UpdateInsert]
( 
	@KhoaSoLieuThangId int =null,
	@ThangNam nvarchar(100) =null,
	@TrangThai nvarchar(100) =null,
	@CoSoId int =null
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	
		begin
		update dbo.KhoaSoLieuThang set TrangThai=@TrangThai where KhoaSoLieuThangId= @KhoaSoLieuThangId
		UPDATE dbo.KhoTonKho SET TrangThai = @TrangThai WHERE ThangNam = @ThangNam AND CoSoId = @CoSoId
		end
	select @@ROWCOUNT
-----------------------------------------------------
SET NOCOUNT OFF
END