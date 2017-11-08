USE [QLTS]
GO

ALTER proc [dbo].[sp_KhaiThac_UpdateKhaiThac]
	@KhaiThacId INT
	,@TaiSanId INT
	,@PhongBanId INT
	,@NhanVienIdKT INT
	,@KhachHangNCCId INT
	,@SoChungTu NVARCHAR(50)
	,@SoLuongKhaiThac NUMERIC(18,4)
	,@DonGiaKhaiThac NUMERIC(18,4)
	,@ThoiGianBatDau datetime
	,@ThoiGianKetThuc datetime
	,@TienThu NUMERIC(18,4)
	,@NopNganSach NUMERIC(18,4)
	,@DonVi NUMERIC(18,4)
	,@GhiChu NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
	,@CtrVersion INT
	,@HopDongId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)

	IF EXISTS (SELECT 1 FROM dbo.KhaiThac WHERE KhaiThacId = @KhaiThacId AND CtrVersion <> @CtrVersion)
	BEGIN
		SELECT -1 AS ID
		RETURN
	END

	BEGIN TRAN
		
		BEGIN TRY
			
			UPDATE dbo.KhaiThac
			SET TaiSanId = @TaiSanId,
				PhongBanId = @PhongBanId,
				NhanVienId = @NhanVienIdKT,
				KhachHangNCCId = @KhachHangNCCId,
				SoLuongKhaiThac = @SoLuongKhaiThac,
				DonGiaKhaiThac = @DonGiaKhaiThac,
				ThoiGianBatDau = @ThoiGianBatDau,
				ThoiGianKetThuc = @ThoiGianKetThuc,
				TienThu = @TienThu,
				NopNganSach = @NopNganSach,
				DonVi = @DonVi,
				GhiChu = @GhiChu,
				HopDongId = @HopDongId,
				CtrVersion = CtrVersion + 1
			WHERE KhaiThacId = @KhaiThacId
			
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
