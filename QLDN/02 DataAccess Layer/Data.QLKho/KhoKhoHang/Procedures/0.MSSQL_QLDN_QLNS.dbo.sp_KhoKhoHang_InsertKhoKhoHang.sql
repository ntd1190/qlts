/*************************************************************  
1. Create Date	: 2017.06.07
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÊM THÔNG TIN KHO HÀNG
4. Function		: QLDNKHO/KHOKHOHANG/LIST
5. Example		: 
					EXEC [sp_KhoKhoHang_InsertKhoKhoHang]
					   @KHO_HANG_ID				=	'2'
					 , @MA_KHO					=	'TEST001'
					 , @TEN_KHO					=	'TEST'
					 , @MO_TA					=	'GHI CHU'
					 , @LOGIN_ID				=	'1'

6. Precaution	:
7. History		:
				  2017.06.07 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoKhoHang_InsertKhoKhoHang]
	    @KHO_HANG_ID		NVARCHAR(20)	= null
	  , @MA_KHO				VARCHAR(20)		= null
	  , @TEN_KHO			NVARCHAR(200)	= null
	  , @CHI_NHANH			NVARCHAR(200)	= null
	  , @DIA_CHI		    NVARCHAR(max)	= null
	  , @MO_TA				NVARCHAR(max)	= null
	  , @XOAYN				VARCHAR(20)		= null
	  , @LOGIN_ID			VARCHAR(20)		= null
	
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
	SET @KHO_HANG_ID = ISNULL(@KHO_HANG_ID, '')
	SET @MA_KHO = ISNULL(@MA_KHO, '')
	SET @TEN_KHO = ISNULL(@TEN_KHO, '')
	SET @CHI_NHANH = ISNULL(@CHI_NHANH, '')
	SET @DIA_CHI = ISNULL(@DIA_CHI, '')
	SET @MO_TA = ISNULL(@MO_TA, '')


	SET @XOAYN = ISNULL(@XOAYN, '')
	IF(@XOAYN = '')
		SET @XOAYN = 'N'

	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '')
	IF(@LOGIN_ID = '')
		SET @LOGIN_ID = 0

	INSERT KhoKhoHang	(	MaKho		,TenKho		,MoTa		,ChiNhanh		,DiaChi		,XoaYN		,NguoiTao	)
	VALUES				(	@MA_KHO		,@TEN_KHO	,@MO_TA		,@CHI_NHANH		,@DIA_CHI	,@XOAYN		,@LOGIN_ID	)

	SELECT * FROM KhoKhoHang WHERE KhoHangId = @@IDENTITY
END