ALTER proc [dbo].[sp_KhoaSoLieu_InsertKhoaSoLieu]
	@Nam INT,
	@CoSoId NVARCHAR(10),
	@NhanVienId NVARCHAR(10)
as
BEGIN
	Declare @ErrMsg nvarchar(max),
			@V_NAMTRUOC INT,
			@V_CHOTNAM INT
	
	DECLARE @V_TB_THEODOI TABLE -- chứa các tài sản của năm cần phát sinh đã có sẵn
	(
		TaiSanId INT,
		PhongBanId INT,
		NhanVienId INT,
		Nam INT
	)
	-------------------------------------------------------------------------
	SET @V_NAMTRUOC = @Nam - 1

	SELECT @V_CHOTNAM = TrangThai FROM dbo.KhoaSoLieu WHERE Nam = @V_NAMTRUOC AND CoSoId = @CoSoId
	
	IF (@V_CHOTNAM = 1)
	BEGIN
		SELECT -1 AS ID RETURN
	END
    
	-------------------------------------------------------------------------

	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT @V_TB_THEODOI( TaiSanId ,PhongBanId ,NhanVienId ,Nam)
			SELECT TaiSanId, PhongBanId, NhanVienId, Nam
			FROM dbo.TheoDoi WHERE Nam = @Nam

			--SELECT *
			UPDATE TD
			SET TD.SLTon = VTD.TonDau
			FROM dbo.TheoDoi TD
			JOIN
			(
				SELECT ISNULL(TD.SLTon,0) + ISNULL(TD.SLTang,0) - ISNULL(TD.SLGiam,0) TonDau, TD.NhanVienId, TD.PhongBanId, TD.TaiSanId
				FROM @V_TB_THEODOI VTD
				JOIN dbo.TheoDoi TD ON VTD.NhanVienId = TD.NhanVienId AND VTD.PhongBanId = TD.PhongBanId AND VTD.TaiSanId = TD.TaiSanId
				WHERE TD.Nam = @V_NAMTRUOC
			) AS VTD ON VTD.NhanVienId = TD.NhanVienId AND VTD.PhongBanId = TD.PhongBanId AND VTD.TaiSanId = TD.TaiSanId
			WHERE TD.Nam = @Nam

			/*
			
			EXEC [dbo].[sp_KhoaSoLieu_InsertKhoaSoLieu] @Nam = 2018, -- int
														@CoSoId = N'1', -- nvarchar(10)
														@NhanVienId = N'10' -- nvarchar(10)


			*/

			INSERT dbo.TheoDoi
					( TaiSanId ,				NgayGhiTang ,			NgayTrangCap ,			
						NgayBatDauSuDung ,		PhongBanId ,			NhanVienId ,
						SLTon ,					SLTang ,				SLGiam		,		Nam
					)
			SELECT	TaiSanId,					NgayGhiTang,			NgayTrangCap,
					NgayBatDauSuDung,			PhongBanId,				NhanVienId,
					(SLTon + SLTang - SLGiam),	0,						0			,		@Nam
			FROM dbo.TheoDoi td
			WHERE Nam = @V_NAMTRUOC
			AND NOT EXISTS(
							SELECT 1 FROM @V_TB_THEODOI vtd WHERE td.NhanVienId = vtd.NhanVienId AND td.TaiSanId = vtd.TaiSanId AND td.PhongBanId = vtd.PhongBanId
						  )

			Update dbo.ThongSo set Ten = @Nam where ThongSoId=2 --and CoSoId=@CoSoId
			IF EXISTS(SELECT * FROM dbo.KhoaSoLieu WHERE Nam= CAST(@V_NAMTRUOC AS NCHAR) AND CoSoId = @CoSoId)
			BEGIN
				UPDATE dbo.KhoaSoLieu SET TrangThai = 1 WHERE Nam= CAST(@V_NAMTRUOC AS NCHAR) AND CoSoId = @CoSoId
			END
			ELSE
            BEGIN
				INSERT dbo.KhoaSoLieu( Nam, TrangThai, CoSoId )
				SELECT CAST(@V_NAMTRUOC AS NCHAR), 1, @CoSoId
			END
			SELECT @@ROWCOUNT AS ID

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
