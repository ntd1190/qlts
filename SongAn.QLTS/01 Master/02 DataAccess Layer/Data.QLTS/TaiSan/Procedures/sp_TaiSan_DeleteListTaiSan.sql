/**************************************************
1. Create Date	: 2017.09.05
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: XÓA THÔNG TIN TÀI SẢN
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_TaiSan_DeleteListTaiSan]
						 @TaiSanIds			=	N'1045|1044'

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.05 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_TaiSan_DeleteListTaiSan]
	 @TaiSanIds			VARCHAR(MAX)	=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	-- BIẾN NỘI BỘ

	-- INPUT DEFAULT
	SET @TaiSanIds = ISNULL(@TaiSanIds,'')
	SET @MESSAGE = ISNULL(@MESSAGE,'')

BEGIN TRANSACTION TAISAN_DELETE
BEGIN TRY
	-- XÓA BẢNG CON
	DELETE NguyenGia WHERE CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0
	DELETE ThongTinCongKhai WHERE CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0
	DELETE ThongTinKeKhai_Dat WHERE CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0
	DELETE ThongTinKeKhai_Nha WHERE CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0
	DELETE ThongTinKeKhai_Oto WHERE CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0
	DELETE ThongTinKeKhai_Tren500 WHERE CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0

	-- XÓA TÀI SẢN
	DELETE TaiSan WHERE CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0

	COMMIT TRANSACTION TAISAN_DELETE
END TRY
BEGIN CATCH
	IF @@TRANCOUNT > 0
		ROLLBACK TRANSACTION TAISAN_DELETE

	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
		RAISERROR (@ErrorMessage, -- Message text.
				   @ErrorSeverity, -- Severity.
				   @ErrorState -- State.
				   );
END CATCH
	SELECT * FROM TaiSan WHERE CHARINDEX('|' + CAST(TaiSanId AS VARCHAR(20)) + '|', '|' + @TaiSanIds + '|') > 0
	SET NOCOUNT OFF;
END
