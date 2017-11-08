USE [QLTS]
GO


ALTER PROC [dbo].[sp_LapBaoCao_GetListDMBaoCao]
(
	 @CoSoId	        int		
	, @NhanVienId	    int		
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  

	SELECT  * from BaoCao
-----------------------------------------------------
SET NOCOUNT OFF
END

