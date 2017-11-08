USE [QLTS]
GO


ALTER proc [dbo].[sp_SuDung_UpdateSuDung]
	@SuDungId INT,
	@KyLap INT,
	@Nam numeric (4, 0),
	@NoiDung NVARCHAR(500),
	@CoSoId INT,
	@NguoiTao INT,
	@CtrVersion INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	IF EXISTS (SELECT 1 FROM dbo.SuDung WHERE SuDungId = @SuDungId AND CtrVersion <> @CtrVersion)
	BEGIN
		SELECT -1 AS ID
		RETURN
	END

	BEGIN TRAN
		
		BEGIN TRY
			
			UPDATE dbo.SuDung 
			SET KyLap = @KyLap,
				Nam = @Nam,
				NoiDung = @NoiDung,
				CtrVersion = CtrVersion + 1
			WHERE SuDungId = @SuDungId

			DELETE dbo.SuDungChiTiet WHERE SuDungId = @SuDungId

			SELECT @@ROWCOUNT AS ID

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
