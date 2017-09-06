/*************************************************************  
1. Create Date	: 2017.08.10
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: XÓA THÔNG TIN CÔNG VIỆC TRƯỚC ĐÂY
4. Function		: QLDNMAIN/NHANVIEN
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_CongViecTruocDay_DeleteCongViecTruocDay]
						 @CongViecTruocDayId	=	2
						,@CtrVersion			=	1

						,@LOGIN_ID				=	NULL
						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.08.10 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_CongViecTruocDay_DeleteCongViecTruocDay]
         @CongViecTruocDayId	INT				=	NULL
        ,@CtrVersion			INT				=	NULL

		,@LOGIN_ID				INT				=	NULL
		,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
--------------------------------------------------
	DECLARE	@V_CTRVERSION		INT				=	NULL
	DECLARE	@V_HAS_ERROR		BIT				=	0
----------
	SET @MESSAGE				= ''
	SET @CongViecTruocDayId		= ISNULL(@CongViecTruocDayId, 0)
	SET @CtrVersion				= ISNULL(@CtrVersion, -1)

	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '')
	IF(@LOGIN_ID = '')
		SET @LOGIN_ID = 0

----------
	-- KIỂM TRA @CtrVersion
	SELECT @V_CTRVERSION = CtrVersion FROM CongViecTruocDay WHERE CongViecTruocDayId = @CongViecTruocDayId
	IF @V_CTRVERSION <> @CtrVersion
	BEGIN
		SET @MESSAGE = N'CTR_VERSION|1|Đã có người dùng khác thay đổi thông tin'
		SET @V_HAS_ERROR = 1
	END
----------
	IF @V_HAS_ERROR = 0
		SELECT * FROM CongViecTruocDay WHERE CongViecTruocDayId = @CongViecTruocDayId
	ELSE
		SELECT * FROM CongViecTruocDay WHERE CongViecTruocDayId = 0
----------
	IF @V_HAS_ERROR = 0
	BEGIN
		DELETE	CongViecTruocDay
		WHERE	CongViecTruocDayId = @CongViecTruocDayId
	END
--------------------------------------------------
END
