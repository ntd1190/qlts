USE [MSSQL_QLDN_QLNS_DEMO]
GO
/****** Object:  StoredProcedure [dbo].[sp_KhoPhieuNhap_LuuSoCai]    Script Date: 04/07/2017 2:22:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*************************************************************  
1. Create Date	: 2017.06.22
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: NHẬP THẺ KHO
4. Function		: QLDNKHO/KHOPHIEUNHAP
5. Example		: 
					DECLARE		@MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoPhieuNhap_LuuSoCai]
							  @PHIEU_NHAP_CHI_TIET_ID		=	4
							, @MESSAGE						=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE

6. Precaution	:
7. History		:
				  2017.06.22 (NGUYỄN THANH BÌNH) - Tạo mới
				  2017.06.30 (NGUYỄN THANH BÌNH) - đổi trạng thái thành số phiếu
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuNhap_LuuSoCai]
		  @PHIEU_NHAP_CHI_TIET_ID	INT				= null
	    , @MESSAGE					NVARCHAR(MAX)	OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------

DECLARE		@V_KHO_HANG_ID				INT					=	0
DECLARE		@V_SO_PHIEU					NVARCHAR(MAX)		=	N''
DECLARE		@V_PHIEU_ID					INT					=	0
DECLARE		@V_HANG_HOA_ID				INT					=	0
DECLARE		@V_SO_LUONG					DECIMAL				=	0
DECLARE		@V_DON_GIA					DECIMAL				=	0
DECLARE		@V_TON_DAU					DECIMAL				=	0
DECLARE		@V_TON_CUOI					DECIMAL				=	0
DECLARE		@V_NGAY_NHAP_PHIEU			DATETIME			=	NULL
DECLARE		@V_CHECK_THE_KHO			INT					=	0
DECLARE		@V_CHECK_CHI_TIET			INT					=	0
DECLARE		@V_TRANG_THAI_PHIEU_NHAP	NVARCHAR(MAX)		=	N''

-- KIỂM TRA @MESSAGE
SET @MESSAGE = ISNULL(@MESSAGE,'')

-- KIỂM TRA @PHIEU_NHAP_CHI_TIET_ID
SET @PHIEU_NHAP_CHI_TIET_ID = ISNULL(@PHIEU_NHAP_CHI_TIET_ID,'')
IF @PHIEU_NHAP_CHI_TIET_ID = ''
	SET @PHIEU_NHAP_CHI_TIET_ID = 0

-- LẤY THÔNG TIN PHIẾU NHẬP CHI TIẾT
SELECT		  @V_KHO_HANG_ID	=	KPN.KhoNhap
			, @V_PHIEU_ID		=	KPN_CT.PhieuNhapId
			, @V_HANG_HOA_ID	=	KPN_CT.HangHoaId
			, @V_SO_PHIEU		=	KPN.SoPhieu
			, @V_SO_LUONG		=	KPN_CT.SoLuong
			, @V_DON_GIA		=	KPN_CT.DonGia
			, @V_TRANG_THAI_PHIEU_NHAP = KPN.MaTrangThai
			, @V_CHECK_CHI_TIET	=	COUNT(KPN_CT.PhieuNhapChiTietId)
FROM		KhoPhieuNhapChiTiet KPN_CT WITH(NOLOCK, READUNCOMMITTED)
			LEFT JOIN KhoPhieuNhap KPN WITH(NOLOCK, READUNCOMMITTED) ON KPN_CT.PhieuNhapId = KPN.PhieuNhapId
WHERE		KPN_CT.PhieuNhapChiTietId = @PHIEU_NHAP_CHI_TIET_ID
GROUP BY	KPN.KhoNhap, KPN_CT.PhieuNhapId, KPN_CT.HangHoaId, KPN_CT.SoLuong, KPN_CT.DonGia,KPN.MaTrangThai,KPN.SoPhieu

SELECT @V_NGAY_NHAP_PHIEU = NgayNhap FROM KhoPhieuNhap WHERE PhieuNhapId = @V_PHIEU_ID

-- KIỂM TRA TRANG THÁI PHIẾU NHẬP
IF @V_TRANG_THAI_PHIEU_NHAP = 'KPN_LSC'
BEGIN
	SET @MESSAGE = N'CHECK_INPUT|1|Phiếu này đã lưu sổ cái'
	SELECT * FROM KhoTheKho WHERE TheKhoId = 0
	RETURN
END

-- KIỂM TRA PHIẾU CHI TIẾT
IF ISNULL(@V_CHECK_CHI_TIET, 0) = 0
BEGIN
	SET @MESSAGE = N'CHECK_INPUT|2|Không tìm thấy chi tiết'
	SELECT * FROM KhoTheKho WHERE TheKhoId = 0
	RETURN
END

-- KIỂM TRA PHIẾU CHI TIẾT LƯU TRONG THẺ KHO

SELECT @V_CHECK_THE_KHO = COUNT(KTK.TheKhoId)
FROM KhoTheKho KTK WITH(NOLOCK, READUNCOMMITTED)
WHERE KTK.PhieuId = @V_PHIEU_ID AND KTK.PhieuChiTietId = @PHIEU_NHAP_CHI_TIET_ID AND KTK.SoPhieu = @V_SO_PHIEU

IF ISNULL(@V_CHECK_THE_KHO, 0) > 0
BEGIN
	SET @MESSAGE = N'CHECK_INPUT|3|Chi tiết đã tồn tại trong thẻ kho'
	SELECT * FROM KhoTheKho WHERE TheKhoId = 0
	RETURN
END

PRINT @V_CHECK_THE_KHO

-- TÍNH TỒN ĐẦU
SELECT TOP 1 @V_TON_DAU = KTK.TonCuoi
FROM KhoTheKho KTK WITH(NOLOCK, READUNCOMMITTED)
WHERE KTK.KhoHangId = @V_KHO_HANG_ID AND KTK.HangHoaId = @V_HANG_HOA_ID
ORDER BY KTK.TheKhoId DESC

SET @V_TON_DAU = ISNULL(@V_TON_DAU, 0);

-- TÍNH TỒN CUỐI

SET @V_TON_CUOI = @V_TON_DAU + @V_SO_LUONG

-- THÊM THẺ KHO
INSERT INTO	KhoTheKho 
			(KhoHangId		, SoPhieu		, PhieuId		, PhieuChiTietId			, HangHoaId			, SoLuongNhap	, DonGiaNhap	, TonCuoi		, SoLuongXuat	, DonGiaXuat	,NgayTao			, XoaYN	, CtrVersion)
VALUES		(@V_KHO_HANG_ID	, @V_SO_PHIEU	, @V_PHIEU_ID	, @PHIEU_NHAP_CHI_TIET_ID	, @V_HANG_HOA_ID	, @V_SO_LUONG	, @V_DON_GIA	, @V_TON_CUOI	, 0				, 0				,@V_NGAY_NHAP_PHIEU	, 'N'	, 1)

SELECT * FROM KhoTheKho WHERE TheKhoId = @@IDENTITY

------------------------------------------------
END
