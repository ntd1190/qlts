USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_GhiTang_GetListGhiTangByGhiTangId]    Script Date: 9/19/2017 10:37:45 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROC [dbo].[sp_GhiTang_GetListGhiTangByGhiTangId]
( 
	@GhiTangId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	
	SELECT H.GhiTangId,
			H.SoChungTu,
			CONVERT(VARCHAR, H.NgayChungTu,103)NgayChungTu,
			CONVERT(VARCHAR, H.NgayGhiTang,103)NgayGhiTang,
			H.NoiDung

	FROM dbo.GhiTang H
	WHERE H.GhiTangId = @GhiTangId

-----------------------------------------------------
SET NOCOUNT OFF
END
