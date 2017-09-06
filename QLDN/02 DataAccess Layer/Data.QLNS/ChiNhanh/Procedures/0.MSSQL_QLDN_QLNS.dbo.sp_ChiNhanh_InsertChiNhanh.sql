/*************************************************************  
1. Create Date	: 2017.07.17
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÊM THÔNG TIN CHI NHÁNH
4. Function		: QLDNKHO/CHINHANH/LIST
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ChiNhanh_InsertChiNhanh]
						 @ChiNhanhId		=	NULL
						,@MaChiNhanh		=	'CN002'
						,@TenChiNhanh		=	N'CHI NHÁNH 002'
						,@DiaChi			=	N'CHI NHÁNH 002'
						,@MoTa				=	N'CHI NHÁNH 002'
						,@ChiNhanhCha		=	NULL
						,@LOGIN_ID			=	68
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.07.17 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_ChiNhanh_InsertChiNhanh]
         @ChiNhanhId		INT				=	NULL
        ,@MaChiNhanh		NVARCHAR(MAX)	=	NULL
        ,@TenChiNhanh		NVARCHAR(MAX)	=	NULL
        ,@DiaChi			NVARCHAR(MAX)	=	NULL
        ,@MoTa				NVARCHAR(MAX)	=	NULL
        ,@ChiNhanhCha		INT				=	NULL
        --,@NgayTao			DATETIME		=	NULL
        --,@NguoiTao			INT				=	NULL
        --,@XoaYN				VARCHAR(1)		=	NULL
        --,@CtrVersion		INT				=	NULL

		,@LOGIN_ID			INT				=	NULL
		,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
--------------------------------------------------
	SET @MESSAGE		= ''
	SET @ChiNhanhId		= ISNULL(@ChiNhanhId, 0)
	SET @MaChiNhanh		= ISNULL(@MaChiNhanh, '')
	SET @TenChiNhanh	= ISNULL(@TenChiNhanh, '')

	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '')
	IF(@LOGIN_ID = '')
		SET @LOGIN_ID = 0
----------
	INSERT ChiNhanh	(	MaChiNhanh		,TenChiNhanh	,DiaChi		,MoTa	,ChiNhanhCha		,NguoiTao	,CtrVersion	)
	VALUES			(	@MaChiNhanh		,@TenChiNhanh	,@DiaChi	,@MoTa	,@ChiNhanhCha		,@LOGIN_ID	,1			)
----------
	SELECT * FROM ChiNhanh WHERE ChiNhanhId = @@IDENTITY
--------------------------------------------------
END