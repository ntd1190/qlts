USE [QLTS]
GO

ALTER proc [dbo].[sp_SuDung_DeleteSuDungById]
	@SuDungId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	BEGIN TRAN
		
		BEGIN TRY
			
			DELETE dbo.SuDungChiTiet WHERE SuDungId = @SuDungId
			DELETE dbo.SuDung WHERE SuDungId = @SuDungId
			
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
