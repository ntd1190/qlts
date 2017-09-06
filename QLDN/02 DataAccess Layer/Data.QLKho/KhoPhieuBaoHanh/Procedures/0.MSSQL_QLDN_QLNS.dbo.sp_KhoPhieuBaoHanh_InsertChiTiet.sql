/*************************************************************  
1. Create Date	: 2017.07.31
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÊM THÔNG TIN CHI TIẾT
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoPhieuBaoHanh_InsertChiTiet]
						 @PhieuBaoHanhChiTietId		=	NULL
						,@PhieuBaoHanhId			=	2
						,@ThietBi					=	NULL
						,@TenThietBi				=	N'AAA'
						,@MoTa						=	N''
						,@ThietBiThayThe			=	NULL
						,@TenThietBiThayThe			=	N'BBBB'
						,@TrangThaiThietBi			=	N'PBHCT_BH'
						,@ChiPhi					=	NULL
						,@ThueVAT					=	NULL
						,@TienThue					=	NULL
						,@KhuyenMai					=	NULL
						,@NgayTao					=	N''

						,@LOGIN_ID					=	68
						,@MESSAGE					=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.07.31 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuBaoHanh_InsertChiTiet]
         @PhieuBaoHanhChiTietId		INT				=	NULL
        ,@PhieuBaoHanhId			INT				=	NULL
        ,@ThietBi					INT				=	NULL
        ,@TenThietBi				NVARCHAR(MAX)	=	NULL
        ,@MoTa						NVARCHAR(MAX)	=	NULL
        ,@ThietBiThayThe			INT				=	NULL
        ,@TenThietBiThayThe			NVARCHAR(MAX)	=	NULL
        ,@TrangThaiThietBi			NVARCHAR(MAX)	=	NULL
		,@ChiPhi					DECIMAL(24,6)	=	NULL
        ,@ThueVAT					DECIMAL(24,6)	=	NULL
        ,@TienThue					DECIMAL(24,6)	=	NULL
		,@KhuyenMai					DECIMAL(24,6)	=	NULL
        ,@NgayTao					DATETIME		=	NULL

		,@LOGIN_ID					INT				=	NULL
		,@MESSAGE					NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
--------------------------------------------------
DECLARE	@V_HAS_ERROR				BIT				=	0
----------
	SET @MESSAGE		= ''

	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '')
	IF(@LOGIN_ID = '')
		SET @LOGIN_ID = 0

	SET @NgayTao = ISNULL(@NgayTao, GETDATE())
----------
	-- LẤY PHIẾU BẢO HÀNH ID
	SELECT	@PhieuBaoHanhId = PhieuBaoHanhId 
	FROM	KhoPhieuBaoHanhChiTiet 
	WHERE	PhieuBaoHanhChiTietId = @PhieuBaoHanhChiTietId
----------
	-- KIỂM TRA UPDATE XÓA
	IF @V_HAS_ERROR = 0 AND EXISTS (SELECT PhieuBaoHanhId FROM KhoPhieuBaoHanh WHERE PhieuBaoHanhId = @PhieuBaoHanhId AND XoaYN = 'Y')
	BEGIN
		SET @V_HAS_ERROR = 1
		SET @MESSAGE = N'DELETE|1|Phiếu bảo hành đã bị xóa'
	END
	-- KIỂM TRA TRẠNG THÁI
	IF @V_HAS_ERROR = 0 AND EXISTS (SELECT PhieuBaoHanhId FROM KhoPhieuBaoHanh WHERE PhieuBaoHanhId = @PhieuBaoHanhId AND TrangThaiTiepNhan = 'PBH_KT')
	BEGIN
		SET @V_HAS_ERROR = 1
		SET @MESSAGE = N'TRANG_THAI|1|Phiếu bảo hành đã kết thúc'
	END
----------
	IF @V_HAS_ERROR = 0
		INSERT KhoPhieuBaoHanhChiTiet	(	PhieuBaoHanhId		,ThietBi	,TenThietBi		,MoTa	,ThietBiThayThe		,TenThietBiThayThe	,TrangThaiThietBi	,ChiPhi		,ThueVAT	,TienThue	,KhuyenMai	,NgayTao	)
		VALUES							(	@PhieuBaoHanhId		,@ThietBi	,@TenThietBi	,@MoTa	,@ThietBiThayThe	,@TenThietBiThayThe	,@TrangThaiThietBi	,@ChiPhi	,@ThueVAT	,@TienThue	,@KhuyenMai	,@NgayTao	)
----------
	IF @V_HAS_ERROR = 0
		SELECT * FROM KhoPhieuBaoHanhChiTiet WHERE PhieuBaoHanhChiTietId = @@IDENTITY
	ELSE
		SELECT * FROM KhoPhieuBaoHanhChiTiet WHERE PhieuBaoHanhChiTietId = 0
	RETURN
--------------------------------------------------
END