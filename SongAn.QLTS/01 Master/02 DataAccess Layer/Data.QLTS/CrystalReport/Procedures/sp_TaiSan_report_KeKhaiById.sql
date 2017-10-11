/**************************************************
1. Create Date	: 2017.10.09
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_TaiSan_report_KeKhaiById]
						 @TaiSanId			=	''
						,@LoaiKeKhai		=	''
						,@COSO_ID			=	''
						,@NHANVIEN_ID		=	''
6. Precaution	:
7. History		:
				  2017.10.09 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_TaiSan_report_KeKhaiById]
	 @TaiSanId		NVARCHAR(MAX)	=	NULL
	,@LoaiKeKhai	NVARCHAR(MAX)	=	NULL
	,@COSO_ID		INT				=	NULL
	,@NHANVIEN_ID	INT				=	NULL
AS
BEGIN
SET NOCOUNT ON
--------------------------------------------------
SET @TaiSanId = ISNULL(@TaiSanId, '')
SET @LoaiKeKhai = ISNULL(@LoaiKeKhai, '')

SELECT		 TS.TenTaiSan TS_TenTaiSan
			,TS_NHA.TenTaiSan TS_NHA_TenTaiSan
			,TTKK_DAT.DienTich TTKK_DAT_DienTich
			,TTKK_NHA.DienTich TTKK_NHA_DienTich
FROM		TaiSan TS
			LEFT JOIN ThongTinKeKhai_Dat TTKK_DAT ON TS.TaiSanId = TTKK_DAT.TaiSanId
			LEFT JOIN ThongTinKeKhai_Nha TTKK_NHA ON TTKK_DAT.TaiSanId = TTKK_NHA.ThuocDat
			LEFT JOIN TaiSan TS_NHA ON TTKK_NHA.TaiSanId = TS_NHA.TaiSanId
WHERE		(@TaiSanId = '' OR CHARINDEX('|' + CAST(TS.TaiSanId AS VARCHAR(20)) + '|','|' + @TaiSanId + '|')>0)
			AND (@LoaiKeKhai = '' OR CHARINDEX('|' + CAST(TS.LoaiKeKhai AS VARCHAR(20)) + '|','|' + @LoaiKeKhai + '|')>0)
--------------------------------------------------
SET NOCOUNT OFF
END

