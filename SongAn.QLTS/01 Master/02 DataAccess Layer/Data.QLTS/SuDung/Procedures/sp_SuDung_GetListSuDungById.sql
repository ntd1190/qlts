USE [QLTS]
GO



ALTER PROC [dbo].[sp_SuDung_GetListSuDungById]
( 
	@SuDungId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	
	SELECT H.SuDungId,
		   CAST(H.KyLap AS VARCHAR)KyLap,
		   H.Nam,
		   H.NoiDung,
		   H.NguoiTao,
		   NV.TenNhanVien TenNguoiTao,
		   H.NgayTao,
		   H.CtrVersion
	FROM dbo.SuDung H
	LEFT JOIN dbo.NhanVien NV ON NV.NhanVienId = h.NguoiTao
	WHERE H.SuDungId = @SuDungId

-----------------------------------------------------
SET NOCOUNT OFF
END