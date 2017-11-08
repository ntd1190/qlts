

ALTER PROC [dbo].[sp_KeHoachMuaSam_DeleteKeHoachMuaSamById]
( 
	  @MuaSamId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	Delete KeHoachMuaSamChiTiet where MuaSamId = @MuaSamId
	Delete KeHoachMuaSam where MuaSamId = @MuaSamId
	select @@ROWCOUNT
-----------------------------------------------------
SET NOCOUNT OFF
END

