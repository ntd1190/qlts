USE [QLTS]
GO


ALTER PROC [dbo].[sp_KhoTonKho_DeleteKhoTonKho]
( 
	  @KhoTonKhoId	        nvarchar(500)	= null			

)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
	if(Exists(select * from KhoTonKho where KhoTonKhoId = @KhoTonKhoId and TrangThai=0 ))
		begin
		Delete KhoTonKhoChiTiet where KhoTonKhoId = @KhoTonKhoId
		Delete KhoTonKho where KhoTonKhoId = @KhoTonKhoId
		select @@ROWCOUNT
		end
	else
	BEGIN
		RAISERROR ('Số liệu đã khóa !', -- Message text.  
               16, -- Severity.  
               1 -- State.  
               );   RETURN
	END
-----------------------------------------------------
SET NOCOUNT OFF
END

