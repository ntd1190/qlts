/**************************************************
1. Create Date	: 2017.09.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTin500_GetThayDoiThongTin500ById]
						 @ThayDoiThongTinId		=	26

						,@CoSoId				=	1
						,@NhanVienId			=	6
						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.14 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_ThayDoiThongTin500_GetThayDoiThongTin500ById]
	 @ThayDoiThongTinId	INT				=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON 
	SET @MESSAGE = ISNULL(@MESSAGE,'')
	SELECT	*
	FROM	ThayDoiThongTin_Tren500
	WHERE	ThayDoiThongTinId = @ThayDoiThongTinId
SET NOCOUNT OFF
END

