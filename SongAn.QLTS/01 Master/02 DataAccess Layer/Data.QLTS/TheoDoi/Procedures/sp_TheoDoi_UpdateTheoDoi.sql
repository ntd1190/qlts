USE [QLTS]
GO


ALTER proc [dbo].[sp_TheoDoi_UpdateTheoDoi]
	@TaiSanId INT
	,@TaiSanId_Old INT
	,@NgayGhiTang DATETIME
    ,@NgayTrangCap datetime
	,@NgayBatDauSuDung DATETIME
	,@PhongBanId INT
	,@PhongBanId_Old INT
	,@NhanVienId INT
	,@NhanVienId_Old INT
	,@Nam NUMERIC(4,0)
	,@SLTon NUMERIC(18,4)
	,@SLTang NUMERIC(18,4)
	,@SLGiam NUMERIC(18,4)
	,@HopDongId INT
	,@CoSoId NVARCHAR(10)
	,@NguoiTao NVARCHAR(10)
as
BEGIN
	Declare @ErrMsg nvarchar(max),
			@V_SLTang NUMERIC(18,4),
			@V_SLGiam NUMERIC(18,4),
			@V_CoSoId NVARCHAR(10)

	SET @V_CoSoId = @CoSoId
	
	IF (SELECT COUNT(KhoaSoLieuId) FROM dbo.KhoaSoLieu WHERE TrangThai = 1 AND CoSoId = @V_CoSoId and Nam= @Nam) > 0
	BEGIN
		SELECT -1 AS ID RETURN
	END


	SELECT @V_SLTang = SLTang, @V_SLGiam = SLGiam FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId_Old AND PhongBanId = @PhongBanId_Old AND NhanVienId = @NhanVienId_Old AND Nam = @Nam

	BEGIN TRAN
		
		BEGIN TRY

			IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId_Old AND PhongBanId = @PhongBanId_Old AND NhanVienId = @NhanVienId_Old AND Nam = @Nam)
			BEGIN

				IF (@V_SLGiam > 0 OR @V_SLTang > 0)
				BEGIN
					SELECT -2 AS ID
					RETURN
				END	
								
				UPDATE dbo.TheoDoi
				SET NgayGhiTang = @NgayGhiTang,
					NgayTrangCap = @NgayTrangCap,
					NgayBatDauSuDung = @NgayBatDauSuDung,
					SLTon = @SLTon,
					TaiSanId = @TaiSanId,
					PhongBanId = @PhongBanId,
					NhanVienId = @NhanVienId,
					HopDongId = @HopDongId
				WHERE TaiSanId = @TaiSanId_Old AND PhongBanId = @PhongBanId_Old AND NhanVienId = @NhanVienId_Old AND Nam = @Nam

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
