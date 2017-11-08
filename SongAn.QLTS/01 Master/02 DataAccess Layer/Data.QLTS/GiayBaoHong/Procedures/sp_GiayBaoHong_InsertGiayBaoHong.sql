ALTER proc [dbo].[sp_GiayBaoHong_InsertGiayBaoHong]
	@SoChungTu NVARCHAR(50),
	@Ngay DATETIME,
	@PhongBanId INT,
	@NoiDung NVARCHAR(500),
	@CoSoId INT,
	@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	if(@PhongBanId = 0) SET @PhongBanId = NULL

	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.GiayBaoHong
			        ( SoChungTu ,		Ngay ,			PhongBanId ,
			          NoiDung ,			CoSoId ,		NguoiTao ,
			          NgayTao ,			CtrVersion
			        )
			SELECT @SoChungTu,			@Ngay,			@PhongBanId,
					@NoiDung,			@CoSoId,		@NhanVienId,
					GETDATE(),			1

			SELECT SCOPE_IDENTITY() AS GiayBaoHongIdI

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
