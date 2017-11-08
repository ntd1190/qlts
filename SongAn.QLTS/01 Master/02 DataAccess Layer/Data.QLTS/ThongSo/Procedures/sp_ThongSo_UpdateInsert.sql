

ALTER PROC [dbo].[sp_ThongSo_UpdateInsert]
( 
	@ThongSoId int =null,
	@Loai nvarchar(100) =null,
	@Ten nvarchar(100) =null,
	@TaiSan varchar(2) =null,
	@NhanVienId int =null
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	if(exists(select * from ThongSo a 
	left join ThongSoUser b on a.ThongSoId=b.ThongSoId  
	where a.ThongSoId = @ThongSoId AND b.NhanVienId = @NhanVienId))
		begin
		update ThongSoUser set Ten=@Ten where  ThongSoId = @ThongSoId and NhanVienId = @NhanVienId
		end
	else
		begin
		insert into ThongSoUser (ThongSoId,NhanVienId,Loai,Ten) values (@ThongSoId,@NhanVienId,@Loai,@Ten)
		end
		select @@ROWCOUNT
-----------------------------------------------------
SET NOCOUNT OFF
END