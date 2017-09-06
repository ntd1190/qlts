/*************************************************************  
1. Create Date	: 2017.06.07
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: CẬP NHẬT THÔNG TIN KHO HÀNG
4. Function		: QLDNKHO/KHOKHOHANG/LIST
5. Example		: 
					EXEC [sp_KhoKhoHang_UpdateKhoKhoHang]
					   @KHO_HANG_ID				=	'1'
					 , @MA_KHO					=	'TEST001'
					 , @TEN_KHO					=	'TEST'
					 , @MO_TA					=	'GHI CHU'
					 , @LOGIN_ID				=	'1'

6. Precaution	:
7. History		:
				  2017.06.07 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoKhoHang_UpdateKhoKhoHang]
	    @KHO_HANG_ID		NVARCHAR(20)	= null
	  , @MA_KHO				VARCHAR(20)		= null
	  , @TEN_KHO			NVARCHAR(200)	= null
	  , @CHI_NHANH			NVARCHAR(200)	= null
	  , @DIA_CHI			NVARCHAR(max)	= null
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
		SET @LOGIN_ID = '0'

	UPDATE	
			KhoKhoHang  
	SET
			  MaKho				=	@MA_KHO
			, TenKho			=	@TEN_KHO
			, ChiNhanh			=	@CHI_NHANH
			, DiaChi			=	@DIA_CHI
			, MoTa				=	@MO_TA
	WHERE 
			XoaYN='N' 
			AND KhoHangId	=	@KHO_HANG_ID

	SELECT * FROM KhoKhoHang WHERE KhoHangId = @KHO_HANG_ID
END