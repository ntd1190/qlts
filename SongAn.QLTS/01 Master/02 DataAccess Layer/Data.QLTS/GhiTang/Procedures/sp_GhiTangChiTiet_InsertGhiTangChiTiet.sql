USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_GhiTangChiTiet_InsertGhiTangChiTiet]    Script Date: 9/19/2017 10:39:29 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[sp_GhiTangChiTiet_InsertGhiTangChiTiet]
	@GhiTangId INT
	,@TaiSanId INT
	,@NgayBatDauSuDung DATETIME
	,@PhongBanId INT
	,@NhanVienId INT
	,@SoLuong NUMERIC(18,4)
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	DECLARE @V_NGAYGHITANG DATETIME

	SELECT @V_NGAYGHITANG = NgayGhiTang FROM dbo.GhiTang WHERE GhiTangId = @GhiTangId
	
	IF (@PhongBanId = 0) SET @PhongBanId = NULL
	IF (@NhanVienId = 0) SET @NhanVienId = NULL

	BEGIN TRAN
		BEGIN TRY
			
			INSERT dbo.GhiTangChiTiet
			        ( GhiTangId ,			TaiSanId ,			NgayBatDauSuDung ,
			          PhongBanId ,			NhanVienId ,		SoLuong
			        )
			SELECT	@GhiTangId				,@TaiSanId			,@NgayBatDauSuDung
					,@PhongBanId			,@NhanVienId		,@SoLuong
			
			IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId AND NhanVienId = @NhanVienId AND PhongBanId = @PhongBanId)
			BEGIN
				UPDATE dbo.TheoDoi SET SLTang = SLTang + @SoLuong,NgayGhiTang=@V_NGAYGHITANG WHERE TaiSanId = @TaiSanId AND NhanVienId = @NhanVienId AND PhongBanId = @PhongBanId
			END
			ELSE
			BEGIN
				INSERT dbo.TheoDoi
						( 
							TaiSanId ,			NgayTrangCap ,			NgayBatDauSuDung ,		PhongBanId ,			
							NhanVienId ,		SLTon ,					SLTang ,				SLGiam		, NgayGhiTang
						)
				SELECT		@TaiSanId			,@V_NGAYGHITANG			,@NgayBatDauSuDung		,@PhongBanId
							,@NhanVienId		,0						,@SoLuong				,0			,@V_NGAYGHITANG
			END

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
