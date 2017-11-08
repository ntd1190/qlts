USE [QLTS]
GO

-- drop proc [sp_KhoPhieuNhap_InsertKhoPhieuNhap]
ALTER proc [dbo].[sp_KhoPhieuNhap_InsertKhoPhieuNhap]
	@KhoTaiSanId int,
	@NguonNganSachId int,
	@NhaCungCapId int,
	@NgayNhap datetime,
	@SoPhieu varchar (50),
	@Seri varchar (50),
	@SoHoaDon varchar (50),
	@NgayHD datetime,
	@BBKiem varchar (50),
	@ChietKhau int ,
	@NguoiGiao nvarchar (100),
	@Loai varchar (10),
	@TaiKhoanNo varchar (20),
	@TaiKhoanCo varchar (20),
	@NoiDung nvarchar (500),
	@CoSoId int ,
	@NguoiTao int ,
    @MyTable_KhoPhieuNhapChiTiet MyTableType_KhoPhieuNhapChiTiet READONLY
as
BEGIN
	
	Declare @ErrMsg nvarchar(max), @V_KhoPhieuNhapId INT, @V_ChotKho INT, @V_KhoTonKhoId INT

	DECLARE @V_TaiSanId INT, @V_SoLuong numeric (18, 4), @V_DonGia numeric (18, 4), @V_GiaMua numeric (18, 4),
			@V_GiaBan numeric (18, 4), @V_HanDung varchar (10), @V_LoSanXuat varchar (10), @V_RowId INT

	DECLARE @V_KhoPhieuNhapChiTiet TABLE
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
	------------------------------------------------------------------------------------------------------------------------

	SET @V_KhoPhieuNhapId = 0

	SELECT @V_ChotKho = TrangThai FROM dbo.KhoTonKho WHERE KhoTaiSanId = @KhoTaiSanId AND CoSoId = @CoSoId AND ThangNam = (FORMAT(@NgayNhap,'MMyy'))

	IF (@V_ChotKho = 1)
	BEGIN
		SELECT -1 AS KhoPhieuNhapIdI RETURN
	END

	INSERT @V_KhoPhieuNhapChiTiet
	        ( KhoPhieuNhapId ,			TaiSanId ,				SoLuong ,
	          DonGia ,					GiaMua ,				GiaBan ,
	          VAT ,						HanDung ,				LoSanXuat
	        )
	SELECT	  KhoPhieuNhapId ,			TaiSanId ,				SoLuong ,
	          DonGia ,					GiaMua ,				GiaBan ,
	          VAT ,						HanDung ,				LoSanXuat
	FROM @MyTable_KhoPhieuNhapChiTiet
	------------------------------------------------------------------------------------------------------------------------
	BEGIN TRAN		
		BEGIN TRY
				
			-- insert header
			INSERT dbo.KhoPhieuNhap
			        ( KhoTaiSanId ,			NguonNganSachId ,			NhaCungCapId ,
			          NgayNhap ,			SoPhieu ,					Seri ,
			          SoHoaDon ,			NgayHD ,					BBKiem ,
			          ChietKhau ,			NguoiGiao ,					Loai ,
			          TaiKhoanNo ,			TaiKhoanCo ,				NoiDung ,
			          CoSoId ,				NguoiTao ,					NgayTao ,
			          CtrVersion
			        )
			SELECT	@KhoTaiSanId ,			@NguonNganSachId ,			@NhaCungCapId ,
			        @NgayNhap ,				@SoPhieu ,					@Seri ,
			        @SoHoaDon ,				@NgayHD ,					@BBKiem ,
			        @ChietKhau ,			@NguoiGiao ,				@Loai ,
			        @TaiKhoanNo ,			@TaiKhoanCo ,				@NoiDung ,
			        @CoSoId ,				@NguoiTao ,					GETDATE() ,
			        1
			

			SELECT @V_KhoPhieuNhapId = SCOPE_IDENTITY()
			SELECT @V_KhoPhieuNhapId AS KhoPhieuNhapIdI

			--- insert line
			INSERT dbo.KhoPhieuNhapChiTiet
			        ( KhoPhieuNhapId ,			TaiSanId ,			SoLuong ,
			          DonGia ,					GiaMua ,			GiaBan ,
			          VAT ,						HanDung ,			LoSanXuat
			        )
			SELECT @V_KhoPhieuNhapId ,			TaiSanId ,			SoLuong ,
					DonGia ,					GiaMua ,			GiaBan ,
					VAT ,						HanDung ,			LoSanXuat
			FROM @MyTable_KhoPhieuNhapChiTiet

			--- kho ton kho
			SELECT @V_KhoTonKhoId = KhoTonKhoId FROM dbo.KhoTonKho WHERE KhoTaiSanId = @KhoTaiSanId AND CoSoId = @CoSoId AND ThangNam = FORMAT(@NgayNhap,'MMyy')

			IF (@V_KhoTonKhoId IS NOT NULL AND @V_KhoTonKhoId > 0)
			BEGIN
				WHILE EXISTS(SELECT 1 FROM @V_KhoPhieuNhapChiTiet)
				BEGIN
					SELECT TOP 1 @V_RowId = RowId, @V_TaiSanId = TaiSanId, @V_SoLuong=SoLuong, @V_DonGia = DonGia, @V_GiaMua = GiaMua, @V_GiaBan = GiaBan, @V_HanDung = HanDung, @V_LoSanXuat = LoSanXuat FROM @V_KhoPhieuNhapChiTiet
					IF EXISTS(SELECT 1 FROM dbo.KhoTonKhoChiTiet WHERE KhoTonKhoId = @V_KhoTonKhoId AND TaiSanId = @V_TaiSanId AND DonGia = @V_DonGia)
					BEGIN
						UPDATE dbo.KhoTonKhoChiTiet SET SLNhap = SLNhap + @V_SoLuong WHERE KhoTonKhoId = @V_KhoTonKhoId AND TaiSanId = @V_TaiSanId AND DonGia = @V_DonGia
					END
					ELSE
                    BEGIN
						INSERT dbo.KhoTonKhoChiTiet
						        ( KhoTonKhoId ,		TaiSanId ,		DonGia ,
						          GiaMua ,			GiaBan ,		TonDau ,
						          SLNhap ,			SLXuat ,		NguonNganSachId ,
						          NhaCungCapId ,	HanDung ,		LoSanXuat
						        )
						SELECT	@V_KhoTonKhoId,		@V_TaiSanId,	@V_DonGia,
								0,					0,				0,
								@V_SoLuong,			0,				@NguonNganSachId,
								@NhaCungCapId,		NULL,			NULL
						
					END

					DELETE @V_KhoPhieuNhapChiTiet WHERE RowId= @V_RowId
					SELECT @V_RowId=NULL,@V_TaiSanId=NULL,@V_DonGia=NULL,@V_GiaMua=NULL,@V_GiaBan=NULL,@V_HanDung=NULL,@V_LoSanXuat=NULL,@V_SoLuong=NULL
				END
			END
			ELSE
			BEGIN
				INSERT dbo.KhoTonKho
				        ( KhoTaiSanId ,		CoSoId ,		ThangNam ,
				          TrangThai ,		NguoiTao ,		NgayTao ,		CtrVersion
				        )
				SELECT	@KhoTaiSanId,		@CoSoId,		FORMAT(@NgayNhap,'MMyy'),
						0,					@NguoiTao,		GETDATE(),		1

				SELECT @V_KhoTonKhoId = SCOPE_IDENTITY()
				
				INSERT dbo.KhoTonKhoChiTiet
						(	KhoTonKhoId ,		TaiSanId ,		DonGia ,
							GiaMua ,			GiaBan ,		TonDau ,
							SLNhap ,			SLXuat ,		NguonNganSachId ,
							NhaCungCapId ,		HanDung ,		LoSanXuat
						)
				SELECT		@V_KhoTonKhoId ,	TaiSanId ,		DonGia ,
							0 ,					0 ,				0 ,
							SUM(SoLuong) ,		0 ,				@NguonNganSachId ,
							@NhaCungCapId ,		NULL ,			NULL
				FROM @MyTable_KhoPhieuNhapChiTiet
				GROUP BY TaiSanId, DonGia

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
