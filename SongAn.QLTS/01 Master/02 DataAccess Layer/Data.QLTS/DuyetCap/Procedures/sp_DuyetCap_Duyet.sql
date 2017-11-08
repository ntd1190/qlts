ALTER PROC [dbo].[sp_DuyetCap_Duyet]
( 
	  @DeNghiId	        nvarchar(500)	= null	
	, @DuyetId		    nvarchar(500)	= null		
	, @NgayDuyet		DATETIME		= null		
	, @NguoiDuyet		nvarchar(500)	= null		
	, @NoiDungDuyet		NVARCHAR(MAX)	= null	
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
Update DeNghiTrangCap set DuyetId = @DuyetId, NgayDuyet= @NgayDuyet, NguoiDuyet = @NguoiDuyet, NoiDungDuyet=@NoiDungDuyet where DeNghiId =  @DeNghiId
Update DeNghiTrangCapChiTiet set DuyetId = @DuyetId where DeNghiId =  @DeNghiId
select * from DeNghiTrangCap where  DeNghiId =  @DeNghiId
-----------------------------------------------------
SET NOCOUNT OFF
END

