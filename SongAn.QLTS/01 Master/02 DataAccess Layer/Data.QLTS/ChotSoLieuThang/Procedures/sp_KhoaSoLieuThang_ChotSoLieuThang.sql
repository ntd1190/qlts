ALTER proc [dbo].[sp_KhoaSoLieuThang_ChotSoLieuThang]
	@ThangNam NVARCHAR(100),
	@CoSoId NVARCHAR(10),
	@NhanVienId NVARCHAR(10)
as
BEGIN
	SET DATEFORMAT YMD
	Declare @ErrMsg nvarchar(max), @V_ThangTruoc NVARCHAR(4), @V_ChotThang INT, @V_NgayThangNam DATETIME, @V_KhoTonKhoId INT

	DECLARE @V_TB_KhoTonKhoChiTiet TABLE -- chứa các tài sản của tháng cần phát sinh đã có sẵn
	(
		KhoTaiSanId INT,
		TaiSanId INT,
		DonGia NUMERIC(18, 4) 
	)

	DECLARE @V_TB_KhoTaiSan AS TABLE ( KhoTaiSanId int)

	------------------------------------------------------------------------------------------------------------------------------------
	SET @V_NgayThangNam = CONVERT(date,right(@ThangNam,2) +'-'+left(@ThangNam,2) + '-01')
	SET @V_ThangTruoc = FORMAT(DATEADD(m, -1, @V_NgayThangNam),'MMyy')	

	--IF NOT EXISTS(SELECT KhoTonKhoId FROM dbo.KhoTonKho WHERE ThangNam = @V_ThangTruoc AND CoSoId = @CoSoId AND TrangThai = 0)
	--BEGIN
	--	SELECT -1 AS ID RETURN -- chốt rồi
	--END

	SELECT @V_ChotThang = TrangThai FROM dbo.KhoaSoLieuThang WHERE ThangNam = @V_ThangTruoc AND CoSoId = @CoSoId
	
	IF (@V_ChotThang = 1)
	BEGIN
		SELECT -1 AS ID RETURN -- chốt rồi
	END
    
    
	INSERT @V_TB_KhoTaiSan( KhoTaiSanId )
	SELECT H.KhoTaiSanId FROM dbo.KhoTonKho H WHERE H.ThangNam = @V_ThangTruoc AND H.CoSoId = @CoSoId AND H.TrangThai = 0 GROUP BY H.KhoTaiSanId
	------------------------------------------------------------------------------------------------------------------------------------

	BEGIN TRAN
		
		BEGIN TRY
			
			INSERT @V_TB_KhoTonKhoChiTiet( KhoTaiSanId, TaiSanId, DonGia )
			SELECT H.KhoTaiSanId, L.TaiSanId, L.DonGia
			FROM dbo.KhoTonKho H 
			JOIN dbo.KhoTonKhoChiTiet L ON L.KhoTonKhoId = H.KhoTonKhoId WHERE H.ThangNam = @ThangNam AND H.CoSoId = @CoSoId AND H.TrangThai = 0

			--SELECT *
			UPDATE L
			SET L.TonDau = VTK.TonDau
			FROM dbo.KhoTonKho H 
			JOIN dbo.KhoTonKhoChiTiet L ON L.KhoTonKhoId = H.KhoTonKhoId 
			JOIN 
			(
				SELECT ISNULL(L.TonDau,0) + ISNULL(L.SLNhap,0) + ISNULL(L.SLXuat,0) TonDau, H.KhoTaiSanId, L.TaiSanId, L.DonGia
				FROM dbo.KhoTonKho H 
				JOIN dbo.KhoTonKhoChiTiet L ON L.KhoTonKhoId = H.KhoTonKhoId 
				JOIN @V_TB_KhoTonKhoChiTiet VTK ON VTK.KhoTaiSanId = H.KhoTaiSanId AND VTK.TaiSanId = L.TaiSanId AND VTK.DonGia = L.DonGia
				WHERE H.ThangNam = @V_ThangTruoc AND H.CoSoId = @CoSoId
			) AS VTK ON VTK.KhoTaiSanId = H.KhoTaiSanId AND VTK.TaiSanId = L.TaiSanId AND VTK.DonGia = L.DonGia
			WHERE H.ThangNam = @ThangNam AND H.CoSoId = @CoSoId AND H.TrangThai = 0				
			

			/*
			
			EXEC [dbo].[sp_KhoaSoLieu_InsertKhoaSoLieu] @ThangNam = 2018, -- int
														@CoSoId = N'1', -- nvarchar(10)
														@NhanVienId = N'10' -- nvarchar(10)


			*/

			DECLARE @V_KhoTaiSanId INT
			WHILE EXISTS(SELECT 1 FROM @V_TB_KhoTaiSan)
			BEGIN
				SELECT TOP 1 @V_KhoTaiSanId = KhoTaiSanId FROM @V_TB_KhoTaiSan
				---------------------------------------------------------------
				IF EXISTS(SELECT 1 FROM @V_TB_KhoTonKhoChiTiet WHERE KhoTaiSanId = @V_KhoTaiSanId)
				BEGIN
					SELECT @V_KhoTonKhoId = H.KhoTonKhoId FROM dbo.KhoTonKho H WHERE H.ThangNam = @ThangNam AND H.CoSoId = @CoSoId AND H.TrangThai = 0
				END
				ELSE
                BEGIN
					INSERT dbo.KhoTonKho
							( KhoTaiSanId ,		CoSoId ,		ThangNam ,
								TrangThai ,		NguoiTao ,		NgayTao ,		CtrVersion
							)
					SELECT	@V_KhoTaiSanId,		@CoSoId,		@ThangNam,
							0,					@NhanVienId,	GETDATE(),		1

					SELECT @V_KhoTonKhoId = SCOPE_IDENTITY()
				END		

				INSERT dbo.KhoTonKhoChiTiet
						(	KhoTonKhoId ,		TaiSanId ,		DonGia ,
							GiaMua ,			GiaBan ,		TonDau ,
							SLNhap ,			SLXuat ,		NguonNganSachId ,
							NhaCungCapId ,		HanDung ,		LoSanXuat
						)
				SELECT		@V_KhoTonKhoId ,	TaiSanId ,		DonGia ,
							L.GiaMua ,			L.GiaBan ,		(L.TonDau + L.SLNhap - L.SLXuat) ,
							0 ,					0 ,				L.NguonNganSachId ,
							L.NhaCungCapId ,	L.HanDung ,		L.LoSanXuat
				
				FROM dbo.KhoTonKho H 
				JOIN dbo.KhoTonKhoChiTiet L ON L.KhoTonKhoId = H.KhoTonKhoId 
				WHERE H.ThangNam = @V_ThangTruoc AND H.KhoTaiSanId = @V_KhoTaiSanId AND H.CoSoId = @CoSoId AND H.TrangThai = 0
				AND NOT EXISTS(
							SELECT 1 FROM @V_TB_KhoTonKhoChiTiet vtk WHERE vtk.KhoTaiSanId = @V_KhoTaiSanId AND vtk.TaiSanId = l.TaiSanId AND vtk.DonGia = L.DonGia
						  )
				---------------------------------------------------------------
				DELETE @V_TB_KhoTaiSan WHERE KhoTaiSanId= @V_KhoTaiSanId
				SELECT @V_KhoTaiSanId= NULL, @V_KhoTonKhoId = NULL
			END
			
			UPDATE dbo.KhoTonKho SET TrangThai = 1 WHERE ThangNam = @V_ThangTruoc AND CoSoId = @CoSoId

			Update dbo.ThongSo set Ten = @ThangNam where ThongSoId=1 --and CoSoId=@CoSoId

			IF EXISTS(SELECT * FROM dbo.KhoaSoLieuThang WHERE ThangNam= @V_ThangTruoc AND CoSoId = @CoSoId)
			BEGIN
				UPDATE dbo.KhoaSoLieuThang SET TrangThai = 1 WHERE ThangNam= @V_ThangTruoc AND CoSoId = @CoSoId
			END
			ELSE
            BEGIN
				INSERT dbo.KhoaSoLieuThang( ThangNam, TrangThai, CoSoId )
				SELECT @V_ThangTruoc, 1, @CoSoId
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
