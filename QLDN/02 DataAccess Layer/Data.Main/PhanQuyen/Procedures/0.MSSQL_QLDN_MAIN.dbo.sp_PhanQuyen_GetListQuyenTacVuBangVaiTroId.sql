/*************************************************************  
1. Create Date	: 2017.03.30
2. Creator		: Tran Quoc Hung
3. Description	: Lấy Quyền tác vụ theo MaChucNang và MaVaiTro
4. Function		: QLDNMAIN/NghiPhep/List
5. Example		: 
					exec [dbo].[sp_PhanQuyen_GetListQuyenTacVuBangVaiTroId]
					@VAITROID = 1
					
6. Precaution	:
7. History		:
				  2017.03.30(Tran Quoc Hung) - Tạo mới
*************************************************************/
CREATE PROC [dbo].[sp_PhanQuyen_GetListQuyenTacVuBangVaiTroId]
( 
	@VAITROID			int					-- VaiTroId
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước

   
---- Thực thi câu SQL
	SELECT 
	VT.VaiTroId
	,[MaVaiTro]
	,MaChucNang
	,QTV.DSQuyenTacVu
	FROM [dbo].[VaiTro] VT
	inner join [dbo].[QuyenTacVu] QTV on VT.VaiTroId = QTV.VaiTroId
	inner join [dbo].[ChucNang] CN on CN.ChucNangId = QTV.ChucNangId
	WHERE 
	VT.VaiTroId = @VaiTroId
	

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

