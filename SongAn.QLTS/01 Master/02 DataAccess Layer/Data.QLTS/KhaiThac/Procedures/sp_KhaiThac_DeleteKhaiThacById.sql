USE [QLTS]
GO

ALTER proc [dbo].[sp_KhaiThac_DeleteKhaiThacById]
	@KhaiThacId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY
			
			DELETE dbo.KhaiThac WHERE KhaiThacId = @KhaiThacId
			
			SELECT @@ROWCOUNT ID

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
