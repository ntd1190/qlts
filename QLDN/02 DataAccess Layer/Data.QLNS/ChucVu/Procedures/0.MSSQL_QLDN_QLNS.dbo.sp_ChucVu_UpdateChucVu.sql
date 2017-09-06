/*************************************************************  
1. Create Date	: 2017.05.25
2. Creator		: Van Phu Hoi
3. Description	: Thong tin chuc vu
4. Function		: QLDNMAIN/chucvu/update
5. Example		: 
					EXEC sp_ChucVu_GetChucVuById @CHUC_VU_ID='2'
					, @ORDER_CLAUSE				= ''
					, @SKIP						= 0
					, @TAKE						= 10
					SELECT * FROM CHUCVU CV WITH(NOLOCK, READUNCOMMITTED) WHERE XoaYN='N'  AND CV.ChucVuId=2 

6. Precaution	:
7. History		:
				  2017.05.25(Van Phu Hoi) - Tạo mới
				  2017.06.02(Nguyen Thanh Binh) - bổ sung return 
*************************************************************/
ALTER PROCEDURE [dbo].[sp_ChucVu_UpdateChucVu]
	  @ChucVuId			int	= null,
	  @LoginId			int	= null,
	  @MaChucVu			VARCHAR(20)	= null,
	  @TenChucVu		NVARCHAR(200)	= null,
	  @GhiChu			NVARCHAR(max)	= null,
	  @CtrVersion		INT	= 0 OUTPUT 
	
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
	
	SET @CtrVersion = ISNULL(@CtrVersion, 1)

	SET @CtrVersion = @CtrVersion+1
	--IF EXISTS (SELECT * FROM  ChucVu WHERE XoaYN='N' AND ChucVuId=@ChucVuId AND CtrVersion=@CtrVersion)
	--BEGIN
		UPDATE	ChucVu  
		SET
			MaChucVu=@MaChucVu
			,TenChucVu=@TenChucVu
			,GhiChU=@GhiChu
			,NguoiTao=@LoginId
			,CtrVersion=@CtrVersion  
		WHERE XoaYN='N' AND ChucVuId=@ChucVuId
	--END

	SELECT * FROM ChucVu WHERE ChucVuId = @ChucVuId
END