/*************************************************************  
1. Create Date	: 2017.07.17
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÊM THÔNG TIN CHI NHÁNH
4. Function		: QLDNKHO/CHINHANH/LIST
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ChiNhanh_UpdateChiNhanh]
						 @ChiNhanhId		=	1
						,@MaChiNhanh		=	'CN001'
						,@TenChiNhanh		=	N'CHI NHÁNH 001'
						,@DiaChi			=	N'CHI NHÁNH 002'
						,@MoTa				=	N'CHI NHÁNH 002'
						,@ChiNhanhCha		=	NULL
						,@CtrVersion		=	1
						,@LOGIN_ID			=	68
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.07.17 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_ChiNhanh_UpdateChiNhanh]
         @ChiNhanhId		INT				=	NULL
        ,@MaChiNhanh		NVARCHAR(MAX)	=	NULL
        ,@TenChiNhanh		NVARCHAR(MAX)	=	NULL
        ,@DiaChi			NVARCHAR(MAX)	=	NULL
        ,@MoTa				NVARCHAR(MAX)	=	NULL
        ,@ChiNhanhCha		INT				=	NULL
        --,@NgayTao			DATETIME		=	NULL
        --,@NguoiTao			INT				=	NULL
        --,@XoaYN				VARCHAR(1)		=	NULL
        ,@CtrVersion		INT				=	NULL

		,@LOGIN_ID			INT				=	NULL
		,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
--------------------------------------------------
DECLARE		@CTR_VERSION			INT		=	0

	SET @ChiNhanhId		= ISNULL(@ChiNhanhId, 0)
	SET @MaChiNhanh		= ISNULL(@MaChiNhanh, '')
	SET @TenChiNhanh	= ISNULL(@TenChiNhanh, '')

	SET @CtrVersion = ISNULL(@CtrVersion, '')
	IF(@CtrVersion = '')
		SET @CtrVersion = -1

	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '')
	IF(@LOGIN_ID = '')
		SET @LOGIN_ID = 0
----------
	-- KIỂM TRA @CtrVersion
	SELECT @CTR_VERSION = CtrVersion FROM ChiNhanh WHERE ChiNhanhId = @ChiNhanhId
	IF @CtrVersion <> @CTR_VERSION
	BEGIN
		SET @MESSAGE = N'CTR_VERSION|1|Đã có người dùng khác thay đổi thông tin'
		SELECT * FROM ChiNhanh WHERE ChiNhanhId = 0
		RETURN
	END
----------
	UPDATE	ChiNhanh
	SET		 MaChiNhanh		=	@MaChiNhanh		
			,TenChiNhanh	=	@TenChiNhanh
			,DiaChi			=	@DiaChi
			,MoTa			=	@MoTa
			,ChiNhanhCha	=	@ChiNhanhCha
			,CtrVersion		=	CtrVersion + 1
	WHERE ChiNhanhId = @ChiNhanhId
----------
	SELECT * FROM ChiNhanh WHERE ChiNhanhId = @ChiNhanhId
END