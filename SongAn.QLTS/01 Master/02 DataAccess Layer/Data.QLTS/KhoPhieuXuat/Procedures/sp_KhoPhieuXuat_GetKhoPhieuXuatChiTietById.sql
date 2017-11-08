USE [QLTS]
GO

/**************************************************
1. Create Date	: 2017.10.25
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoPhieuXuat_GetKhoPhieuXuatChiTietById]
						 @KHOPHIEUXUATID		=	'20'

						,@COSO_ID				=	1
						,@NHANVIEN_ID			=	6
						,@FUNCTIONCODE			=	'CN0046'
						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.10.25 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuXuat_GetKhoPhieuXuatChiTietById]
	 @KHOPHIEUXUATID		VARCHAR(MAX)	=	NULL

	,@COSO_ID				INT				=	NULL
	,@NHANVIEN_ID			INT				=	NULL
	,@FUNCTIONCODE			VARCHAR(MAX)	=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
--------------------------------------------------
-- INPUT DEFAULT
SET @KHOPHIEUXUATID =	ISNULL(@KHOPHIEUXUATID,'')
IF @KHOPHIEUXUATID =''
	SET @KHOPHIEUXUATID = 0;

SELECT		COUNT(KPXCT.KhoPhieuXuatChiTietId) OVER () AS MAXCNT
			,KPXCT.*
			,NNS.TenNguonNganSach
			,TS.TenTaiSan,TS.DonViTinh
FROM		KhoPhieuXuatChiTiet KPXCT
			LEFT JOIN NguonNganSach NNS ON KPXCT.NguonNganSachId = NNS.NguonNganSachId
			LEFT JOIN TaiSan TS ON KPXCT.TaiSanId = TS.TaiSanId
WHERE		KPXCT.KhoPhieuXuatId = @KHOPHIEUXUATID
--------------------------------------------------
	SET NOCOUNT OFF;
END
