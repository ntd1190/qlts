/*************************************************************  
1. Create Date	: 2017.06.02
2. Creator		: Nguyen Thanh Binh
3. Description	: Them thong tin chuc vu
4. Function		: QLDNMAIN/chucvu/list
5. Example		: 
					EXEC [sp_ChucVu_InsertChucVu]
					   @LoginId			=	'2'
					 , @MaChucVu		=	'TEST001'
					 , @TenChucVu		=	'TEST'
					 , @GhiChu			=	'GHI CHU'

6. Precaution	:
7. History		:
				  2017.06.02(Van Phu Hoi) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_ChucVu_InsertChucVu]
	    @ChucVuId			int				= null
	  , @LoginId			int				= null
	  , @MaChucVu			VARCHAR(20)		= null
	  , @TenChucVu			NVARCHAR(200)	= null
	  , @GhiChu				NVARCHAR(max)	= null
	  , @CtrVersion			INT				= null 
	
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
	SET @MaChucVu = ISNULL(@MaChucVu, '')
	SET @TenChucVu = ISNULL(@TenChucVu, '')
	SET @GhiChu = ISNULL(@GhiChu, '')
	SET @LoginId = ISNULL(@LoginId, 0)

	INSERT ChucVu (MaChucVu,TenChucVu,GhiChu,XoaYN,NguoiTao,CtrVersion)
	VALUES (@MaChucVu,@TenChucVu,@GhiChu,'N',@LoginId,1)

	SELECT * FROM ChucVu WHERE ChucVuId = @@IDENTITY
END