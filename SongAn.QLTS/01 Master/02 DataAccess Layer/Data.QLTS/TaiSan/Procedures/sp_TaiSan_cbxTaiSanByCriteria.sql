/**************************************************
1. Create Date	: 2017.09.01
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÔNG TIN TÀI SẢN
4. Function		: 
5. Example		: 
					EXEC [sp_TaiSan_cbxTaiSanByCriteria]
						 @Search			=	N''
						,@TaiSanId			=	N''
						,@MaTaiSan			=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
6. Precaution	:
7. History		:
				  2017.09.01 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_TaiSan_cbxTaiSanByCriteria]
( 
	 @Search			NVARCHAR(500)   =	NULL
	,@TaiSanId			NVARCHAR(500)	=	NULL
	,@MaTaiSan			NVARCHAR(500)   =	NULL
	,@LoaiKeKhai		NVARCHAR(500)   =	NULL
	,@CoSoId	        NVARCHAR(500)	=	NULL
	,@NhanVienId	    NVARCHAR(500)	=	NULL
	
)
AS  
BEGIN
SET NOCOUNT ON 
	SET @Search = ISNULL(@Search,'')
	SET @TaiSanId = ISNULL(@TaiSanId, '')
	SET @MaTaiSan = ISNULL(@MaTaiSan,'')
	SET @LoaiKeKhai = ISNULL(@LoaiKeKhai,'')

	SELECT		TS.*,ISNULL(NG.NguyenGia,0) NguyenGia
	FROM		(	SELECT		TOP 10 _TS.TaiSanId, ISNULL(SUM(_NG.GiaTri),0) NguyenGia
					FROM		TaiSan _TS 
								LEFT JOIN NguyenGia _NG ON _TS.TaiSanId = _NG.TaiSanId
					WHERE		_TS.CoSoId = @CoSoId
								AND (@Search = '' OR _TS.MaTaiSan LIKE N'%' + @Search + '%' OR _TS.TenTaiSan LIKE N'%' + @Search + '%')
								AND (@TaiSanId = '' OR CHARINDEX('|' + CAST(_TS.TaiSanId AS VARCHAR(10)) + '|','|' + @TaiSanId + '|') > 0)
								AND (@MaTaiSan = '' OR CHARINDEX('|' + _TS.MaTaiSan + '|','|' + @MaTaiSan + '|') > 0)
								AND (@LoaiKeKhai = '' OR CHARINDEX('|' + CAST(_TS.LoaiKeKhai AS VARCHAR(10)) + '|','|' + @LoaiKeKhai + '|') > 0)
					GROUP BY	_TS.TaiSanId
				) NG
				LEFT JOIN TaiSan TS ON  TS.TaiSanId = NG.TaiSanId

SET NOCOUNT OFF
END

