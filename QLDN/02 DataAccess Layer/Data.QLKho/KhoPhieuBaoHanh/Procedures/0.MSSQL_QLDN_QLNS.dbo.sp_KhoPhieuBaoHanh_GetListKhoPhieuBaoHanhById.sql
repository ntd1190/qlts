/*************************************************************  
1. Create Date	: 2017.07.28
2. Creator		: NGUYEN THANH BINH
3. Description	: THÔNG TIN PHIẾU BẢO HÀNH
4. Function		: QLDNKHO/KHOPHIEUNHAP/LIST
5. Example		: 
					--∬
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoPhieuBaoHanh_GetListKhoPhieuBaoHanhById]  
						@PHIEUBAOHANH_IDS		=	'2'
						,@LOGIN_ID				=	'68'
						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.07.28 (Nguyen Thanh Binh) - TẠO MỚI
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuBaoHanh_GetListKhoPhieuBaoHanhById]
( 
		 @PHIEUBAOHANH_IDS			NVARCHAR(4000)	=	NULL
		,@LOGIN_ID					NVARCHAR(MAX)	=	NULL
		,@MESSAGE					NVARCHAR(MAX)		OUTPUT
)
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
	SET @PHIEUBAOHANH_IDS = ISNULL(@PHIEUBAOHANH_IDS,'');
----------
	SELECT		KPBH.*,KPBH.PhieuBaoHanhId KPBH_ID,KPBH.CtrVersion KPBH_CTRVERSION
				,TT.TrangThai TenTrangThaiTiepNhan
				,PX.NgayXuat
				,SERI.ThoiGianBaoHanh
	FROM		KhoPhieuBaoHanh KPBH
				LEFT JOIN TrangThai TT ON KPBH.TrangThaiTiepNhan = TT.MaTrangThai
				LEFT JOIN KhoPhieuXuat PX ON KPBH.SoPhieu = PX.SoPhieu
				LEFT JOIN KhoPhieuSeries SERI ON KPBH.SeriesNo = SERI.Series
	WHERE		KPBH.XoaYN = 'N'
				AND CHARINDEX('|' + CAST(KPBH.PhieuBaoHanhId AS VARCHAR(20)) + '|', '|' + @PHIEUBAOHANH_IDS + '|') > 0

--------------------------------------------------
SET NOCOUNT OFF
END