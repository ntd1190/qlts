/**************************************************
1. Create Date	: 2017.09.06
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_HienTrangSuDung_cbxHienTrangSuDungByCriteria]
						 @Search			=	N''
						,@HienTrangSuDungId	=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.06 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_HienTrangSuDung_cbxHienTrangSuDungByCriteria]
( 
	 @Search				NVARCHAR(500)   =	NULL
	,@HienTrangSuDungId		INT				=	NULL
	,@CoSoId				NVARCHAR(500)	=	NULL			
	,@NhanVienId			NVARCHAR(500)	=	NULL		
	
)
AS  
BEGIN
SET NOCOUNT ON 
------------------------------------------------  
	SET @Search				=	ISNULL(@Search,'')
	SET @HienTrangSuDungId	=	ISNULL(@HienTrangSuDungId, 0)

	SELECT TOP 10 HTSD.*
	FROM	HienTrangSuDung HTSD
	WHERE	(@HienTrangSuDungId = 0 OR HTSD.HienTrangSuDungId = @HienTrangSuDungId)
			AND (@Search = '' OR HTSD.NoiDung LIKE N'%' + @Search + '%')
-----------------------------------------------------
SET NOCOUNT OFF
END

