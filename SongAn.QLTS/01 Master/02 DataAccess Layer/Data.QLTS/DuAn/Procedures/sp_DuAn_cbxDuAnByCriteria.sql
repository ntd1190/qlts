/**************************************************
1. Create Date	: 2017.09.08
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÔNG TIN TÀI SẢN
4. Function		: 
5. Example		: 
					EXEC [sp_DuAn_cbxDuAnByCriteria]
						 @Search			=	N''
						,@DuAnId			=	N''
						,@MaDuAn			=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.08 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROC [dbo].[sp_DuAn_cbxDuAnByCriteria]
( 
	 @Search			NVARCHAR(500)   =	NULL	
	,@DuAnId	        INT				=	NULL			
	,@MaDuAn	        NVARCHAR(500)	=	NULL			
	,@CoSoId	        NVARCHAR(500)	=	NULL			
	,@NhanVienId	    NVARCHAR(500)	=	NULL		
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	SET @Search		=	ISNULL(@Search,'')
	SET @DuAnId		=	ISNULL(@DuAnId, 0)
	SET @MaDuAn		=	ISNULL(@MaDuAn,'')

	SELECT TOP 10 DA.*
	FROM	DuAn DA
	WHERE	(@DuAnId = 0 OR DA.DuAnId = @DuAnId)
			AND (@MaDuAn = '' OR DA.MaDuAn = @MaDuAn)
			AND (@Search = '' OR DA.MaDuAn LIKE N'%' + @Search + '%' OR DA.TenDuAn LIKE N'%' + @Search + '%')

	

-----------------------------------------------------
SET NOCOUNT OFF
END

