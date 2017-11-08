ALTER proc [dbo].[sp_BaoDuong_DeleteBaoDuongById]
	@BaoDuongId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	BEGIN TRAN
		
		BEGIN TRY
			
			DELETE dbo.SuaChua WHERE BaoDuongId = @BaoDuongId
			DELETE dbo.BaoDuong WHERE BaoDuongId = @BaoDuongId			
			
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
