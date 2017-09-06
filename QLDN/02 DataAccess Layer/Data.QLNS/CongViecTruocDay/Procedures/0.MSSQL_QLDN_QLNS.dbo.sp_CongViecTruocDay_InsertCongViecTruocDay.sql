/*************************************************************  
1. Create Date	: 2017.08.10
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÊM THÔNG TIN CÔNG VIỆC TRƯỚC ĐÂY
4. Function		: QLDNMAIN/NHANVIEN
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_CongViecTruocDay_InsertCongViecTruocDay]
						 @CongViecTruocDayId	=	0
						,@NhanVienId			=	70
						,@TuNgay				=	'2014-11-01'
						,@DenNgay				=	'2016-12-01'
						,@CongTy				=	'XTV Corp'
						,@MoTa					=	''
						,@CtrVersion			=	NULL

						,@LOGIN_ID				=	NULL
						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.08.10 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_CongViecTruocDay_InsertCongViecTruocDay]
         @CongViecTruocDayId	INT				=	NULL
        ,@NhanVienId			NVARCHAR(MAX)	=	NULL
        ,@TuNgay				DATETIME		=	NULL
        ,@DenNgay				DATETIME		=	NULL
        ,@CongTy				NVARCHAR(MAX)	=	NULL
        ,@MoTa					NVARCHAR(MAX)	=	NULL
        ,@CtrVersion			INT				=	NULL

		,@LOGIN_ID				INT				=	NULL
		,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
--------------------------------------------------
	SET @MESSAGE				= ''
	SET @CongViecTruocDayId		= ISNULL(@CongViecTruocDayId, 0)
	SET @CongTy					= ISNULL(@CongTy, '')
	SET @MoTa					= ISNULL(@MoTa, '')
	SET @CtrVersion				= ISNULL(@CtrVersion, 1)

	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '')
	IF(@LOGIN_ID = '')
		SET @LOGIN_ID = 0
----------
	INSERT CongViecTruocDay	(	NhanVienId	,TuNgay		,DenNgay	,CongTy		,MoTa	,CtrVersion		)
	VALUES					(	@NhanVienId	,@TuNgay	,@DenNgay	,@CongTy	,@MoTa	,@CtrVersion	)
----------
	SELECT * FROM CongViecTruocDay WHERE CongViecTruocDayId = @@IDENTITY
--------------------------------------------------
END
