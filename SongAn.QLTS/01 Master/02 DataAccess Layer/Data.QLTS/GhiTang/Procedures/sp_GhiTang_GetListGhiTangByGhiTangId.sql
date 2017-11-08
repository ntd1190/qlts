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
