

ALTER proc [dbo].[sp_KhaiThac_InsertKhaiThac]
	@TaiSanId INT
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
	,@HopDongId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	IF (@HopDongId = 0) SET @HopDongId = NULL
	BEGIN TRAN
		
		BEGIN TRY
			INSERT dbo.KhaiThac
			        ( TaiSanId ,					KhachHangNCCId ,			SoChungTu ,					
					  SoLuongKhaiThac ,				DonGiaKhaiThac ,			ThoiGianBatDau ,
					  ThoiGianKetThuc ,				TienThu ,					NopNganSach ,			
					  DonVi ,						GhiChu ,					CoSoId ,			
					  NguoiTao ,					NgayTao ,					CtrVersion,
					  PhongBanId,					NhanVienId,					HopDongId
			        )
			SELECT @TaiSanId						,@KhachHangNCCId			,@SoChungTu
					,@SoLuongKhaiThac				,@DonGiaKhaiThac			,@ThoiGianBatDau
					,@ThoiGianKetThuc				,@TienThu					,@NopNganSach
					,@DonVi							,@GhiChu					,@CoSoId
					,@NhanVienId					,GETDATE()					,1
					,@PhongBanId					,@NhanVienIdKT				,@HopDongId
			
			SELECT SCOPE_IDENTITY() AS KhaiThacIdI

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
