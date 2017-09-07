USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCap_InsertDeNghiTrangCap]    Script Date: 9/7/2017 2:49:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[sp_DeNghiTrangCap_InsertDeNghiTrangCap]
	@NgayLap DATETIME
	,@SoPhieu NVARCHAR(50)
	,@PhanLoaiId INT
	,@PhongBanId INT
	,@NoiDung NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.DeNghiTrangCap
			        ( Ngay ,			SoPhieu ,			PhanLoaiId ,
			          PhongBanId ,		NoiDung ,			CoSoId ,
			          DuyetId ,			NguoiDuyet ,		NguoiTao ,
			          NgayTao ,			CtrVersion
			        )
			SELECT	 @NgayLap			,@SoPhieu			,@PhanLoaiId
					 ,@PhongBanId		,@NoiDung			,@CoSoId
					 ,0					,0					,@NhanVienId
					 ,GETDATE()			,1

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
