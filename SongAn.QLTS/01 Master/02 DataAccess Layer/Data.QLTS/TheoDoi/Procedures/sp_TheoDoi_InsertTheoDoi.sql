USE [QLTS]


ALTER proc [dbo].[sp_TheoDoi_InsertTheoDoi]
	@TaiSanId INT
	,@NgayGhiTang DATETIME
    ,@NgayTrangCap datetime
	,@NgayBatDauSuDung DATETIME
	,@PhongBanId INT
	,@NhanVienId INT
	,@SLTon NUMERIC(18,4)
	,@SLTang NUMERIC(18,4)
	,@SLGiam NUMERIC(18,4)
	,@HopDongId INT
	,@CoSoId NVARCHAR(10)
	,@NguoiTao NVARCHAR(10)
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	,@Nam	VARCHAR(MAX)	=	NULL
	--LAY SO LIEU CAU HINH THONG SO
	EXEC sp_ThongSoUser_GetThongSo @LOAITHONGSO='SoLieuNam',@NHANVIEN=@NguoiTao,@NAM=@Nam OUTPUT;
	---------------------------

	IF (SELECT COUNT(KhoaSoLieuId) FROM dbo.KhoaSoLieu WHERE TrangThai = 1 AND CoSoId = @CoSoId and Nam=@Nam) > 0
	BEGIN
		SELECT -1 AS ID RETURN
	END

	IF (@HopDongId = 0) SET @HopDongId = NULL

	BEGIN TRAN
		
		BEGIN TRY
			
			IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId AND PhongBanId = @PhongBanId AND NhanVienId = @NhanVienId AND Nam = YEAR(@NgayGhiTang))
			BEGIN
				--UPDATE dbo.TheoDoi
				--SET NgayGhiTang = @NgayGhiTang,
				--	NgayTrangCap = @NgayTrangCap,
				--	NgayBatDauSuDung = @NgayBatDauSuDung,
				--	SLTon = @SLTon
				--WHERE TaiSanId = @TaiSanId AND PhongBanId = @PhongBanId AND NhanVienId = @NhanVienId

				--IF (SELECT SLTon + SLTang - SLGiam FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId AND PhongBanId = @PhongBanId AND NhanVienId = @NhanVienId) < 0
				--BEGIN
				--	SELECT -1 AS ID
				--	RETURN
				--END	
				SELECT -2 AS ID
			END
			ELSE
            BEGIN
				INSERT dbo.TheoDoi
						( TaiSanId ,				NgayGhiTang ,			NgayTrangCap ,			
						  NgayBatDauSuDung ,		PhongBanId ,			NhanVienId ,
						  SLTon ,					SLTang ,				SLGiam		,		
						  Nam,						HopDongId
						)
				SELECT	@TaiSanId					,@NgayGhiTang			,@NgayTrangCap
						,@NgayBatDauSuDung			,@PhongBanId			,@NhanVienId
						,@SLTon						,0						,0					
						,@Nam						,@HopDongId

				SELECT @@ROWCOUNT AS ID
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
