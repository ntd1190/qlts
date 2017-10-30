/**************************************************
1. Create Date	: 2017.10.27
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_KhoPhieuXuat_report_KhoPhieuXuatById]
						 @KhoPhieuXuatId		=	'34'
						,@COSO_ID			=	1
						,@NHANVIEN_ID		=	''
6. Precaution	:
7. History		:
				  2017.10.27 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuXuat_report_KhoPhieuXuatById]
	 @KhoPhieuXuatId		NVARCHAR(MAX)	=	NULL
	,@COSO_ID		INT				=	NULL
	,@NHANVIEN_ID	INT				=	NULL
AS
BEGIN
SET NOCOUNT ON
--------------------------------------------------
DECLARE  @V_DELIMITER	VARCHAR(10)		=	','
		,@_COSO_IDS		VARCHAR(MAX)	=	NULL

SELECT	KPXCT.*
		,TS.TenTaiSan,TS.DonViTinh
		,KPX.LyDo,KPX.NgayXuat,KPX.NguoiNhanHang,KPX.SoPhieu
		,CS.TenCoSo TenCoSo
		,CS_TT.TenCoSo TenCoSoTrucThuoc
		,HSX.TenHangSanXuat
		,KTS.TenKhoTaiSan TenKhoXuat
		,KPXCT.SoLuong*KPXCT.DonGia ThanhTien
FROM	KhoPhieuXuatChiTiet KPXCT
		LEFT JOIN KhoPhieuXuat KPX ON KPXCT.KhoPhieuXuatId = KPX.KhoPhieuXuatId
		LEFT JOIN CoSo CS ON KPX.CoSoId = CS.CoSoId
		LEFT JOIN CoSo CS_TT ON CS.TrucThuoc = CS_TT.CoSoId
		LEFT JOIN TaiSan TS ON KPXCT.TaiSanId = TS.TaiSanId
		LEFT JOIN HangSanXuat HSX ON TS.HangSanXuatId = HSX.HangSanXuatId
		LEFT JOIN KhoTaiSan KTS ON KPX.KhoXuatId = KTS.KhoTaiSanId
WHERE	KPXCT.KhoPhieuXuatId = @KhoPhieuXuatId
--------------------------------------------------
SET NOCOUNT OFF
END