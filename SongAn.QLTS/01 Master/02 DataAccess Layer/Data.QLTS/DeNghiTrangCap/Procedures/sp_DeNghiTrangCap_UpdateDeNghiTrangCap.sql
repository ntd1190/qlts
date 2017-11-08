ALTER proc [dbo].[sp_DeNghiTrangCap_UpdateDeNghiTrangCap]
	@DeNghiId INT
	,@NgayLap DATETIME
	,@SoPhieu NVARCHAR(50)
	,@PhanLoaiId INT
	,@PhongBanId INT
	,@NoiDung NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY
			
			UPDATE dbo.DeNghiTrangCap
			SET Ngay = @NgayLap
				,PhanLoaiId = @PhanLoaiId
				,PhongBanId = @PhongBanId
				,NoiDung = @NoiDung
			WHERE DeNghiId = @DeNghiId

			DELETE dbo.DeNghiTrangCapChiTiet WHERE DeNghiId = @DeNghiId

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
