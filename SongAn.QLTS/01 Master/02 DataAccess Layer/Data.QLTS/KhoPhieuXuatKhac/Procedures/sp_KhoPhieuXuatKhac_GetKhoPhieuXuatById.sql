/**************************************************
1. Create Date	: 2017.10.24
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoPhieuXuatKhac_GetKhoPhieuXuatById]
						 @KHOPHIEUXUATID		=	'20'

						,@COSO_ID				=	1
						,@NHANVIEN_ID			=	6
						,@FUNCTIONCODE			=	'CN0046'
						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.10.24 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuXuatKhac_GetKhoPhieuXuatById]
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

SELECT		KPX.*
			,CS.TenCoSo
			,NV.TenNhanVien TenNguoiTao
FROM		KhoPhieuXuat KPX
			LEFT JOIN CoSo CS ON KPX.CoSoId = CS.CoSoId
			LEFT JOIN NhanVien NV ON KPX.NguoiTao = NV.NhanVienId
WHERE		KPX.Loai = 'XK' and KPX.KhoPhieuXuatId = @KHOPHIEUXUATID
--------------------------------------------------
	SET NOCOUNT OFF;
END
