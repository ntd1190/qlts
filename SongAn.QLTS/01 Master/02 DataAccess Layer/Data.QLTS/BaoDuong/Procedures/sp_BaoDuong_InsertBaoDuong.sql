ALTER proc [dbo].[sp_BaoDuong_InsertBaoDuong]
	@TaiSanId INT,
	@PhongBanId INT,
	@CanBoId INT,
	@NgayBaoDuong DATETIME,
	@NgayDuKien DATETIME,
	@DuToan NUMERIC(18,4),
	@LoaiBaoDuongId INT,
	@MoTa NVARCHAR(MAX),
	@CoSoId INT,
	@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)

	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.BaoDuong
			        ( TaiSanId ,		NgayBaoDuong ,			NgayDuKien ,
			          DuToan ,			LoaiBaoDuongId ,		MoTa ,
			          DuyetId ,			NguoiDuyet ,			CoSoId ,
			          NguoiTao ,		NgayTao ,				CtrVersion,
					  PhongBanId,		NhanVienId
			        )
			SELECT	@TaiSanId			,@NgayBaoDuong			,@NgayDuKien
					,@DuToan			,@LoaiBaoDuongId		,@MoTa
					,0					,0						,@CoSoId
					,@NhanVienId		,GETDATE()				,1
					,@PhongBanId		,@CanBoId

			SELECT SCOPE_IDENTITY() AS BaoDuongIdI

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
