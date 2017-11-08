ALTER proc [dbo].[sp_GiayBaoHong_UpdateGiayBaoHongById]
	@GiayBaoHongId INT,
	@SoChungTu NVARCHAR(50),
	@Ngay DATETIME,
	@PhongBanId INT,
	@NoiDung NVARCHAR(500),
	@CoSoId INT,
	@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY
			
			UPDATE dbo.GiayBaoHong
			SET Ngay = @Ngay
				,PhongBanId = @PhongBanId
				,NoiDung = @NoiDung
			WHERE GiayBaoHongId = @GiayBaoHongId

			DELETE dbo.GiayBaoHongChiTiet WHERE GiayBaoHongId = @GiayBaoHongId

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
