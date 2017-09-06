/*************************************************************  
1. Create Date	: 2017.05.23
2. Creator		: NGUYEN THANH BINH
3. Description	: xóa bảo hiểm xã hội theo nhân viên id
4. Function		: QLDNMAIN/nhanvien/edit
5. Example		: 
					--∬
					exec [sp_BaoHiemXaHoi_DeleteBaoHiemXaHoiByNhanVienId]  
					    @NHAN_VIEN_ID			= '2'

6. Precaution	:
7. History		:
				  2017.05.23(Nguyen Thanh Binh) - Tạo mới
*************************************************************/

ALTER PROCEDURE [dbo].[sp_BaoHiemXaHoi_DeleteBaoHiemXaHoiByNhanVienId]
	@NHAN_VIEN_ID				INT		=	NULL
AS
-- delete all matching from the table
DELETE [dbo].BaoHiemXaHoi
WHERE 
NhanVienId = @NHAN_VIEN_ID
select @@ROWCOUNT AS AFFECTED
