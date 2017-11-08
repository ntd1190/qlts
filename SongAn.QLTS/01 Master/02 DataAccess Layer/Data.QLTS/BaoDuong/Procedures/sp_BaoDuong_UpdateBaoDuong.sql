ALTER proc [dbo].[sp_BaoDuong_UpdateBaoDuong]
	@BaoDuongId INT,
	@TaiSanId INT,
	@PhongBanId INT,
	@CanBoId INT,
	@NgayBaoDuong DATETIME,
	@NgayDuKien DATETIME,
	@DuToan NUMERIC(18,4),
	@LoaiBaoDuongId INT,
	@MoTa NVARCHAR(500),
	@CoSoId INT,
	@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	

	BEGIN TRAN
		
		BEGIN TRY
			UPDATE dbo.BaoDuong
			SET TaiSanId = @TaiSanId,
				PhongBanId = @PhongBanId,
				NhanVienId= @CanBoId,
				NgayBaoDuong = @NgayBaoDuong,
				NgayDuKien = @NgayDuKien,
				DuToan = @DuToan,
				LoaiBaoDuongId = @LoaiBaoDuongId,
				MoTa = @MoTa
			WHERE BaoDuongId = @BaoDuongId

			DELETE dbo.SuaChua WHERE BaoDuongId = @BaoDuongId

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
