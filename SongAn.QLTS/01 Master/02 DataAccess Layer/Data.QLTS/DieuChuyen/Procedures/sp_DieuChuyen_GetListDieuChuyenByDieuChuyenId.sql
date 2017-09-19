USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_DieuChuyen_GetListDieuChuyenByDieuChuyenId]    Script Date: 9/19/2017 10:34:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROC [dbo].[sp_DieuChuyen_GetListDieuChuyenByDieuChuyenId]
( 
	@DieuChuyenId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	SELECT H.DieuChuyenId,
			H.SoChungTu,
			CONVERT(VARCHAR, H.NgayChungTu,103)NgayChungTu,
			CONVERT(VARCHAR, H.NgayDieuChuyen,103)NgayDieuChuyen,
			H.GhiChu
	FROM dbo.DieuChuyen H
	WHERE H.DieuChuyenId = @DieuChuyenId

-----------------------------------------------------
SET NOCOUNT OFF
END
