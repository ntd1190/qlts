USE [QLTS]
GO

/**************************************************
1. Create Date	: 2017.10.16
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					EXEC [sp_NhanVien_cbxNhanVienByPhongBanId]
						 @CoSoId	        =	16
						,@NhanVienId	    =	10
						,@Search			=	NULL
						,@FunctionCode		=	'CN0024'
						,@PhongBanId		=	11
						,@IDNhanVien		=	NULL
6. Precaution	:
7. History		:
				  2017.10.16 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_NhanVien_cbxNhanVienByPhongBanId]
( 
	  @CoSoId	        nvarchar(500)	= null
	, @NhanVienId	    nvarchar(500)	= null
	, @Search			nvarchar(500)   = null
	, @FunctionCode		nvarchar(500)   = null
	, @PhongBanId		INT				= 0
	, @IDNhanVien		INT				= 0
	
)
AS  
BEGIN
SET NOCOUNT ON  
--------------------------------------------------  
SET @PhongBanId = ISNULL(@PhongBanId,0)
SET @IDNhanVien = ISNULL(@IDNhanVien,0)

PRINT CONCAT('@PhongBanId = ',@PhongBanId)

	SELECT a.NhanVienId,a.MaNhanVien,a.TenNhanVien,c.PhongBanId
	FROM NhanVien a  inner join dbo.PhongBanNhanVien c on a.NhanVienId=c.NhanVienId
	Where	(@PhongBanId = 0 OR c.PhongBanId = @PhongBanId)
			AND (@IDNhanVien = 0 OR a.NhanVienId = @IDNhanVien)

--------------------------------------------------
SET NOCOUNT OFF
END
