USE [QLTS]
GO

SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[sp_LapBaoCao_DeleteLapBaoCaoById]
	@LapBaoCaoId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY
			DELETE dbo.LapBaoCao WHERE LapBaoCaoId = @LapBaoCaoId
			DELETE dbo.LapBaoCaoChiTiet WHERE LapBaoCaoId = @LapBaoCaoId
			
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
