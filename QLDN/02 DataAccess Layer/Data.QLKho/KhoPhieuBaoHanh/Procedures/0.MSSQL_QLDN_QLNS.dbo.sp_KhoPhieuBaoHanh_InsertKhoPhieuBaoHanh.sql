/*************************************************************  
1. Create Date	: 2017.07.28
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÊM THÔNG TIN PHIẾU BẢO HÀNH
4. Function		: QLDNKHO/KHOPHIEUBAOHANH
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoPhieuBaoHanh_InsertKhoPhieuBaoHanh]
						 @PhieuBaoHanhId		=	NULL
						,@SeriesNo				=	NULL
						,@SoPhieu				=	'ABC'
						,@TenKhachHang			=	'ABC'
						,@DienThoai				=	'123'
						,@TenThietBi			=	'ABC'
						,@HangSanXuat			=	NULL
						,@NgayHen				=	'2017-07-15'
						,@ChuanDoan				=	NULL
						,@YeuCauKhachHang		=	NULL
						,@PhuKienKemTheo		=	NULL
						,@TrangThaiTiepNhan		=	'PBH_TN'
						,@SanPhamCty			=	'Y'
						,@NguoiTao				=	NULL

						,@LOGIN_ID				=	68
						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.07.28 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuBaoHanh_InsertKhoPhieuBaoHanh]
         @PhieuBaoHanhId			INT				=	NULL
		,@SeriesNo					NVARCHAR(MAX)	=	NULL
		,@TenKhachHang				NVARCHAR(MAX)	=	NULL
		,@SoPhieu					NVARCHAR(MAX)	=	NULL
		,@DienThoai					NVARCHAR(MAX)	=	NULL
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
	SET @MESSAGE			=	''

	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '')
	IF(@LOGIN_ID = '')
		SET @LOGIN_ID = 0
----------
	SET @NgayTao	= ISNULL(@NgayTao, GETDATE())
	SET @XoaYN		= ISNULL(@XoaYN, 'N')
	SET @CtrVersion = ISNULL(@CtrVersion, 1)
----------
	INSERT KhoPhieuBaoHanh	(	SeriesNo	,TenKhachHang	,DienThoai	,SoPhieu	,TenThietBi		,HangSanXuat	,NgayHen	,ChuanDoan	,YeuCauKhachHang	,PhuKienKemTheo		,TrangThaiTiepNhan	,SanPhamCty		,XoaYN	,NguoiTao	,NgayTao	,CtrVersion		)
	VALUES					(	@SeriesNo	,@TenKhachHang	,@DienThoai	,@SoPhieu	,@TenThietBi	,@HangSanXuat	,@NgayHen	,@ChuanDoan	,@YeuCauKhachHang	,@PhuKienKemTheo	,@TrangThaiTiepNhan	,@SanPhamCty	,@XoaYN	,@LOGIN_ID	,@NgayTao	,@CtrVersion	)
----------
	SELECT * FROM KhoPhieuBaoHanh WHERE PhieuBaoHanhId = @@IDENTITY
--------------------------------------------------
END