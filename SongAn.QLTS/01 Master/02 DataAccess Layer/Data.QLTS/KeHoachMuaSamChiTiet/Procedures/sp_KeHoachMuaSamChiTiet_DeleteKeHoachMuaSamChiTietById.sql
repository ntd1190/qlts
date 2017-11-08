

ALTER PROC [dbo].[sp_KeHoachMuaSamChiTiet_DeleteKeHoachMuaSamChiTietById]
( 
	  @MuaSamId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	Delete KeHoachMuaSamChiTiet where MuaSamId = @MuaSamId
	select @@ROWCOUNT
-----------------------------------------------------
SET NOCOUNT OFF
END

