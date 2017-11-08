ALTER proc [dbo].[sp_DieuChuyen_InsertDieuChuyen]
	@SoChungTu NVARCHAR(50)
	,@NgayChungTu datetime
	,@NgayDieuChuyen datetime
	,@GhiChu NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max),
			@V_CHOTNAM INT

	SELECT @V_CHOTNAM = TrangThai FROM dbo.KhoaSoLieu WHERE Nam = YEAR(@NgayDieuChuyen) AND CoSoId = @CoSoId

	-- check chốt năm
	IF (@V_CHOTNAM = 1)
	BEGIN
		SELECT -1 AS DieuChuyenIdI RETURN
	END
	
	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.DieuChuyen
			        ( SoChungTu ,		NgayChungTu ,		NgayDieuChuyen ,
			          GhiChu ,			DuyetId ,			NguoiDuyet ,
			          CoSoId ,			NguoiTao ,			NgayTao ,
			          CtrVersion
			        )
			SELECT	@SoChungTu			,@NgayChungTu		,@NgayDieuChuyen
					,@GhiChu			,0					,0
					,@CoSoId			,@NhanVienId		,GETDATE()
					,1

			SELECT SCOPE_IDENTITY() AS DieuChuyenIdI

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
