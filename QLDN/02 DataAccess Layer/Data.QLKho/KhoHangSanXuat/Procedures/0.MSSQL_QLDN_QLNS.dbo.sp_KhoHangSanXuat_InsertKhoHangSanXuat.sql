/*************************************************************  
1. Create Date	: 2017.06.07
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÊM THÔNG TIN HÃNG SẢN XUẤT
4. Function		: QLDNKHO/KHOHANGSANXUAT/LIST
5. Example		: 
					EXEC [sp_KhoHangSanXuat_InsertKhoHangSanXuat]
					   @HANG_SAN_XUAT_ID			=	'2'
					 , @MA_HANG_SAN_XUAT		=	'TEST001'
					 , @TEN_HANG_SAN_XUAT		=	'TEST'
					 , @MO_TA					=	'GHI CHU'
					 , @LOGIN_ID				=	'1'

6. Precaution	:
7. History		:
				  2017.06.07 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoHangSanXuat_InsertKhoHangSanXuat]
	    @HANG_SAN_XUAT_ID	NVARCHAR(20)	= null
	  , @MA_HANG_SAN_XUAT	VARCHAR(20)		= null
	  , @TEN_HANG_SAN_XUAT	NVARCHAR(200)	= null
	  , @MO_TA				NVARCHAR(max)	= null
	  , @XOAYN				VARCHAR(20)		= null
	  , @LOGIN_ID			VARCHAR(20)		= null
	
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
	SET @HANG_SAN_XUAT_ID = ISNULL(@HANG_SAN_XUAT_ID, '')
	SET @MA_HANG_SAN_XUAT = ISNULL(@MA_HANG_SAN_XUAT, '')
	SET @TEN_HANG_SAN_XUAT = ISNULL(@TEN_HANG_SAN_XUAT, '')
	SET @MO_TA = ISNULL(@MO_TA, '')


	SET @XOAYN = ISNULL(@XOAYN, '')
	IF(@XOAYN = '')
		SET @XOAYN = 'N'

	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '')
	IF(@LOGIN_ID = '')
		SET @LOGIN_ID = 0

	INSERT KhoHangSanXuat(MaHangSanXuat,TenHangSanXuat,MoTa,XoaYN,NguoiTao)
	VALUES (@MA_HANG_SAN_XUAT,@TEN_HANG_SAN_XUAT,@MO_TA,@XOAYN,@LOGIN_ID)

	SELECT * FROM KhoHangSanXuat WHERE HangSanXuatId = @@IDENTITY
END