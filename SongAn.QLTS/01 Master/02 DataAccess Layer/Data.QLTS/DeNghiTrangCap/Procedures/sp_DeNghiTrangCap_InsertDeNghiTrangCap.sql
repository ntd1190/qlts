ALTER proc [dbo].[sp_DeNghiTrangCap_InsertDeNghiTrangCap]
	@NgayLap DATETIME
	,@SoPhieu NVARCHAR(50)
	,@PhanLoaiId INT
	,@PhongBanId INT
	,@NoiDung NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
	,@GuiCapTren INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	if(@PhongBanId = 0) SET @PhongBanId = NULL
	if(@GuiCapTren = 0) SET @GuiCapTren = NULL
	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.DeNghiTrangCap
			        ( Ngay ,			SoPhieu ,			PhanLoaiId ,
			          PhongBanId ,		NoiDung ,			CoSoId ,
			          DuyetId ,			NguoiDuyet ,		NguoiTao ,
			          NgayTao ,			CtrVersion,GuiCapTren
			        )
			SELECT	 @NgayLap			,@SoPhieu			,@PhanLoaiId
					 ,@PhongBanId		,@NoiDung			,@CoSoId
					 ,0					,0					,@NhanVienId
					 ,GETDATE()			,1, @GuiCapTren

			SELECT SCOPE_IDENTITY() AS DeNghiIdI

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
