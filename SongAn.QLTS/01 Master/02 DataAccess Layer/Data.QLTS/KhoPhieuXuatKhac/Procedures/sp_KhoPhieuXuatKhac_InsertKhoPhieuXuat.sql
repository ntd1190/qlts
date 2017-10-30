/**************************************************
1. Create Date	: 2017.10.24
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @ChiTiet KhoPhieuXuatChiTietTableType
					INSERT INTO @ChiTiet	 (KhoPhieuXuatChiTietId	,KhoPhieuXuatId	,TaiSanId	,SoLuong	,DonGia	,GiaMua	,GiaBan	,NguonNganSachId	,NhaCungCapId	,HanDung	,LoSanXuat	)
								VALUES		 (0						,0				,1061		,5			,20000	,10		,20		,1					,1				,N'1'		,N'1'		)

					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoPhieuXuatKhac_InsertKhoPhieuXuat]
						@KhoPhieuXuatId			=	NULL
						,@SoPhieu				=	N'test003'
						,@NgayXuat				=	'2017-09-24 00:00:00'
						,@Loai					=	N'CK'
						,@KhoXuatId				=	4
						,@KhoNhanId				=	1
						,@NguoiNhanHang			=	N'21212'
						,@LyDo					=	NULL
						,@CoSoId				=	0
						,@NguoiTao				=	0
						,@NgayTao				=	'2017-10-24 04:18:30.687'
						,@CtrVersion			=	0

						,@ChiTiet				=	@ChiTiet

						,@COSO_ID				=	1
						,@NHANVIEN_ID			=	6

						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.10.24 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuXuatKhac_InsertKhoPhieuXuat]
	@KhoPhieuXuatId			INT				=	NULL
	,@SoPhieu				VARCHAR(MAX)	=	NULL
	,@NgayXuat				DATETIME		=	NULL
	,@Loai					VARCHAR(MAX)	=	NULL
	,@KhoXuatId				INT				=	NULL
	,@KhoNhanId				INT				=	NULL
	,@NguoiNhanHang			NVARCHAR(MAX)	=	NULL
	,@LyDo					NVARCHAR(MAX)	=	NULL
	,@CoSoId				INT				=	NULL
	,@NguoiTao				INT				=	NULL
	,@NgayTao				DATETIME		=	NULL
	,@CtrVersion			INT				=	NULL

	,@ChiTiet				KhoPhieuXuatChiTietTableType		READONLY

	,@COSO_ID				INT				=	NULL
	,@NHANVIEN_ID			INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
--------------------------------------------------
-- BIẾN NỘI BỘ
DECLARE  @V_TRANS_NAME		NVARCHAR(MAX)	=	N'KPX_INSERT'
	,@V_ThangNam varchar(4)
-- INPUT DEFAULT
SET @NHANVIEN_ID	= ISNULL(@NHANVIEN_ID,0)
SET @COSO_ID	= ISNULL(@COSO_ID,0)
SET @MESSAGE	= ISNULL(@MESSAGE,'')

SET @NgayTao	= ISNULL(@NgayTao, GETDATE())

SET @NguoiTao	= ISNULL(@NguoiTao, 0)
IF @NguoiTao = 0
	SET @NguoiTao	= @NHANVIEN_ID

SET @CoSoId	= ISNULL(@CoSoId, 0)
IF @CoSoId = 0
	SET @CoSoId	= @COSO_ID

set @V_ThangNam = format(@NgayXuat,'MMyy')

BEGIN TRY
	--SET @MESSAGE	=	N'MA_TAI_SAN|1|MÃ NÀY ĐÃ TỒN TẠI';
	--THROW 51000, @MESSAGE, 1;

	-- kiểm tra khóa số liệu kho xuất
	declare @V_KX_KhoaSoLieu bit
		,@V_KX_KhoTonKhoId int

	select @V_KX_KhoaSoLieu = TrangThai
		,@V_KX_KhoTonKhoId = KhoTonKhoId
	from KhoTonKho 
	where KhoTaiSanId = @KhoXuatId
		and CoSoId = @CoSoId
		and ThangNam = @V_ThangNam

	IF @V_KX_KhoaSoLieu = 1
	BEGIN
		SET @MESSAGE	=	N'KHOASOLIEU|1|Đã khóa số liệu kho xuất. Không thể thêm phiếu xuất';
		THROW 51000, @MESSAGE, 1;
	END

	-- kiểm tra số phiếu
	IF EXISTS (SELECT 1 FROM KhoPhieuXuat WHERE SoPhieu = @SoPhieu)
	BEGIN
		SET @MESSAGE	=	N'SOPHIEU|1|Số phiếu đã tồn tại';
		THROW 51000, @MESSAGE, 1;
	END

	-- bảng tạm lưu chi tiết
	DECLARE @V_KhoPhieuXuatChiTiet TABLE
	(
		RowId int IDENTITY(1, 1),
		KhoPhieuXuatId int NULL,
		TaiSanId int NULL,
		SoLuong numeric(18, 4) NULL,
		DonGia numeric(18, 4) NULL,
		NguonNganSachId int NULL,
		NhaCungCapId int NULL,
		HanDung varchar(10) NULL,
		LoSanXuat varchar(10) NULL
	)
	declare	 @V_RowId int
			,@V_TaiSanId int
			,@V_DonGia numeric (18, 4)
			,@V_SoLuong numeric (18, 4)
			,@V_TonCuoi numeric (18, 4)

	BEGIN TRANSACTION @V_TRANS_NAME

	-- thêm thông tin KhoPhieuXuat
	INSERT	KhoPhieuXuat
			(
			 SoPhieu					,NgayXuat				,Loai
			,KhoXuatId					,KhoNhanId				,NguoiNhanHang
			,LyDo						,CoSoId					,NguoiTao
			,NgayTao					,CtrVersion
			)
	VALUES	(
			 @SoPhieu					,@NgayXuat				,@Loai
			,@KhoXuatId					,NULL					,@NguoiNhanHang
			,@LyDo						,@CoSoId				,@NguoiTao
			,@NgayTao					,@CtrVersion
			)

	SET @KhoPhieuXuatId = @@IDENTITY

	-- thêm thông tin KhoPhieuXuatChiTiet
	INSERT INTO	KhoPhieuXuatChiTiet
			(
				 KhoPhieuXuatId		,TaiSanId		,SoLuong
				,DonGia				,GiaMua			,GiaBan
				,NguonNganSachId	,NhaCungCapId	,HanDung
				,LoSanXuat
			)
	SELECT		 @KhoPhieuXuatId	,TaiSanId		,SoLuong
				,DonGia				,GiaMua			,GiaBan
				,NguonNganSachId	,NhaCungCapId	,HanDung
				,LoSanXuat
	FROM		@ChiTiet

	-- update tồn kho xuất
	SELECT @V_RowId=NULL,@V_TaiSanId=NULL,@V_DonGia=NULL,@V_SoLuong=NULL,@V_TonCuoi=null
	
	DELETE @V_KhoPhieuXuatChiTiet
	INSERT @V_KhoPhieuXuatChiTiet
			(	KhoPhieuXuatId		,TaiSanId 		,SoLuong
				,DonGia				,HanDung		,LoSanXuat
				,NguonNganSachId	,NhaCungCapId	
			)
	SELECT		KhoPhieuXuatId		,TaiSanId		,SoLuong
				,DonGia				,HanDung		,LoSanXuat
				,NguonNganSachId	,NhaCungCapId	
	FROM @ChiTiet

	if @V_KX_KhoTonKhoId is null
	begin
		insert KhoTonKho	(KhoTaiSanId	,CoSoId		,ThangNam		,TrangThai	,NguoiTao		,NgayTao	,CtrVersion	)
		select				@KhoNhanId		,@CoSoId	,@V_ThangNam	,0			,@NHANVIEN_ID	,@NgayTao	,1
	
		SET @V_KX_KhoTonKhoId = @@IDENTITY
		
		insert dbo.KhoTonKhoChiTiet
			(	 KhoTonKhoId		,TaiSanId	,DonGia
				,GiaMua				,GiaBan		,TonDau
				,SLNhap				,SLXuat		,NguonNganSachId
				,NhaCungCapId		,HanDung	,LoSanXuat
			)
		select	@V_KX_KhoTonKhoId	,TaiSanId	,DonGia
				,0					,0			,0
				,SUM(SoLuong)		,0			,NguonNganSachId
				,NhaCungCapId		,''			,''
				from @ChiTiet
				group by TaiSanId,DonGia,NguonNganSachId,NhaCungCapId
	end
	else
	begin
		WHILE EXISTS(SELECT 1 FROM @V_KhoPhieuXuatChiTiet)
		BEGIN
			SELECT TOP 1 @V_RowId = RowId, @V_TaiSanId = TaiSanId, @V_SoLuong=SoLuong, @V_DonGia = DonGia
			FROM @V_KhoPhieuXuatChiTiet
			
			SELECT TOP 1 @V_TonCuoi = TonDau + SLNhap - SLXuat FROM KhoTonKhoChiTiet WHERE KhoTonKhoId = @V_KX_KhoTonKhoId AND TaiSanId = @V_TaiSanId AND DonGia = @V_DonGia

			if @V_TonCuoi is not null and @V_TonCuoi < @V_SoLuong
			begin
				SET @MESSAGE	=	N'SOLUONGXUAT|1|Số lượng xuất lớn hơn số lượng tồn';
				THROW 51000, @MESSAGE, 1;
			end

			IF @V_TonCuoi is not null
			BEGIN
				UPDATE dbo.KhoTonKhoChiTiet SET SLXuat = SLXuat + @V_SoLuong WHERE KhoTonKhoId = @V_KX_KhoTonKhoId AND TaiSanId = @V_TaiSanId AND DonGia = @V_DonGia
			END
			ELSE
            BEGIN
				INSERT dbo.KhoTonKhoChiTiet
					(	 KhoTonKhoId		,TaiSanId		,DonGia
						,GiaMua				,GiaBan			,TonDau
						,SLNhap				,SLXuat			,NguonNganSachId
						,NhaCungCapId		,HanDung		,LoSanXuat
					)
				SELECT	@V_KX_KhoTonKhoId	,TaiSanId		,DonGia
						,0					,0				,0
						,0					,SoLuong		,NguonNganSachId
						,NhaCungCapId		,NULL			,NULL
				from @V_KhoPhieuXuatChiTiet
				where RowId = @V_RowId
			END

			DELETE @V_KhoPhieuXuatChiTiet WHERE RowId= @V_RowId
			SELECT @V_RowId=NULL,@V_TaiSanId=NULL,@V_DonGia=NULL,@V_SoLuong=NULL,@V_TonCuoi=NULL
		END
	end

	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	DECLARE  @ErrorMessage	NVARCHAR(MAX)	=	ERROR_MESSAGE()
			,@ErrorSeverity INT				=	ERROR_SEVERITY()
			,@ErrorState	INT				=	ERROR_STATE()

	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME

	IF @MESSAGE = ''
		RAISERROR (@ErrorMessage,@ErrorSeverity,@ErrorState);
END CATCH
	SELECT * FROM KhoPhieuXuat WHERE KhoPhieuXuatId = @KhoPhieuXuatId
--------------------------------------------------
	SET NOCOUNT OFF;
END
