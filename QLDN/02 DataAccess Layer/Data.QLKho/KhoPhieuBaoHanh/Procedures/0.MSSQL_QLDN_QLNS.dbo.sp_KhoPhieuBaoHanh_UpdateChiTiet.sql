USE [MSSQL_QLDN_QLNS_DEMO]
GO
/****** Object:  StoredProcedure [dbo].[sp_KhoPhieuBaoHanh_UpdateChiTiet]    Script Date: 07/08/2017 2:58:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*************************************************************  
1. Create Date	: 2017.08.01
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: CẬP NHẬT THÔNG TIN CHI TIẾT
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoPhieuBaoHanh_UpdateChiTiet]
						 @PhieuBaoHanhChiTietId		=	24
						,@ThietBi					=	NULL
						,@TenThietBi				=	N'AAA'
						,@MoTa						=	N''
						,@ThietBiThayThe			=	NULL
						,@TenThietBiThayThe			=	N'BBBB'
						,@TrangThaiThietBi			=	N'PBHCT_BH'
						,@ChiPhi					=	0
						,@ThueVAT					=	0
						,@TienThue					=	NULL
						,@KhuyenMai					=	0

						,@LOGIN_ID					=	68
						,@MESSAGE					=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.08.01 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuBaoHanh_UpdateChiTiet]
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
		UPDATE	KhoPhieuBaoHanhChiTiet	
		SET		 ThietBi				=	@ThietBi	
				,TenThietBi				=	@TenThietBi	
				,MoTa					=	@MoTa	
				,ThietBiThayThe			=	@ThietBiThayThe		
				,TenThietBiThayThe		=	@TenThietBiThayThe
				,TrangThaiThietBi		=	@TrangThaiThietBi
				,ChiPhi					=	@ChiPhi
				,ThueVAT				=	@ThueVAT
				,TienThue				=	@TienThue
				,KhuyenMai				=	@KhuyenMai
		WHERE	PhieuBaoHanhChiTietId	=	@PhieuBaoHanhChiTietId
----------
	IF @V_HAS_ERROR = 0
		SELECT * FROM KhoPhieuBaoHanhChiTiet WHERE PhieuBaoHanhChiTietId = @PhieuBaoHanhChiTietId
	ELSE
		SELECT * FROM KhoPhieuBaoHanhChiTiet WHERE PhieuBaoHanhChiTietId = 0
	RETURN
--------------------------------------------------
END