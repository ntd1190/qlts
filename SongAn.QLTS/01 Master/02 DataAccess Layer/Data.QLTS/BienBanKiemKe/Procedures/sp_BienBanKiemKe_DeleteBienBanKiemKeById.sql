ALTER proc [dbo].[sp_BienBanKiemKe_DeleteBienBanKiemKeById]
	@BienBanKiemKeId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	BEGIN TRAN
		
		BEGIN TRY
			
			DELETE dbo.BanKiemKe WHERE BienBanKiemKeId = @BienBanKiemKeId
			DELETE dbo.BienBanKiemKeChiTiet WHERE BienBanKiemKeId = @BienBanKiemKeId
			DELETE dbo.BienBanKiemKe WHERE BienBanKiemKeId = @BienBanKiemKeId			
			
			SELECT @@ROWCOUNT

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
