/*************************************************************  
1. Create Date	: 2017.07.28
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: UPDATE THÔNG TIN PHIẾU BẢO HÀNH
4. Function		: QLDNKHO/KHOPHIEUBAOHANH
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoPhieuBaoHanh_UpdateKhoPhieuBaoHanh]
						 @PhieuBaoHanhId		=	9
						,@SeriesNo				=	'TTTTT'
						,@TenKhachHang			=	'TT'
						,@DienThoai				=	'99999'
						,@SoPhieu				=	'99999'
						,@TenThietBi			=	'TTT'
						,@HangSanXuat			=	NULL
						,@NgayHen				=	'2017-07-15'
						,@ChuanDoan				=	NULL
						,@YeuCauKhachHang		=	NULL
						,@PhuKienKemTheo		=	NULL
						,@TrangThaiTiepNhan		=	'PBH_KT'
						,@SanPhamCty			=	'Y'

						,@LOGIN_ID				=	68
						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.07.28 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuBaoHanh_UpdateKhoPhieuBaoHanh]
         @PhieuBaoHanhId			INT				=	NULL
		,@SeriesNo					NVARCHAR(MAX)	=	NULL
		,@TenKhachHang				NVARCHAR(MAX)	=	NULL
		,@DienThoai					NVARCHAR(MAX)	=	NULL
		,@SoPhieu					NVARCHAR(MAX)	=	NULL
		,@TenThietBi				NVARCHAR(MAX)	=	NULL
		,@HangSanXuat				NVARCHAR(MAX)	=	NULL
		,@NgayHen					DATETIME		=	NULL
		,@ChuanDoan					NVARCHAR(MAX)	=	NULL
		,@YeuCauKhachHang			NVARCHAR(MAX)	=	NULL
		,@PhuKienKemTheo			NVARCHAR(MAX)	=	NULL
		,@TrangThaiTiepNhan			NVARCHAR(MAX)	=	NULL
		,@SanPhamCty				NVARCHAR(MAX)	=	NULL
		,@NguoiTao					INT				=	NULL
		,@NgayTao					DATETIME		=	NULL
		,@XoaYN						NVARCHAR(MAX)	=	NULL
		,@CtrVersion				INT				=	NULL

		,@LOGIN_ID					NVARCHAR(MAX)	=	NULL
		,@MESSAGE					NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
--------------------------------------------------
	DECLARE		@CTR_VERSION			INT				=	0
	DECLARE		@TRANGTHAI_TIEPNHAN		NVARCHAR(MAX)	=	0
	DECLARE		@HAS_ERROR				BIT				=	0
----------
	SET @MESSAGE			=	''
	SET @CtrVersion	= ISNULL(@CtrVersion, -1)
	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '')
	IF(@LOGIN_ID = '')
		SET @LOGIN_ID = 0
----------

	-- KIỂM TRA
	SELECT	 @CTR_VERSION = CtrVersion
			,@TRANGTHAI_TIEPNHAN = TrangThaiTiepNhan
	FROM KhoPhieuBaoHanh WHERE PhieuBaoHanhId = @PhieuBaoHanhId

	-- KIỂM TRA CtrVersion
	IF @HAS_ERROR = 0 AND @CtrVersion <> @CTR_VERSION
	BEGIN
		SET @MESSAGE = N'CTR_VERSION|1|Phiếu này đã có người dùng khác thay đổi thông tin'
		SET @HAS_ERROR = 1
	END

	-- KIỂM TRA TrangThaiTiepNhan
	IF @HAS_ERROR = 0 AND @TRANGTHAI_TIEPNHAN = 'PBH_KT'
	BEGIN
		SET @MESSAGE = N'TRANG_THAI|1|Phiếu bảo hành đã kết thúc'
		SET @HAS_ERROR = 1
	END
----------
	IF @HAS_ERROR = 0
	BEGIN
		UPDATE	KhoPhieuBaoHanh	
		SET		
				 SeriesNo					=	@SeriesNo
				,TenKhachHang				=	@TenKhachHang
				,DienThoai					=	@DienThoai
				,SoPhieu					=	@SoPhieu
				,TenThietBi					=	@TenThietBi
				,HangSanXuat				=	@HangSanXuat
				,NgayHen					=	@NgayHen
				,ChuanDoan					=	@ChuanDoan
				,YeuCauKhachHang			=	@YeuCauKhachHang
				,PhuKienKemTheo				=	@PhuKienKemTheo
				,TrangThaiTiepNhan			=	@TrangThaiTiepNhan
				,SanPhamCty					=	@SanPhamCty
				,CtrVersion					=	ISNULL(CtrVersion,0) + 1
		WHERE	PhieuBaoHanhId = @PhieuBaoHanhId
	END
----------
	IF @HAS_ERROR = 0
		SELECT * FROM KhoPhieuBaoHanh WHERE PhieuBaoHanhId = @PhieuBaoHanhId
	ELSE
		SELECT * FROM KhoPhieuBaoHanh WHERE PhieuBaoHanhId = 0		
--------------------------------------------------
END