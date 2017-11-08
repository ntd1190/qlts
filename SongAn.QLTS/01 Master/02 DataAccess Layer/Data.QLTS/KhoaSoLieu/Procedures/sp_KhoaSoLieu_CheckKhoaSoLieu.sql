USE [QLTS]

SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[sp_KhoaSoLieu_CheckKhoaSoLieu]
	@Nam			NVARCHAR(MAX)	=	NULL
	,@CoSoId			INT				=	NULL
AS  
BEGIN
SET NOCOUNT ON 
--------------------------------------------------
declare @TrangThai int = 0;
Select @TrangThai = TrangThai from KhoaSoLieu where nam=@Nam and CoSoId=@CoSoId
Select @TrangThai as TrangThai
--------------------------------------------------
SET NOCOUNT OFF
END
