USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_GhiTang_UpdateGhiTang]    Script Date: 9/19/2017 10:38:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER proc [dbo].[sp_GhiTang_UpdateGhiTang]
	@GhiTangId INT
	,@SoChungTu NVARCHAR(50)
	,@NgayChungTu datetime
	,@NgayGhiTang datetime
	,@NoiDung NVARCHAR(max)
	,@CoSoId INT
	,@NhanVienId INT
	,@CompareLine INT
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	
	DECLARE @V_TB_GHITANGCT TABLE
	(
		ROWID INT IDENTITY(1,1),
		TAISANID INT,
		NGAYBATDAUSUDUNG DATETIME,
		PHONGBANID INT,
		NHANVIENID INT,
		SOLUONG NUMERIC(18,4)
	)
	DECLARE @V_ROWID INT ,
			@V_TAISANID INT,
			@V_NGAYBATDAUSUDUNG DATETIME,
			@V_PHONGBANID INT,
			@V_NHANVIENID INT,
			@V_SOLUONG NUMERIC(18,4)

	BEGIN TRAN
		
		BEGIN TRY
			
			UPDATE dbo.GhiTang
			SET NgayChungTu = @NgayChungTu,
				NgayGhiTang = @NgayGhiTang,
				NoiDung = @NoiDung
			WHERE GhiTangId = @GhiTangId
			
			-------------------------------------------------------------
			/* cập nhật lại tồn cho theo dõi */

			IF (@CompareLine = 0)	
			BEGIN
				INSERT @V_TB_GHITANGCT( TAISANID ,NGAYBATDAUSUDUNG ,PHONGBANID ,NHANVIENID ,SOLUONG)
				SELECT GTCT.TaiSanId,GTCT.NgayBatDauSuDung,GTCT.PhongBanId,GTCT.NhanVienId,GTCT.SoLuong
				FROM dbo.GhiTangChiTiet GTCT WHERE GTCT.GhiTangId = @GhiTangId


				WHILE EXISTS(SELECT 1 FROM @V_TB_GHITANGCT)
				BEGIN
					SELECT TOP 1 @V_ROWID = ROWID, @V_TAISANID = TAISANID, @V_NGAYBATDAUSUDUNG = NGAYBATDAUSUDUNG, @V_PHONGBANID = PHONGBANID, @V_NHANVIENID=NHANVIENID,@V_SOLUONG = SOLUONG FROM @V_TB_GHITANGCT

					IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENID AND PhongBanId = @V_PHONGBANID )
					BEGIN

						UPDATE dbo.TheoDoi SET SLTang = SLTang - @V_SOLUONG WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENID AND PhongBanId = @V_PHONGBANID 

						IF (SELECT SLTon + SLTang - SLGiam FROM dbo.TheoDoi WHERE TaiSanId = @V_TAISANID AND NhanVienId = @V_NHANVIENID AND PhongBanId = @V_PHONGBANID) < 0
						BEGIN	
							begin try rollback tran end try begin catch end CATCH
							SELECT -1 AS ID
							RETURN
						END
					END
				

					DELETE @V_TB_GHITANGCT WHERE ROWID = @V_ROWID
					SELECT @V_ROWID = NULL,@V_TAISANID = NULL,@V_NGAYBATDAUSUDUNG = NULL,@V_PHONGBANID = NULL,@V_NHANVIENID = NULL,@V_SOLUONG = NULL
				END

				DELETE dbo.GhiTangChiTiet WHERE GhiTangId = @GhiTangId

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
