/**************************************************
1. Create Date	: 2017.10.09
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_TaiSan_report_KeKhaiOto]
						 @TaiSanId			=	''
						,@Year				=	'2017'
						,@LoaiKeKhai		=	''
						,@COSO_ID			=	1
						,@NHANVIEN_ID		=	''
6. Precaution	:
7. History		:
				  2017.10.09 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_TaiSan_report_KeKhaiOto]
	 @TaiSanId		NVARCHAR(MAX)	=	NULL
	,@Year			NVARCHAR(MAX)	=	NULL
	,@LoaiKeKhai	NVARCHAR(MAX)	=	NULL
	,@COSO_ID		INT				=	NULL
	,@NHANVIEN_ID	INT				=	NULL
AS
BEGIN
SET NOCOUNT ON
--------------------------------------------------
DECLARE  @V_DELIMITER	VARCHAR(10)		=	','
		,@_COSO_IDS		VARCHAR(MAX)	=	NULL

SET @TaiSanId = ISNULL(@TaiSanId, '')
SET @LoaiKeKhai = '3'

EXEC [dbo].[sp_CoSo_GetListCoSoTrucThuocById]
   @COSOID=@COSO_ID
  ,@COSOID_OUT=@_COSO_IDS OUTPUT
SET @_COSO_IDS = REPLACE(@_COSO_IDS,',',@V_DELIMITER)
PRINT @_COSO_IDS

SELECT		 COUNT(TS.TaiSanId) OVER () AS MAXCNT
			,CS.TenCoSo TenDonVi
			,CS_TT.TenCoSo TenDonViChuQuan

			,TS.TaiSanId TS_TaiSanId
			,TS.TenTaiSan TS_TenTaiSan
			,TS.LoaiKeKhai TS_LoaiKeKhai

			,TTKK_OTO.*
FROM		(
			SELECT		TaiSanId,Nam,(SLTon + SUM(SLTang) - SUM(SLGiam)) TonCuoi
			FROM		TheoDoi
			WHERE		Nam = @Year
			GROUP BY	TaiSanId,Nam,SLTon
			HAVING		(SLTon + SUM(SLTang) - SUM(SLGiam)) > 0
			) TD
			LEFT JOIN TaiSan TS ON TD.TaiSanId = TS.TaiSanId
			LEFT JOIN ThongTinKeKhai_Oto TTKK_OTO ON TS.TaiSanId = TTKK_OTO.TaiSanId
			LEFT JOIN CoSo CS ON TS.CoSoId = CS.CoSoId
			LEFT JOIN CoSo CS_TT ON  CS.TrucThuoc = CS_TT.CoSoId
WHERE		(@TaiSanId = '' OR CHARINDEX(@V_DELIMITER + CAST(TS.TaiSanId AS VARCHAR(20)) + @V_DELIMITER,@V_DELIMITER + @TaiSanId + @V_DELIMITER)>0)
			AND  CHARINDEX(@V_DELIMITER + CAST(TS.CoSoId AS VARCHAR(20)) + @V_DELIMITER,@V_DELIMITER + @_COSO_IDS + @V_DELIMITER) > 0
			AND (@LoaiKeKhai = '' OR CHARINDEX(@V_DELIMITER + CAST(TS.LoaiKeKhai AS VARCHAR(20)) + @V_DELIMITER,@V_DELIMITER + @LoaiKeKhai + @V_DELIMITER)>0)
--------------------------------------------------
SET NOCOUNT OFF
END