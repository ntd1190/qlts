USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_BienBanKiemKe_GetListBienBanKiemKeById]    Script Date: 9/19/2017 10:31:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROC [dbo].[sp_BienBanKiemKe_GetListBienBanKiemKeById]
( 
	@BienBanKiemKeId INT
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  

	SELECT	H.BienBanKiemKeId,
			H.SoChungTu, 
			CONVERT(VARCHAR, H.NgayChungTu, 103)NgayChungTu,
			CONVERT(VARCHAR, H.NgayKiemKe, 103)NgayKiemKe,
			H.PhongBanId, 
			PB.TenPhongBan, 
			H.GhiChu, 
			H.NguoiTao, 
			nd.HoTen TenNguoiTao,
			H.NgayTao
	FROM dbo.BienBanKiemKe H
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = H.PhongBanId
	LEFT JOIN QLTS_MAIN.dbo.NguoiDung nd ON nd.NhanVienId = h.NguoiTao
	WHERE H.BienBanKiemKeId = @BienBanKiemKeId

-----------------------------------------------------
SET NOCOUNT OFF
END