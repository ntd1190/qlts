ALTER proc [dbo].[sp_GiayBaoHong_DeleteGiayBaoHongById]
	@GiayBaoHongId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	BEGIN TRAN
		
		BEGIN TRY
			
			DELETE dbo.GiayBaoHongChiTiet WHERE GiayBaoHongId = @GiayBaoHongId
			DELETE dbo.GiayBaoHong WHERE GiayBaoHongId = @GiayBaoHongId
			
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
