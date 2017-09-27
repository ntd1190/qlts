/**************************************************
1. Create Date	: 2017.09.20
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_DanhGia_GetListNguyenGiaByDanhGia]
							 @TaiSanId			=	1065
							,@DanhGiaId			=	NULL
	
							,@COSO_ID			=	1
							,@NHANVIEN_ID		=	7
							,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.20 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_DanhGia_GetListNguyenGiaByDanhGia]
	 @TaiSanId			INT				=	NULL
	,@DanhGiaId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@PhongBanId		INT				=	NULL
	
	,@COSO_ID			INT				=	NULL
	,@NHANVIEN_ID		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON
--------------------------------------------------
SELECT		TS.TaiSanId,TS.TenTaiSan,ISNULL(DG_NG.NguonNganSachId,NG.NguonNganSachId) NguonNganSachId,ISNULL(DG_NG.GiaTriCu,NG.GiaTri) GiaTriCu,ng.GiaTri
FROM		(	SELECT	DanhGia_NguyenGia.GiaTriCu,DanhGia_NguyenGia.NguonNganSachId,DanhGia.TaiSanId
				FROM	DanhGia_NguyenGia
						LEFT JOIN DanhGia ON DanhGia_NguyenGia.DanhGiaId = DanhGia.DanhGiaId
				WHERE	DanhGia_NguyenGia.DanhGiaId = @DanhGiaId ) DG_NG
			FULL JOIN (	SELECT * 
						FROM NguyenGia 
						WHERE TaiSanId = @TaiSanId ) NG ON DG_NG.NguonNganSachId = NG.NguonNganSachId
			LEFT JOIN TaiSan TS ON DG_NG.TaiSanId = TS.TaiSanId OR NG.TaiSanId = TS.TaiSanId

--------------------------------------------------
SET NOCOUNT OFF
END

