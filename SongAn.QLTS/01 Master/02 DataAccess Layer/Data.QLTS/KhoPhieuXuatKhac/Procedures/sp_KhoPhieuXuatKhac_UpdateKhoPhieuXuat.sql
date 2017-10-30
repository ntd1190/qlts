/**************************************************
1. Create Date	: 2017.10.25
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @ChiTiet KhoPhieuXuatChiTietTableType
					INSERT INTO @ChiTiet	 (KhoPhieuXuatChiTietId	,KhoPhieuXuatId	,TaiSanId	,SoLuong	,DonGia	,GiaMua	,GiaBan	,NguonNganSachId	,NhaCungCapId	,HangDung	,LoSanXuat	)
								VALUES		 (0						,0				,1061		,1			,20000	,10		,20		,1					,1				,N'1'		,N'1'		)

					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoPhieuXuatKhac_UpdateKhoPhieuXuat]
						@KhoPhieuXuatId			=	NULL
						,@SoPhieu				=	N'121212'
						,@NgayXuat				=	'2017-10-24 00:00:00'
						,@Loai					=	N'CK'
						,@KhoXuatId				=	1
						,@KhoNhanId				=	4
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
				  2017.10.25 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuXuatKhac_UpdateKhoPhieuXuat]
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
DECLARE  @V_TRANS_NAME		NVARCHAR(MAX)	=	N'KPX_UPDATE'
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

set @KhoNhanId = null

BEGIN TRY
	declare @V_KhoaSoLieu bit
		,@V_KX_KhoTonKhoId int
		,@V_KN_KhoTonKhoId int

	-- kiểm tra khóa số liệu kho xuất
	set @V_KhoaSoLieu = null

	select @V_KhoaSoLieu = TrangThai
		,@V_KX_KhoTonKhoId = KhoTonKhoId
	from KhoTonKho 
	where KhoTaiSanId = @KhoXuatId
		and CoSoId = @CoSoId
		and ThangNam = @V_ThangNam

	IF @V_KhoaSoLieu = 1
	BEGIN
		SET @MESSAGE	=	N'KHOASOLIEU|1|Đã khóa số liệu kho xuất. Không thể thay đổi thông tin phiếu xuất';
		THROW 51000, @MESSAGE, 1;
	END

	-- kiểm tra số phiếu
	IF EXISTS (SELECT 1 FROM KhoPhieuXuat WHERE SoPhieu = @SoPhieu AND KhoPhieuXuatId <> @KhoPhieuXuatId)
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
		KhoNhanId int NULL,
		KhoXuatId int NULL
	)
	declare	 @V_RowId int
		,@V_TaiSanId int
		,@V_DonGia numeric (18, 4)
		,@V_SoLuong numeric (18, 4)
		,@V_TonCuoi numeric (18, 4)

	BEGIN TRANSACTION @V_TRANS_NAME

	-- rollback tồn kho xuất chi tiết
	DELETE @V_KhoPhieuXuatChiTiet
	INSERT @V_KhoPhieuXuatChiTiet
			(	KhoPhieuXuatId			,TaiSanId 				,SoLuong
				,DonGia					,NguonNganSachId		,NhaCungCapId
				,KhoNhanId				,KhoXuatId
			)
	SELECT		kpxct.KhoPhieuXuatId	,kpxct.TaiSanId			,kpxct.SoLuong
				,kpxct.DonGia			,kpxct.NguonNganSachId	,kpxct.NhaCungCapId
				,kpx.KhoNhanId			,kpx.KhoXuatId
	FROM KhoPhieuXuatChiTiet kpxct
		left join KhoPhieuXuat kpx on kpxct.KhoPhieuXuatId = kpx.KhoPhieuXuatId
	where kpx.KhoPhieuXuatId = @KhoPhieuXuatId

	SELECT @V_RowId=NULL,@V_TaiSanId=NULL,@V_DonGia=NULL,@V_SoLuong=NULL,@V_TonCuoi=NULL

	while EXISTS(SELECT 1 FROM @V_KhoPhieuXuatChiTiet)
	begin
		SELECT TOP 1 @V_RowId = RowId, @V_TaiSanId = TaiSanId, @V_SoLuong=SoLuong, @V_DonGia = DonGia
		FROM @V_KhoPhieuXuatChiTiet

		SELECT TOP 1 @V_TonCuoi = TonDau + SLNhap - SLXuat FROM KhoTonKhoChiTiet WHERE KhoTonKhoId = @V_KX_KhoTonKhoId AND TaiSanId = @V_TaiSanId AND DonGia = @V_DonGia
		
		if @V_TonCuoi is not null
		begin
			UPDATE dbo.KhoTonKhoChiTiet 
			SET SLXuat = SLXuat - @V_SoLuong 
			WHERE KhoTonKhoId = @V_KX_KhoTonKhoId AND TaiSanId = @V_TaiSanId AND DonGia = @V_DonGia
		end

		DELETE @V_KhoPhieuXuatChiTiet WHERE RowId = @V_RowId
		SELECT @V_RowId=NULL,@V_TaiSanId=NULL,@V_DonGia=NULL,@V_SoLuong=NULL,@V_TonCuoi=NULL
	end

	-- update phiếu xuất
	UPDATE	KhoPhieuXuat
	SET		 SoPhieu		=	@SoPhieu
			,NgayXuat		=	@NgayXuat
			,Loai			=	@Loai
			,KhoXuatId		=	@KhoXuatId
			,KhoNhanId		=	@KhoNhanId
			,NguoiNhanHang	=	@NguoiNhanHang
			,LyDo			=	@LyDo
			,CoSoId			=	@CoSoId
			,NguoiTao		=	@NguoiTao
			,NgayTao		=	@NgayTao
			,CtrVersion		=	@CtrVersion
	WHERE	KhoPhieuXuatId	=	@KhoPhieuXuatId

	-- update phiếu xuất chi tiết
	DELETE KhoPhieuXuatChiTiet WHERE KhoPhieuXuatId = @KhoPhieuXuatId

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

	-- update tồn kho xuất chi tiết
	DELETE @V_KhoPhieuXuatChiTiet
	INSERT @V_KhoPhieuXuatChiTiet
			(	KhoPhieuXuatId			,TaiSanId 				,SoLuong
				,DonGia					,NguonNganSachId		,NhaCungCapId
				,KhoNhanId				,KhoXuatId
			)
	SELECT		kpxct.KhoPhieuXuatId	,kpxct.TaiSanId			,kpxct.SoLuong
				,kpxct.DonGia			,kpxct.NguonNganSachId	,kpxct.NhaCungCapId
				,kpx.KhoNhanId			,kpx.KhoXuatId
	FROM KhoPhieuXuatChiTiet kpxct
		left join KhoPhieuXuat kpx on kpxct.KhoPhieuXuatId = kpx.KhoPhieuXuatId
	where kpx.KhoPhieuXuatId = @KhoPhieuXuatId

	SELECT @V_RowId=NULL,@V_TaiSanId=NULL,@V_DonGia=NULL,@V_SoLuong=NULL,@V_TonCuoi=NULL

	while EXISTS(SELECT 1 FROM @V_KhoPhieuXuatChiTiet)
	begin
		SELECT TOP 1 @V_RowId = RowId, @V_TaiSanId = TaiSanId, @V_SoLuong=SoLuong, @V_DonGia = DonGia
		FROM @V_KhoPhieuXuatChiTiet

		SELECT TOP 1 @V_TonCuoi = TonDau + SLNhap - SLXuat FROM KhoTonKhoChiTiet WHERE KhoTonKhoId = @V_KX_KhoTonKhoId AND TaiSanId = @V_TaiSanId AND DonGia = @V_DonGia
		
		if @V_TonCuoi is not null and @V_TonCuoi < @V_SoLuong
		begin
			SET @MESSAGE	=	N'SOLUONGXUAT|1|Số lượng xuất lớn hơn số lượng tồn';
			THROW 51000, @MESSAGE, 1;
		end

		if @V_TonCuoi is not null
		begin
			UPDATE dbo.KhoTonKhoChiTiet 
			SET SLXuat = SLXuat + @V_SoLuong
			WHERE KhoTonKhoId = @V_KX_KhoTonKhoId AND TaiSanId = @V_TaiSanId AND DonGia = @V_DonGia
		end
		else
		begin
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
		end

		DELETE @V_KhoPhieuXuatChiTiet WHERE RowId = @V_RowId
		SELECT @V_RowId=NULL,@V_TaiSanId=NULL,@V_DonGia=NULL,@V_SoLuong=NULL,@V_TonCuoi=NULL
	end

	COMMIT TRANSACTION @V_TRANS_NAME
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION @V_TRANS_NAME
	
	DECLARE  @ErrorMessage	NVARCHAR(MAX)	=	ERROR_MESSAGE()
			,@ErrorSeverity INT				=	ERROR_SEVERITY()
			,@ErrorState	INT				=	ERROR_STATE()

	IF @MESSAGE = ''
		RAISERROR (@ErrorMessage,@ErrorSeverity,@ErrorState);
END CATCH
	SELECT * FROM KhoPhieuXuat WHERE KhoPhieuXuatId = @KhoPhieuXuatId
--------------------------------------------------
	SET NOCOUNT OFF;
END
