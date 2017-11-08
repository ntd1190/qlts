USE [QLTS]

GO
/**************************************************
1. Create Date	: 2017.09.08
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_LoaiTaiSan_cbxLoaiTaiSanByCriteria]
						 @Search			=	N''
						,@LoaiId			=	N''
						,@MaLoai			=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.08 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROC [dbo].[sp_LoaiTaiSan_cbxLoaiTaiSanByCriteria]
( 
	 @Search			NVARCHAR(500)   =	NULL
	,@LoaiId			INT				=	NULL
	,@MaLoai			NVARCHAR(500)	=	NULL
	,@CoSoId			NVARCHAR(500)	=	NULL
	,@NhanVienId		NVARCHAR(500)	=	NULL
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
	SET @Search				=	ISNULL(@Search,'')
	SET @LoaiId				=	ISNULL(@LoaiId, 0)
	SET @MaLoai				=	ISNULL(@MaLoai,'')

	SELECT TOP 10 LTS.*
	FROM	LoaiTaiSan LTS
	WHERE	(@LoaiId = 0 OR LTS.LoaiId = @LoaiId)
			AND (@MaLoai = '' OR LTS.MaLoai = @MaLoai)
			AND (@Search = '' OR LTS.MaLoai LIKE N'%' + @Search + '%' OR LTS.TenLoai LIKE N'%' + @Search + '%')
-----------------------------------------------------
SET NOCOUNT OFF
END

