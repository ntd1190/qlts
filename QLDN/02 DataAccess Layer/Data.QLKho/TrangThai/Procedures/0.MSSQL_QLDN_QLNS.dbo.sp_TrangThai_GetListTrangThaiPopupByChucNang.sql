/*************************************************************  
1. Create Date	: 2017.07.28
2. Creator		: NGUYEN THANH BINH
3. Description	: DANH SÁCH TRẠNG THÁI
4. Function		: 
5. Example		: 
					--∬
					DECLARE @MESSAGE	NVARCHAR(MAX)
					exec [sp_TrangThai_GetListTrangThaiPopupByChucNang]  
					 @CHUCNANG			=	'KhoPhieuBaoHanh'
					,@LOGIN_ID			=	68
					,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.07.28 (Nguyen Thanh Binh) - TẠO MỚI
*************************************************************/
ALTER PROCEDURE [dbo].[sp_TrangThai_GetListTrangThaiPopupByChucNang]
( 
	 @CHUCNANG			NVARCHAR(4000)	=	NULL
	,@LOGIN_ID			INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	----------
	-- Chuẩn bị biến @CHUCNANG
	SET @CHUCNANG = ISNULL(@CHUCNANG, '');
	----------
	SELECT	*
	FROM	TrangThai
	WHERE	XoaYN = 'N' AND ChucNang = @CHUCNANG
SET NOCOUNT OFF
END