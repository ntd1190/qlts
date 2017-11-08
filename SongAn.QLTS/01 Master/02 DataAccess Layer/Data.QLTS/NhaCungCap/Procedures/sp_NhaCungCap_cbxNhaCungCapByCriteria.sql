USE [QLTS]
GO

/**************************************************
1. Create Date	: 2017.09.08
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_NhaCungCap_cbxNhaCungCapByCriteria]
						 @Search			=	N''
						,@NhaCungCapId		=	N''
						,@MaNhaCungCap		=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.08 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROC [dbo].[sp_NhaCungCap_cbxNhaCungCapByCriteria]
( 
	 @Search			NVARCHAR(500)   =	NULL
	,@NhaCungCapId		VARCHAR(MAX)	=	NULL
	,@MaNhaCungCap		NVARCHAR(500)	=	NULL
	,@CoSoId			NVARCHAR(500)	=	NULL
	,@NhanVienId		NVARCHAR(500)	=	NULL
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	SET @Search				=	ISNULL(@Search,'')
	SET @NhaCungCapId		=	ISNULL(@NhaCungCapId, '')
	SET @MaNhaCungCap		=	ISNULL(@MaNhaCungCap,'')

	SELECT TOP 10 NCC.*
	FROM	NhaCungCap NCC
	WHERE	NCC.CoSoId = @CoSoId
			AND (@NhaCungCapId = '' OR NCC.NhaCungCapId = @NhaCungCapId)
			AND (@MaNhaCungCap = '' OR NCC.MaNhaCungCap = @MaNhaCungCap)
			AND (@Search = '' OR NCC.MaNhaCungCap LIKE N'%' + @Search + '%' OR NCC.TenNhaCungCap LIKE N'%' + @Search + '%')
-----------------------------------------------------
SET NOCOUNT OFF
END

