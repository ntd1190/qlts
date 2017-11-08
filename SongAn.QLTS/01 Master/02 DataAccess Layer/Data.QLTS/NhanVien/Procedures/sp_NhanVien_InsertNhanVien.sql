USE [QLTS]
GO


ALTER proc [dbo].[sp_NhanVien_InsertNhanVien]
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
	Declare @ErrMsg nvarchar(max), @NhanVienId INT

	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.NhanVien
			        ( MaNhanVien ,		TenNhanVien ,		ChucDanh ,
			          DienThoai ,		Email ,				DiaChi ,
			          GhiChu ,			NguoiTao ,			NgayTao ,
			          CtrVersion
			        )
			SELECT	 @MaNhanVien,		@TenNhanVien,		@ChucDanh,
					 @DienThoai,		@Email,				@DiaChi,
					 @GhiChu,			@NguoiTao,			GETDATE(),
					 1

			SELECT @NhanVienId = SCOPE_IDENTITY()
			SELECT @NhanVienId  AS NhanVienIdI

			INSERT dbo.PhongBanNhanVien( PhongBanId, NhanVienId, CoSoId )
			SELECT Item, @NhanVienId, @CoSoId
			FROM dbo.DelimitedSplit8K(@PhongBanId,',') WHERE Item <> ''

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
