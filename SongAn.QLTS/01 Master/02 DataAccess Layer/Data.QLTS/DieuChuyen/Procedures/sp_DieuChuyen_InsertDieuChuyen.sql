USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_DieuChuyen_InsertDieuChuyen]    Script Date: 9/19/2017 10:34:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER proc [dbo].[sp_DieuChuyen_InsertDieuChuyen]
	@SoChungTu NVARCHAR(50)
	,@NgayChungTu datetime
	,@NgayDieuChuyen datetime
	,@GhiChu NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT dbo.DieuChuyen
			        ( SoChungTu ,		NgayChungTu ,		NgayDieuChuyen ,
			          GhiChu ,			DuyetId ,			NguoiDuyet ,
			          CoSoId ,			NguoiTao ,			NgayTao ,
			          CtrVersion
			        )
			SELECT	@SoChungTu			,@NgayChungTu		,@NgayDieuChuyen
					,@GhiChu			,0					,0
					,@CoSoId			,@NhanVienId		,GETDATE()
					,1

			SELECT SCOPE_IDENTITY() AS DieuChuyenIdI

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
