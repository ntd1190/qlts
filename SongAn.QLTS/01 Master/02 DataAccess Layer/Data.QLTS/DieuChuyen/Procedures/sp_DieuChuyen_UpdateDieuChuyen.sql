ALTER proc [dbo].[sp_DieuChuyen_UpdateDieuChuyen]
	@DieuChuyenId INT
	,@SoChungTu NVARCHAR(50)
	,@NgayChungTu datetime
	,@NgayDieuChuyen datetime
	,@GhiChu NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)

	DECLARE @V_TB_DIEUCHUYENCT TABLE
	(
		ROWID INT IDENTITY(1,1),
		TAISANID INT,
		PHONGBANSUDUNG INT,
		NHANVIENSUDUNG INT,
		PHONGBANCHUYENDEN INT,
		NHANVIENTIEPNHAN INT,
		SOLUONG NUMERIC(18,4)
	)

	DECLARE @V_ROWID INT,
			@V_TAISANID INT,
			@V_PHONGBANSUDUNG INT,
			@V_NHANVIENSUDUNG INT,
			@V_PHONGBANCHUYENDEN INT,
			@V_NHANVIENTIEPNHAN INT,
			@V_SOLUONG NUMERIC(18,4),
			@V_CHOTNAM INT,
			@V_NGAYDIEUCHUYEN_OLD DATETIME,
			@V_DUYETID INT
	
	---------------------------------------------------------------------------------------------------
	SELECT @V_NGAYDIEUCHUYEN_OLD = NgayDieuChuyen, @V_DUYETID = DuyetId FROM dbo.DieuChuyen WHERE DieuChuyenId = @DieuChuyenId
	SELECT @V_CHOTNAM = TrangThai FROM dbo.KhoaSoLieu WHERE Nam = YEAR(@V_NGAYDIEUCHUYEN_OLD) AND CoSoId = @CoSoId

	-- check chốt năm + duyệt
	IF (@V_DUYETID = 1)
	BEGIN
		SELECT -2 AS ID RETURN
	END
	IF (@V_CHOTNAM = 1)
	BEGIN
		SELECT -3 AS ID RETURN
	END

	---------------------------------------------------------------------------------------------------

	BEGIN TRAN
		
		BEGIN TRY
			
			UPDATE dbo.DieuChuyen
			SET NgayChungTu = @NgayChungTu
				,NgayDieuChuyen = @NgayDieuChuyen
				,GhiChu = @GhiChu
			WHERE DieuChuyenId = @DieuChuyenId

			/*
				. cập nhật lại số lượng tăng, giảm bảng theo dõi
			*/

			INSERT @V_TB_DIEUCHUYENCT(TAISANID ,PHONGBANSUDUNG ,NHANVIENSUDUNG, PHONGBANCHUYENDEN ,NHANVIENTIEPNHAN ,SOLUONG)
			SELECT TaiSanId, PhongBanSuDung, NhanVienSuDung, PhongBanChuyenDen, NhanVienTiepNhan, SoLuong
			FROM dbo.DieuChuyenChiTiet WHERE DieuChuyenId = @DieuChuyenId

			WHILE EXISTS(SELECT 1 FROM @V_TB_DIEUCHUYENCT)
			BEGIN
				SELECT TOP 1 @V_ROWID = ROWID, @V_TAISANID = TAISANID, @V_PHONGBANSUDUNG = PHONGBANSUDUNG, @V_NHANVIENSUDUNG = NHANVIENSUDUNG, @V_PHONGBANCHUYENDEN = PHONGBANCHUYENDEN, @V_NHANVIENTIEPNHAN = NHANVIENTIEPNHAN, @V_SOLUONG = SOLUONG FROM @V_TB_DIEUCHUYENCT

				-- cập nhật sl phòng sử dụng
				IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENSUDUNG AND PhongBanId = @V_PHONGBANSUDUNG AND Nam = YEAR(@V_NGAYDIEUCHUYEN_OLD))
				BEGIN
					UPDATE dbo.TheoDoi SET SLGiam = SLGiam - @V_SOLUONG WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENSUDUNG AND PhongBanId = @V_PHONGBANSUDUNG AND Nam = YEAR(@V_NGAYDIEUCHUYEN_OLD)
				END

				-- cập nhật sl phòng chuyển đến
				IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENTIEPNHAN AND PhongBanId = @V_PHONGBANCHUYENDEN AND Nam = YEAR(@V_NGAYDIEUCHUYEN_OLD))
				BEGIN
					UPDATE dbo.TheoDoi SET SLTang = SLTang - @V_SOLUONG WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENTIEPNHAN AND PhongBanId = @V_PHONGBANCHUYENDEN AND Nam = YEAR(@V_NGAYDIEUCHUYEN_OLD)
				END
				

				DELETE @V_TB_DIEUCHUYENCT WHERE ROWID = @V_ROWID
				SELECT @V_ROWID = NULL,@V_TAISANID = NULL,@V_PHONGBANSUDUNG = NULL,@V_NHANVIENSUDUNG = NULL,@V_PHONGBANCHUYENDEN = NULL, @V_NHANVIENTIEPNHAN=NULL, @V_SOLUONG = NULL
			END


			DELETE dbo.DieuChuyenChiTiet WHERE DieuChuyenId = @DieuChuyenId

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
