USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_GhiTang_InsertGhiTang]    Script Date: 9/19/2017 10:38:05 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER proc [dbo].[sp_GhiTang_InsertGhiTang]
	@SoChungTu NVARCHAR(50)
	,@NgayChungTu datetime
	,@NgayGhiTang datetime
	,@NoiDung NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.GhiTang
			        ( SoChungTu ,			NgayChungTu ,			NgayGhiTang ,
			          NoiDung ,				DuyetId ,				NguoiDuyet ,
			          CoSoId ,				NguoiTao ,				NgayTao ,
			          CtrVersion
			        )
			SELECT	@SoChungTu				,@NgayChungTu			,@NgayGhiTang
					,@NoiDung				,0						,0
					,@CoSoId				,@NhanVienId			,GETDATE()
					,1

			SELECT SCOPE_IDENTITY() AS GhiTangIdI

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
