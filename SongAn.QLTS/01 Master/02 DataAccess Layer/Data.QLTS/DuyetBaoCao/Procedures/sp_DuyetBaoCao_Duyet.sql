ALTER PROC [dbo].[sp_DuyetBaoCao_Duyet]
( 
	  @LapBaoCaoId        nvarchar(500)	= null	
	, @DuyetId		    nvarchar(500)	= null		
	, @NgayDuyet		DATETIME		= null		
	, @NguoiDuyet		nvarchar(500)	= null		
	, @NoiDungDuyet		NVARCHAR(MAX)	= null	
	
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
Update LapBaoCao set DuyetId = @DuyetId, NgayDuyet= @NgayDuyet, NguoiDuyet = @NguoiDuyet, NoiDungDuyet=@NoiDungDuyet where LapBaoCaoId =  @LapBaoCaoId
Update LapBaoCaoChiTiet set DuyetId = @DuyetId where LapBaoCaoId =  @LapBaoCaoId
select * from LapBaoCao where  LapBaoCaoId =  @LapBaoCaoId
-----------------------------------------------------
SET NOCOUNT OFF
END

