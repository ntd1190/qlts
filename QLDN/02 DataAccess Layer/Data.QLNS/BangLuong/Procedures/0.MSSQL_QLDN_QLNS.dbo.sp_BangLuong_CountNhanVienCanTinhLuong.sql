/*************************************************************  
1. Create Date	: 2017.05.18
2. Creator		: Tran Quoc Hung
3. Description	: Đếm số người cần tính lương
4. Function		: QLDNMAIN/BangLuong/list
5. Example		: 
					exec [sp_BangLuong_CountNhanVienCanTinhLuong]
6. Precaution	:
7. History		:
				  2017.05.18(Tran Quoc Hung) - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_BangLuong_CountNhanVienCanTinhLuong]

AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước


---- Thực thi câu SQL
		SELECT COUNT(*) AS SO_NHANVIEN_TINHLUONG
		FROM NHANVIEN NV  WITH(NOLOCK, READUNCOMMITTED) 
		WHERE
			NV.XoaYN = 'N'
			AND NV.MaTrangThai = 'NV_DL'

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

