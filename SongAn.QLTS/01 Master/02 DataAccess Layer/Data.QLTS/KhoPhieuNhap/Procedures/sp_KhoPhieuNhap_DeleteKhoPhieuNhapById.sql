USE [QLTS]
GO

ALTER proc [dbo].[sp_KhoPhieuNhap_DeleteKhoPhieuNhapById]
	@KhoPhieuNhapId INT
as
BEGIN
	Declare @ErrMsg nvarchar(max), @V_ChotKho INT, @V_KhoTaiSanId INT, @V_CoSoId INT, @V_NgayNhap DATETIME, @V_KhoTonKhoId INT
	DECLARE @V_TaiSanId INT, @V_SoLuong numeric (18, 4), @V_DonGia numeric (18, 4), @V_GiaMua numeric (18, 4), @V_GiaBan numeric (18, 4), @V_HanDung varchar (10), @V_LoSanXuat varchar (10), @V_RowId INT
	DECLARE @V_KhoPhieuNhapChiTiet_Rollback TABLE
	(
		RowId int IDENTITY(1, 1),
		KhoPhieuNhapId INT,
		TaiSanId int,
		SoLuong numeric (18, 4) ,
		DonGia numeric (18, 4) ,
		GiaMua numeric (18, 4) ,
		GiaBan numeric (18, 4) ,
		VAT numeric (4, 2) ,
		HanDung varchar (10),
		LoSanXuat varchar (10)
	)
	------------------------------------------------------------------------------------------------------------------------------------

	SELECT @V_KhoTaiSanId = KhoTaiSanId, @V_CoSoId= CoSoId, @V_NgayNhap=NgayNhap FROM dbo.KhoPhieuNhap WHERE KhoPhieuNhapId = @KhoPhieuNhapId
	SELECT @V_ChotKho = TrangThai FROM dbo.KhoTonKho WHERE KhoTaiSanId = @V_KhoTaiSanId AND CoSoId = @V_CoSoId AND ThangNam = (FORMAT(@V_NgayNhap,'MMyy'))

	IF (@V_ChotKho = 1)
	BEGIN
		SELECT -1 AS ID RETURN
	END

	INSERT @V_KhoPhieuNhapChiTiet_Rollback
	        ( KhoPhieuNhapId ,			TaiSanId ,				SoLuong ,
	          DonGia ,					GiaMua ,				GiaBan ,
	          VAT ,						HanDung ,				LoSanXuat
	        )
	SELECT	  KhoPhieuNhapId ,			TaiSanId ,				SoLuong ,
	          DonGia ,					GiaMua ,				GiaBan ,
	          VAT ,						HanDung ,				LoSanXuat
	FROM dbo.KhoPhieuNhapChiTiet WHERE KhoPhieuNhapId = @KhoPhieuNhapId 
	------------------------------------------------------------------------------------------------------------------------------------
	BEGIN TRAN
		
		BEGIN TRY
			
			SELECT @V_KhoTonKhoId = KhoTonKhoId FROM dbo.KhoTonKho WHERE KhoTaiSanId = @V_KhoTaiSanId AND CoSoId = @V_CoSoId AND ThangNam = FORMAT(@V_NgayNhap,'MMyy')

			WHILE EXISTS(SELECT 1 FROM @V_KhoPhieuNhapChiTiet_Rollback)
			BEGIN
				SELECT TOP 1 @V_RowId = RowId, @V_TaiSanId = TaiSanId, @V_SoLuong=SoLuong, @V_DonGia = DonGia, @V_GiaMua = GiaMua, @V_GiaBan = GiaBan, @V_HanDung = HanDung, @V_LoSanXuat = LoSanXuat FROM @V_KhoPhieuNhapChiTiet_Rollback

				IF EXISTS(SELECT 1 FROM dbo.KhoTonKhoChiTiet WHERE KhoTonKhoId = @V_KhoTonKhoId AND TaiSanId = @V_TaiSanId AND DonGia = @V_DonGia)
				BEGIN
					UPDATE dbo.KhoTonKhoChiTiet SET SLNhap = SLNhap - @V_SoLuong WHERE KhoTonKhoId = @V_KhoTonKhoId AND TaiSanId = @V_TaiSanId AND DonGia = @V_DonGia

					IF (SELECT TonDau + SLNhap - SLXuat FROM dbo.KhoTonKhoChiTiet WHERE KhoTonKhoId = @V_KhoTonKhoId AND TaiSanId = @V_TaiSanId AND DonGia = @V_DonGia) < 0
					BEGIN	
						begin try rollback tran end try begin catch end CATCH
						SELECT -2 AS ID
						RETURN
					END
				END
				
				DELETE @V_KhoPhieuNhapChiTiet_Rollback WHERE RowId= @V_RowId
				SELECT @V_RowId=NULL,@V_TaiSanId=NULL,@V_DonGia=NULL,@V_GiaMua=NULL,@V_GiaBan=NULL,@V_HanDung=NULL,@V_LoSanXuat=NULL,@V_SoLuong=NULL
			END


			-- delete
			DELETE dbo.KhoPhieuNhapChiTiet WHERE KhoPhieuNhapId = @KhoPhieuNhapId
			DELETE dbo.KhoPhieuNhap WHERE KhoPhieuNhapId = @KhoPhieuNhapId			
			
			SELECT @@ROWCOUNT

		END TRY
		BEGIN CATCH
			select @ErrMsg=ERROR_MESSAGE()
			raiserror(@ErrMsg,16,1)
			begin try rollback tran end try begin catch end catch
			return 
		END CATCH
	COMMIT TRAN
END
