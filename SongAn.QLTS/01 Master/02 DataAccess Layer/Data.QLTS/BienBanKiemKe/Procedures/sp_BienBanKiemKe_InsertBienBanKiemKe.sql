ALTER proc [dbo].[sp_BienBanKiemKe_InsertBienBanKiemKe]
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
	DECLARE @BienBanKiemkeId INT
	SET @BienBanKiemkeId = 0

	BEGIN TRAN
		
		BEGIN TRY

			-- insert header
			INSERT dbo.BienBanKiemKe
			        ( SoChungTu ,			NgayChungTu ,			NgayKiemKe ,
			          PhongBanId ,			GhiChu ,				CoSoId ,
			          NguoiTao ,			NgayTao ,				CtrVersion
			        )
			SELECT	@SoChungTu				,@NgayChungTu			,@NgayKiemKe
					,@PhongBanId			,@GhiChu				,@CoSoId
					,@NhanVienId			,GETDATE()				,1
			
			SELECT @BienBanKiemkeId = SCOPE_IDENTITY()
			SELECT @BienBanKiemkeId AS BienBanKiemKeIdI

			--- insert line

			INSERT dbo.BienBanKiemKeChiTiet
			SELECT @BienBanKiemKeId, TaiSanId, SoLuong, SoLuongKiemKe
			FROM @MyTable_BienBanKiemKeChiTiet


			-- insert ban kiểm kê
			INSERT dbo.BanKiemKe
			SELECT  @BienBanKiemKeId, NguoiKiemKe, ChucVu, DaiDien, VaiTro 
			FROM @MyTable_BanKiemKe


		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
