USE [QLTS]
go

ALTER proc [dbo].[sp_SuDung_InsertSuDung]
	@KyLap INT,
	@Nam numeric (4, 0),
	@NoiDung NVARCHAR(500),
	@CoSoId INT,
	@NguoiTao INT,
	@CtrVersion INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)

	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.SuDung
			        ( KyLap ,			Nam ,			NoiDung ,
			          CoSoId ,			NguoiTao ,		NgayTao ,
			          CtrVersion
			        )
			SELECT @KyLap,				@Nam,			@NoiDung,
					@CoSoId,			@NguoiTao,		GETDATE(),
					1

			SELECT SCOPE_IDENTITY() AS SuDungIdI

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
