ALTER proc [dbo].[sp_GiayBaoHongChiTiet_InsertGiayBaoHongChiTiet]
	@GiayBaoHongId INT,
	@TaiSanId INT,
	@PhongBanId INT,
	@NhanVienId INT,
	@SoLuong INT,
	@LyDo NVARCHAR(500),
	@GhiChu NVARCHAR(500)
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.GiayBaoHongChiTiet
			        ( TaiSanId ,			PhongBanId ,			NhanVienId ,
			          SoLuong ,				LyDo ,					GhiChu,
					  GiayBaoHongId
			        )
			SELECT	@TaiSanId,				@PhongBanId,			@NhanVienId,
					@SoLuong,				@LyDo,					@GhiChu,
					@GiayBaoHongId

			SELECT SCOPE_IDENTITY()
		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
