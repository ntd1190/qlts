ALTER proc [dbo].[sp_GhiTang_InsertGhiTang]
	@SoChungTu NVARCHAR(50)
	,@NgayChungTu datetime
	,@NgayGhiTang datetime
	,@NoiDung NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max),
			@V_CHOTNAM INT
	
	SELECT @V_CHOTNAM = TrangThai FROM dbo.KhoaSoLieu WHERE nam = YEAR(@NgayGhiTang) AND CoSoId = @CoSoId

	IF (@V_CHOTNAM = 1)
	BEGIN
		SELECT -1 AS GhiTangIdI RETURN
	END

	-----------------------------------------------------------------------------------------------------
	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.GhiTang
			        ( SoChungTu ,			NgayChungTu ,			NgayGhiTang ,
			          NoiDung ,				DuyetId ,				NguoiDuyet ,
			          CoSoId ,				NguoiTao ,				NgayTao ,
			          CtrVersion
			        )
			SELECT	@SoChungTu				,@NgayChungTu			,@NgayGhiTang
					,@NoiDung				,0						,0
					,@CoSoId				,@NhanVienId			,GETDATE()
					,1

			SELECT SCOPE_IDENTITY() AS GhiTangIdI

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
