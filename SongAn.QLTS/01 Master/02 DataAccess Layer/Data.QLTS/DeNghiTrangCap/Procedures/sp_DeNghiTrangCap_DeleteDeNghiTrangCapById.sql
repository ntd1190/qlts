ALTER proc [dbo].[sp_DeNghiTrangCap_DeleteDeNghiTrangCapById]
	@DeNghiId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	BEGIN TRAN
		
		BEGIN TRY
			
			DELETE dbo.DeNghiTrangCapChiTiet WHERE DeNghiId = @DeNghiId
			DELETE dbo.DeNghiTrangCap WHERE DeNghiId = @DeNghiId
			
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
