USE [QLTS]
GO

/**************************************************
1. Create Date	: 2017.09.06
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_LoaiXe_cbxLoaiXeByCriteria]
						 @Search			=	N''
						,@LoaiXeId	=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.06 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_LoaiXe_cbxLoaiXeByCriteria]
( 
	 @Search				NVARCHAR(500)   =	NULL
	,@LoaiXeId		INT				=	NULL
	,@CoSoId				NVARCHAR(500)	=	NULL			
	,@NhanVienId			NVARCHAR(500)	=	NULL		
	
)
AS  
BEGIN
SET NOCOUNT ON 
------------------------------------------------  
	SET @Search				=	ISNULL(@Search,'')
	SET @LoaiXeId	=	ISNULL(@LoaiXeId, 0)

	SELECT TOP 10 LX.*
	FROM	LoaiXe LX
	WHERE	(@LoaiXeId = 0 OR LX.LoaiXeId = @LoaiXeId)
			AND (@Search = '' OR LX.NoiDung LIKE N'%' + @Search + '%')
-----------------------------------------------------
SET NOCOUNT OFF
END

