USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_BaoDuong_DeleteBaoDuongById]    Script Date: 9/19/2017 10:27:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
