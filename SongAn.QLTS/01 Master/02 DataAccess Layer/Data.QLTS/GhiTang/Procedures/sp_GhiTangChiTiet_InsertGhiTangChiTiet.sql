ALTER proc [dbo].[sp_GhiTangChiTiet_InsertGhiTangChiTiet]
	@GhiTangId INT
	,@TaiSanId INT
	,@NgayBatDauSuDung DATETIME
	,@PhongBanId INT
	,@NhanVienId INT
	,@SoLuong NUMERIC(18,4)
	,@HopDongId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	DECLARE @V_NGAYGHITANG DATETIME

	IF (@HopDongId = 0) SET @HopDongId = NULL

	SELECT @V_NGAYGHITANG = NgayGhiTang FROM dbo.GhiTang WHERE GhiTangId = @GhiTangId
	
	IF (@PhongBanId = 0) SET @PhongBanId = NULL
	IF (@NhanVienId = 0) SET @NhanVienId = NULL

	BEGIN TRAN
		BEGIN TRY
			
			INSERT dbo.GhiTangChiTiet
			        ( GhiTangId ,			TaiSanId ,			NgayBatDauSuDung ,
			          PhongBanId ,			NhanVienId ,		SoLuong,				HopDongId
			        )
			SELECT	@GhiTangId				,@TaiSanId			,@NgayBatDauSuDung
					,@PhongBanId			,@NhanVienId		,@SoLuong,				@HopDongId
			
			IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId AND NhanVienId = @NhanVienId AND PhongBanId = @PhongBanId AND Nam = YEAR(@V_NGAYGHITANG))
			BEGIN
				UPDATE dbo.TheoDoi SET SLTang = SLTang + @SoLuong,NgayGhiTang=@V_NGAYGHITANG WHERE TaiSanId = @TaiSanId AND NhanVienId = @NhanVienId AND PhongBanId = @PhongBanId AND Nam = YEAR(@V_NGAYGHITANG)
			END
			ELSE
			BEGIN
				INSERT dbo.TheoDoi
						( 
							TaiSanId ,			NgayTrangCap ,			NgayBatDauSuDung ,		PhongBanId ,			
							NhanVienId ,		SLTon ,					SLTang ,				SLGiam		, 
							NgayGhiTang ,		Nam,					HopDongId
						)
				SELECT		@TaiSanId			,@V_NGAYGHITANG			,@NgayBatDauSuDung		,@PhongBanId
							,@NhanVienId		,0						,@SoLuong				,0			
							,@V_NGAYGHITANG,	YEAR(@V_NGAYGHITANG),	@HopDongId
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
