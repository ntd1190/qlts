ALTER PROC [dbo].[sp_DuyetMua_DuyetChiTiet]
( 
	  @MuaSamChiTietId  nvarchar(500)	= null	
	, @MuaSamId	        nvarchar(500)	= null	
	, @DuyetId		    nvarchar(500)	= null		
	
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
Update KeHoachMuaSamChiTiet set DuyetId = @DuyetId where MuaSamId =  @MuaSamId and MuaSamChiTietId = @MuaSamChiTietId
declare @check int = 0;
set @check = (select COUNT(*) from KeHoachMuaSamChiTiet where  MuaSamId =  @MuaSamId  and (DuyetId not in (1,2) or DuyetId is null))
if(@check = 0)
begin
	declare @Duyet int = 0;
	set @Duyet = (select count(*) from KeHoachMuaSamChiTiet where  MuaSamId =  @MuaSamId  and DuyetId  = 1 )
	if(@Duyet> 0 )
	Update KeHoachMuaSam set DuyetId = 1 where MuaSamId =  @MuaSamId 
	else 
	Update KeHoachMuaSam set DuyetId = 2 where MuaSamId =  @MuaSamId 
end
select ISNULL(DuyetId,0) as DuyetId  from KeHoachMuaSam where  MuaSamId =  @MuaSamId 
-----------------------------------------------------
SET NOCOUNT OFF
END

