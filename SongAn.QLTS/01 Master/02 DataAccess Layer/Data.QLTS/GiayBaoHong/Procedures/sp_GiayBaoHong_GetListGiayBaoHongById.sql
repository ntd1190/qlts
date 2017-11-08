ALTER PROC [dbo].[sp_GiayBaoHong_GetListGiayBaoHongById]
( 
	@GiayBaoHongId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	
	SELECT H.GiayBaoHongId,
			H.SoChungTu,
			CONVERT(VARCHAR, H.Ngay, 103)Ngay,
			CAST(H.PhongBanId AS VARCHAR)PhongBanId,
			PB.TenPhongBan,
			H.NoiDung
	FROM dbo.GiayBaoHong H 
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = h.PhongBanId
	WHERE H.GiayBaoHongId = @GiayBaoHongId

-----------------------------------------------------
SET NOCOUNT OFF
END
