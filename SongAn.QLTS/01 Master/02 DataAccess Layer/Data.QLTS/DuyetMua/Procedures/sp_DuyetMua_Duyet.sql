ALTER PROC [dbo].[sp_DuyetMua_Duyet]
( 
	  @MuaSamId	        nvarchar(500)	= null	
	, @DuyetId		    nvarchar(500)	= null		
	, @NgayDuyet		DATETIME		= null		
	, @NguoiDuyet		nvarchar(500)	= null		
	, @NoiDungDuyet		NVARCHAR(MAX)	= null	
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
Update KeHoachMuaSam set DuyetId = @DuyetId, NgayDuyet= @NgayDuyet, NguoiDuyet = @NguoiDuyet, NoiDungDuyet=@NoiDungDuyet where MuaSamId =  @MuaSamId
Update KeHoachMuaSamChiTiet set DuyetId = @DuyetId where MuaSamId =  @MuaSamId
select * from KeHoachMuaSam where  MuaSamId =  @MuaSamId
-----------------------------------------------------
SET NOCOUNT OFF
END
