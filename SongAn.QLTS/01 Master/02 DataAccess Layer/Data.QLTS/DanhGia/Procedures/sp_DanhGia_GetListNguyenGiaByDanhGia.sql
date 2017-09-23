/**************************************************
1. Create Date	: 2017.09.20
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_DanhGia_GetListNguyenGiaByDanhGia]
						 @TaiSanId			=	NULL
						,@DanhGiaId			=	NULL
						,@NV_ID				=	NULL
						,@PhongBanId		=	NULL

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.20 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_DanhGia_GetListNguyenGiaByDanhGia]
	 @TaiSanId			INT				=	NULL
	,@DanhGiaId			INT				=	NULL
	,@NV_ID				INT				=	NULL
	,@PhongBanId		INT				=	NULL
	
	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON
--------------------------------------------------
SELECT		TS.TaiSanId,TS.TenTaiSan
			,NG.NguonNganSachId,NNS.TenNguonNganSach,NG.GiaTri
			,ISNULL(DG_NG.GiaTriCu,0) GiaTriCu
FROM		TaiSan TS
			LEFT JOIN NguyenGia NG ON TS.TaiSanId = NG.TaiSanId
			LEFT JOIN (	SELECT	_DG.*
						FROM	DanhGia _DG
						WHERE	_DG.DanhGiaId = @DanhGiaId 
								OR (_DG.NhanVienId = @NhanVienId AND _DG.PhongBanId = @PhongBanId AND _DG.TaiSanId = @TaiSanId)) DG ON DG.TaiSanId = TS.TaiSanId
			LEFT JOIN DanhGia_NguyenGia DG_NG ON DG.DanhGiaId = DG_NG.DanhGiaId
			LEFT JOIN NguonNganSach NNS ON NG.NguonNganSachId = NNS.NguonNganSachId
WHERE		NG.TaiSanId = @TaiSanId
--------------------------------------------------
SET NOCOUNT OFF
END

