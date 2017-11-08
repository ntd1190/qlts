USE [QLTS]
GO

/**************************************************
1. Create Date	: 2017.09.08
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_NuocSanXuat_cbxNuocSanXuatByCriteria]
						 @Search			=	N''
						,@NuocSanXuatId		=	N''
						,@MaNuocSanXuat		=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.08 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROC [dbo].[sp_NuocSanXuat_cbxNuocSanXuatByCriteria]
( 
	 @Search			NVARCHAR(500)   =	NULL
	,@NuocSanXuatId		INT				=	NULL
	,@MaNuocSanXuat		NVARCHAR(500)	=	NULL
	,@CoSoId			NVARCHAR(500)	=	NULL
	,@NhanVienId		NVARCHAR(500)	=	NULL
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	SET @Search				=	ISNULL(@Search,'')
	SET @NuocSanXuatId		=	ISNULL(@NuocSanXuatId, 0)
	SET @MaNuocSanXuat		=	ISNULL(@MaNuocSanXuat,'')

	SELECT TOP 10 NSX.*
	FROM	NuocSanXuat NSX
	WHERE	(@NuocSanXuatId = 0 OR NSX.NuocSanXuatId = @NuocSanXuatId)
			AND (@MaNuocSanXuat = '' OR NSX.MaNuocSanXuat = @MaNuocSanXuat)
			AND (@Search = '' OR NSX.MaNuocSanXuat LIKE N'%' + @Search + '%' OR NSX.TenNuocSanXuat LIKE N'%' + @Search + '%')
-----------------------------------------------------
SET NOCOUNT OFF
END

