/*************************************************************  
1. Create Date	: 2017.07.17
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: UPDATE XÓA CHI NHÁNH
4. Function		: QLDNKHO/CHINHANH/LIST
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ChiNhanh_UpdatXoaListChiNhanh]
						 @ChiNhanhIds		=	'1|2'		--VD: '1|2|...n'
						,@LOGIN_ID			=	68
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.07.17 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_ChiNhanh_UpdatXoaListChiNhanh]
         @ChiNhanhIds		NVARCHAR(MAX)	=	NULL

		,@LOGIN_ID			INT				=	NULL
		,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
--------------------------------------------------
DECLARE		@CTR_VERSION			INT		=	0

	SET @ChiNhanhIds		= ISNULL(@ChiNhanhIds, '')
	IF(@ChiNhanhIds = '')
		SET @ChiNhanhIds = '0'

	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '')
	IF(@LOGIN_ID = '')
		SET @LOGIN_ID = 0
----------
	UPDATE	ChiNhanh
	SET		XoaYN = 'Y'
			,CtrVersion = CtrVersion + 1
	WHERE	CHARINDEX('|' + CAST(ChiNhanhId AS VARCHAR(20)) + '|', '|' + @ChiNhanhIds + '|') > 0
----------
	SELECT * FROM ChiNhanh WHERE CHARINDEX('|' + CAST(ChiNhanhId AS VARCHAR(20)) + '|', '|' + @ChiNhanhIds + '|') > 0
END