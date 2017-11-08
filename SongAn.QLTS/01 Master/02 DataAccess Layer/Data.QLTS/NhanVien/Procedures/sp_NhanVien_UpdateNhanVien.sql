USE [QLTS]
GO


ALTER proc [dbo].[sp_NhanVien_UpdateNhanVien]
	@NhanvienId INT,
	@PhongBanId NVARCHAR(500),
	@MaNhanVien VARCHAR(50),
	@TenNhanVien NVARCHAR(200),
	@DienThoai VARCHAR(15),
	@Email VARCHAR(100),
	@ChucDanh NVARCHAR(200),
	@DiaChi NVARCHAR(500),
	@GhiChu NVARCHAR(500),
	@NguoiTao INT,
	@CoSoId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)

	BEGIN TRAN
		
		BEGIN TRY
			
			UPDATE dbo.NhanVien
			SET MaNhanVien = @MaNhanVien,
				TenNhanVien = @TenNhanVien,
				DienThoai = @DienThoai,
				ChucDanh = @ChucDanh,
				Email = @Email,
				DiaChi = @DiaChi,
				GhiChu = @GhiChu,
				CtrVersion = CtrVersion + 1
			WHERE NhanVienId = @NhanvienId
			
			DELETE dbo.PhongBanNhanVien WHERE NhanVienId = @NhanvienId AND CoSoId = @CoSoId

			INSERT dbo.PhongBanNhanVien( PhongBanId, NhanVienId, CoSoId )
			SELECT Item, @NhanVienId, @CoSoId
			FROM dbo.DelimitedSplit8K(@PhongBanId,',') WHERE Item <> ''

			SELECT * FROM dbo.NhanVien nv JOIN dbo.PhongBanNhanVien pbnv ON pbnv.NhanVienId = nv.NhanVienId AND nv.NhanVienId = @NhanvienId
		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
