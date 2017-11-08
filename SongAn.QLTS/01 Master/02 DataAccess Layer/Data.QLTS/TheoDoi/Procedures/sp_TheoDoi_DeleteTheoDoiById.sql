USE [QLTS]
GO


ALTER proc [dbo].[sp_TheoDoi_DeleteTheoDoiById]
	@TaiSanId INT
	,@PhongBanId INT
	,@NhanVienId INT
	,@Nam NUMERIC(4,0)
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	DECLARE @V_SLTang NUMERIC(18,4)
			,@V_SLGiam NUMERIC(18,4)
			,@V_CoSoId INT

	SELECT @V_CoSoId = CoSoId FROM dbo.TaiSan WHERE TaiSanId = @TaiSanId

	IF (SELECT COUNT(KhoaSoLieuId) FROM dbo.KhoaSoLieu WHERE TrangThai = 1 AND CoSoId = @V_CoSoId and Nam=@Nam) > 0
	BEGIN
		SELECT -1 AS ID RETURN
	END

	SELECT @V_SLTang = SLTang, @V_SLGiam = SLGiam FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId AND PhongBanId = @PhongBanId AND NhanVienId = @NhanVienId AND Nam = @Nam

	BEGIN TRAN
		
		BEGIN TRY
			
			IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId AND PhongBanId = @PhongBanId AND NhanVienId = @NhanVienId AND Nam = @Nam)
			BEGIN
				
				IF (@V_SLGiam > 0 OR @V_SLTang > 0)
				BEGIN
					SELECT -2 AS ID	-- phat sinh su dung
					RETURN
				END	

				DELETE dbo.TheoDoi WHERE TaiSanId = @TaiSanId AND PhongBanId = @PhongBanId AND NhanVienId = @NhanVienId AND Nam = @Nam
				SELECT 0 AS ID

			END
			ELSE
            BEGIN
            	SELECT -3 AS ID	-- not exists
            END

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
