/*************************************************************  
1. Create Date	: 2017.07.06
2. Creator		: NGUYEN THANH BINH
3. Description	: Lấy danh sách Nhân viên theo điều kiện
4. Function		: QLDNMAIN/nhanvien/List
5. Example		: 
					--∬
					exec [sp_KhoTongHopXuatNhapTon_GetListTheKhoXuatNhapTonByCriteria]  
					 @KHO_HANG_IDS				=	''
					,@HANG_HOA_IDS				=	''
					,@START_DATE				=	'2017-07-01'
					,@END_DATE					=	'2017-07-31'
					,@LOGIN_ID					= ''
					,@ORDER_CLAUSE				= 'HangHoaId ASC'
					,@SKIP						= 0
					,@TAKE						= 100

6. Precaution	:
7. History		:
				  2017.07.06 (NGUYEN THANH BINH) - Tạo mới
				  2017.07.14 (NGUYEN THANH BINH) - tính lại dự đầu, dư cuối
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoTongHopXuatNhapTon_GetListTheKhoXuatNhapTonByCriteria]
( 
	 @KHO_HANG_IDS	NVARCHAR(MAX)	=	NULL
	,@HANG_HOA_IDS	NVARCHAR(MAX)	=	NULL
	,@START_DATE	NVARCHAR(MAX)	=	NULL
	,@END_DATE		NVARCHAR(MAX)	=	NULL
	,@LOGIN_ID		INT				=	NULL
	,@ORDER_CLAUSE	NVARCHAR(MAX)	=	NULL
	,@SKIP			INT				=	NULL
	,@TAKE			INT				=	NULL
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
-- BẢNG HÀNG HÓA TRONG THẺ KHO
IF OBJECT_ID('tempdb..#HANG_HOA') IS NOT NULL
	DROP TABLE #HANG_HOA

SELECT HangHoaId
INTO #HANG_HOA
FROM KhoTheKho
WHERE		XoaYN = 'N'
			AND (ISNULL(@HANG_HOA_IDS, '') = '' OR CHARINDEX('|'+CAST(HangHoaId AS VARCHAR(20))+'|', '|'+@HANG_HOA_IDS+'|') > 0)
			AND (ISNULL(@KHO_HANG_IDS, '') = '' OR CHARINDEX('|'+CAST(KhoHangId AS VARCHAR(20))+'|', '|'+@KHO_HANG_IDS+'|') > 0)
			AND NGAYTAO < Convert(DATE,@END_DATE,102)
GROUP BY	HangHoaId

-- BẢNG TỒN ĐẦU
IF OBJECT_ID('tempdb..#TON_DAU') IS NOT NULL
	DROP TABLE #TON_DAU

SELECT		#HANG_HOA.HangHoaId
			,SUM(SoLuongNhap-SoLuongXuat) TonDau,SUM(SoLuongNhap*DonGiaNhap) GTNhapTonDau, SUM(SoLuongXuat*DonGiaXuat) GTXuatTonDau
INTO		#TON_DAU
FROM		#HANG_HOA
			LEFT JOIN KhoTheKho ON #HANG_HOA.HangHoaId = KhoTheKho.HangHoaId
WHERE		KhoTheKho.XoaYN = 'N'
			AND (ISNULL(@KHO_HANG_IDS, '') = '' OR CHARINDEX('|'+CAST(KhoHangId AS VARCHAR(20))+'|', '|'+@KHO_HANG_IDS+'|') > 0)
			AND NGAYTAO < Convert(DATE,@START_DATE,102)
GROUP BY	#HANG_HOA.HangHoaId

-- BẢNG TỔNG NHẬP XUẤT HÀNG HÓA
IF OBJECT_ID('tempdb..#THE_KHO') IS NOT NULL
	DROP TABLE #THE_KHO

SELECT		#HANG_HOA.HangHoaId
			,SUM(SoLuongNhap) SoLuongNhap
			,SUM(SoLuongNhap*DonGiaNhap) TienNhap
			,SUM(SoLuongXuat) SoLuongXuat
			,SUM(SoLuongXuat*DonGiaXuat) TienXuat
INTO		#THE_KHO
FROM		#HANG_HOA
			LEFT JOIN KhoTheKho ON #HANG_HOA.HangHoaId = KhoTheKho.HangHoaId
WHERE		KhoTheKho.XoaYN = 'N'
			AND (ISNULL(@KHO_HANG_IDS, '') = '' OR CHARINDEX('|'+CAST(KhoHangId AS VARCHAR(20))+'|', '|'+@KHO_HANG_IDS+'|') > 0)
			AND NGAYTAO >= Convert(DATE,@START_DATE,102) AND NGAYTAO <= Convert(DATE,@END_DATE,102)
GROUP BY	#HANG_HOA.HangHoaId

-- BẢNG KẾT QUẢ TỔNG HỢP XUẤT NHẬP TỒN
SELECT		#HANG_HOA.HangHoaId,KhoHangHoa.MaHangHoa,KhoHangHoa.TenHangHoa,KhoHangHoa.DonViTinh
			,ISNULL(#TON_DAU.TonDau,0) TonDau,ISNULL(#TON_DAU.GTNhapTonDau,0) GTNhapTonDau,ISNULL(#TON_DAU.GTXuatTonDau,0) GTXuatTonDau
			,ISNULL(#THE_KHO.SoLuongNhap,0) SoLuongNhap,ISNULL(#THE_KHO.TienNhap,0) TienNhap,ISNULL(#THE_KHO.SoLuongXuat,0) SoLuongXuat,ISNULL(#THE_KHO.TienXuat,0) TienXuat
			,ISNULL(#TON_DAU.TonDau,0)+ISNULL(#THE_KHO.SoLuongNhap,0)-ISNULL(#THE_KHO.SoLuongXuat,0) TonCuoi
			,ISNULL(#TON_DAU.GTNhapTonDau,0)+ISNULL(#THE_KHO.TienNhap,0) GTNhapTonCuoi
			,ISNULL(#TON_DAU.GTXuatTonDau,0)+ISNULL(#THE_KHO.TienXuat,0) GTXuatTonCuoi
FROM		#HANG_HOA
			LEFT JOIN #TON_DAU ON #HANG_HOA.HangHoaId = #TON_DAU.HangHoaId
			LEFT JOIN #THE_KHO ON #HANG_HOA.HangHoaId = #THE_KHO.HangHoaId
			LEFT JOIN KhoHangHoa ON #HANG_HOA.HangHoaId = KhoHangHoa.HangHoaId
--ORDER BY	 CASE WHEN @ORDER_CLAUSE NOT LIKE '% ASC' THEN 0 WHEN @ORDER_CLAUSE LIKE 'HangHoaId %' THEN #HANG_HOA.HangHoaId END ASC
--			,CASE WHEN @ORDER_CLAUSE NOT LIKE '% DESC' THEN 0 WHEN @ORDER_CLAUSE LIKE 'HangHoaId %' THEN #HANG_HOA.HangHoaId END DESC
--			OFFSET @SKIP ROWS FETCH NEXT @TAKE ROWS ONLY

DROP TABLE #HANG_HOA
DROP TABLE #TON_DAU
DROP TABLE #THE_KHO
-----------------------------------------------------
SET NOCOUNT OFF
END