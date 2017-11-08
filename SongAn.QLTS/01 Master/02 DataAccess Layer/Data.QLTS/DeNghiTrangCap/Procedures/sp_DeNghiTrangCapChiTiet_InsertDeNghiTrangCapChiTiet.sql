ALTER proc [dbo].[sp_DeNghiTrangCapChiTiet_InsertDeNghiTrangCapChiTiet]
	@DeNghiId INT
	,@TenTaiSan NVARCHAR(max)
	,@MoTa NVARCHAR(500)
	,@LoaiId INT
	,@SoLuong NUMERIC(4,0)
	,@DonViTinh NVARCHAR(50)
	,@PhuongThucId INT
	,@NgayDeNghi DATETIME
	,@DuToan NUMERIC(18,4)
	,@DuToanDuocDuyet NUMERIC(18,4)
	,@GhiChu NVARCHAR(max)
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.DeNghiTrangCapChiTiet
			        (
			          DeNghiId ,			TenTaiSan ,				MoTa ,
			          LoaiId ,				SoLuong ,				DonViTinh ,
			          PhuongThucId ,		NgayDeNghi ,			DuToan ,
			          DuToanDuocDuyet ,		GhiChu
			        )
			SELECT	@DeNghiId				,@TenTaiSan				,@MoTa
					,@LoaiId				,@SoLuong				,@DonViTinh
					,@PhuongThucId			,@NgayDeNghi			,@DuToan
					,@DuToanDuocDuyet		,@GhiChu			

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
