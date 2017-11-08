ALTER PROC [dbo].[sp_DuyetBaoCao_DuyetChiTiet]
( 
	  @LapBaoCaoId	        nvarchar(500)	= null	
	 ,@LapBaoCaoChiTietId   nvarchar(500)	= null
	 ,@DuyetId				nvarchar(500)	= null
	 ,@NgayDuyet		    nvarchar(500)	= null
	 ,@NoiDungDuyet			nvarchar(500)	= null
	
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
Update LapBaoCaoChiTiet set DuyetId = @DuyetId, NgayDuyet = @NgayDuyet,NoiDungDuyet = @NoiDungDuyet   where LapBaoCaoId =  @LapBaoCaoId and LapBaoCaoChiTietId = @LapBaoCaoChiTietId
declare @check int = 0;
set @check = (select count(*) from LapBaoCaoChiTiet where  LapBaoCaoId =  @LapBaoCaoId  and (DuyetId not in (1,2)  or DuyetId is null))
if(@check = 0)
begin
	declare @Duyet int = 0;
	set @Duyet = (select count(*) from LapBaoCaoChiTiet where  LapBaoCaoId =  @LapBaoCaoId  and DuyetId  = 1 )
	if(@Duyet> 0 )
	Update LapBaoCao set DuyetId = 1 where LapBaoCaoId =  @LapBaoCaoId 
	else 
	Update LapBaoCao set DuyetId = 2 where LapBaoCaoId =  @LapBaoCaoId 
end
select ISNULL(DuyetId,0) as DuyetId  from LapBaoCao where  LapBaoCaoId =  @LapBaoCaoId 
-----------------------------------------------------
SET NOCOUNT OFF
END

