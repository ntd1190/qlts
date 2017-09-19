﻿USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_DieuChuyenChiTiet_InsertDieuChuyenChiTiet]    Script Date: 9/19/2017 10:35:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[sp_DieuChuyenChiTiet_InsertDieuChuyenChiTiet]
	@DieuChuyenId INT
	,@TaiSanId INT
	,@PhongBanSuDung INT
	,@NhanVienSuDung INT
	,@PhongBanChuyenDen INT
	,@NhanVienTiepNhan INT
	,@SoLuong NUMERIC(18,4)
	,@LyDo NVARCHAR(max)
as
BEGIN
	Declare @ErrMsg nvarchar(max)
	DECLARE @V_NGAYDIEUCHUYEN DATETIME

	SELECT @V_NGAYDIEUCHUYEN = NgayDieuChuyen FROM dbo.DieuChuyen WHERE DieuChuyenId = @DieuChuyenId

	BEGIN TRAN
		BEGIN TRY
			
			INSERT dbo.DieuChuyenChiTiet( DieuChuyenId ,	TaiSanId ,	PhongBanSuDung ,	NhanVienSuDung,		PhongBanChuyenDen ,		NhanVienTiepNhan,	SoLuong ,	LyDo)
			SELECT						@DieuChuyenId,		@TaiSanId,	@PhongBanSuDung,	@NhanVienSuDung,	@PhongBanChuyenDen,		@NhanVienTiepNhan,	@SoLuong,	@LyDo

			/*
				.  giảm số lượng phòng sử dụng
				.  ghi tăng số lượng phòng chuyển đến
			*/

			--------- giảm phòng su dung
			IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId AND NhanVienId = @NhanVienSuDung AND PhongBanId = @PhongBanSuDung)
			BEGIN
				UPDATE dbo.TheoDoi SET SLGiam = SLGiam + @SoLuong WHERE TaiSanId = @TaiSanId AND NhanVienId = @NhanVienSuDung AND PhongBanId = @PhongBanSuDung
			END
			

			--------- tăng phòng chuyển đến
			IF EXISTS(SELECT 1 FROM dbo.TheoDoi WHERE TaiSanId = @TaiSanId AND NhanVienId = @NhanVienTiepNhan AND PhongBanId = @PhongBanChuyenDen)
			BEGIN
				UPDATE dbo.TheoDoi SET SLTang = SLTang + @SoLuong WHERE TaiSanId = @TaiSanId AND NhanVienId = @NhanVienTiepNhan AND PhongBanId = @PhongBanChuyenDen
			END
			ELSE
			BEGIN
				INSERT dbo.TheoDoi
						( 
							TaiSanId ,			NgayTrangCap ,			NgayBatDauSuDung ,		PhongBanId ,			
							NhanVienId ,		SLTon ,					SLTang ,				SLGiam,
							NgayGhiTang
						)
				SELECT		@TaiSanId			,@V_NGAYDIEUCHUYEN		,@V_NGAYDIEUCHUYEN		,@PhongBanChuyenDen
							,@NhanVienTiepNhan	,0						,@SoLuong				,0
							,@V_NGAYDIEUCHUYEN
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