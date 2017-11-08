USE [QLTS]
GO

/**************************************************
1. Create Date	: 2017.08.31
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÔNG TIN TÀI SẢN
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_TaiSan_GetTaiSanById]
						 @TaiSanId			=	34

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.08.31 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_TaiSan_GetTaiSanByMa]
	 @MaTaiSan		VARCHAR(20)				=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON  
	SELECT	TOP 1 TS.TaiSanId,TS.MaTaiSan,TS.DonViTinh,TS.TenTaiSan,PB.TenPhongBan, ISNULL((TD.SLTon + TD.SLTang - TD.SLGiam),0) as SoLuongTon ,  ISNULL(SUM(NG.GiaTri),0) NguyenGia
	FROM	TaiSan TS
			LEFT JOIN NguyenGia NG ON TS.TaiSanId = NG.TaiSanId
			LEFT JOIN TheoDoi TD ON TS.TaiSanId = TD.TaiSanId
			LEFT JOIN PhongBan PB ON TD.PhongBanId = PB.PhongBanId
		WHERE	TS.MaTaiSan = @MaTaiSan and TS.CoSoId=@CoSoId
	GROUP BY  TS.TaiSanId,TS.MaTaiSan,TS.TenTaiSan,TS.DonViTinh,PB.TenPhongBan,TD.SLTon,TD.SLTang,TD.SLGiam

SET NOCOUNT OFF
END

