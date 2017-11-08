ALTER PROC [dbo].[sp_DuyetCap_DuyetChiTiet]
( 
	  @DeNghiChiTietId  nvarchar(500)	= null	
	, @DeNghiId	        nvarchar(500)	= null	
	, @DuyetId		    nvarchar(500)	= null		
	
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
Update DeNghiTrangCapChiTiet set DuyetId = @DuyetId where DeNghiId =  @DeNghiId and DeNghiChiTietId = @DeNghiChiTietId
declare @check int = 0;
set @check = (select count(*) from DeNghiTrangCapChiTiet where  DeNghiId =  @DeNghiId  and (DuyetId not in (1,2)  or DuyetId is null))
if(@check = 0)
begin
	declare @Duyet int = 0;
	set @Duyet = (select count(*) from DeNghiTrangCapChiTiet where  DeNghiId =  @DeNghiId  and DuyetId  = 1 )
	if(@Duyet> 0 )
	Update DeNghiTrangCap set DuyetId = 1 where DeNghiId =  @DeNghiId 
	else 
	Update DeNghiTrangCap set DuyetId = 2 where DeNghiId =  @DeNghiId 
end
select ISNULL(DuyetId,0) as DuyetId  from DeNghiTrangCap where  DeNghiId =  @DeNghiId 
-----------------------------------------------------
SET NOCOUNT OFF
END

