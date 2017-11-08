ALTER proc [dbo].[sp_BienBanKiemKe_UpdateBienBanKiemKe]
	@BienBanKiemKeId INT,
	@SoChungTu NVARCHAR(20),
	@NgayChungTu DATETIME,
	@NgayKiemKe DATETIME,
	@PhongBanId INT,
	@GhiChu NVARCHAR(500),
	@CoSoId INT,
	@NhanVienId INT,
	@MyTable_BanKiemKe MyTableType_BanKiemKe READONLY,
    @MyTable_BienBanKiemKeChiTiet MyTableType_BienBanKiemKeChiTiet READONLY
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY


			UPDATE dbo.BienBanKiemKe
			SET NgayChungTu = @NgayChungTu,
				NgayKiemKe = @NgayKiemKe,
				PhongBanId = @PhongBanId,
				GhiChu = @GhiChu
			WHERE BienBanKiemKeId = @BienBanKiemKeId
			

			DELETE dbo.BanKiemKe WHERE BienBanKiemKeId = @BienBanKiemKeId
			DELETE dbo.BienBanKiemKeChiTiet WHERE BienBanKiemKeId = @BienBanKiemKeId


			INSERT dbo.BienBanKiemKeChiTiet
			SELECT @BienBanKiemKeId, TaiSanId, SoLuong, SoLuongKiemKe
			FROM @MyTable_BienBanKiemKeChiTiet


			INSERT dbo.BanKiemKe
			SELECT  @BienBanKiemKeId, NguoiKiemKe, ChucVu, DaiDien, VaiTro 
			FROM @MyTable_BanKiemKe

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
