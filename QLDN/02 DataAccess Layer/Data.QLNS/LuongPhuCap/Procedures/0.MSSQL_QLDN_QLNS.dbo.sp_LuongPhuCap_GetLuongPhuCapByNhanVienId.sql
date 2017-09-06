/*************************************************************  
1. Create Date	: 2017.05.16
2. Creator		: NGUYEN THANH BINH
3. Description	: Lấy thông tin lương phụ cấp nhân viên
4. Function		: QLDNMAIN/nhanvien/edit
5. Example		: 
					--∬
					exec [sp_LuongPhuCap_GetLuongPhuCapByNhanVienId]  
					  @NHAN_VIEN_ID			=		'1'

6. Precaution	:
7. History		:
				  2017.05.16(Nguyen Thanh Binh) - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_LuongPhuCap_GetLuongPhuCapByNhanVienId]
(
	  @NHAN_VIEN_ID				nvarchar(500)	= null			-- nhân viên ID
)
AS  
BEGIN
SET NOCOUNT ON
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL				NVARCHAR(4000)
	DECLARE @V_WHERE_CLAUSE		NVARCHAR(4000)

	-- Chuẩn bị biến @FIELD
	SET @NHAN_VIEN_ID = ISNULL(@NHAN_VIEN_ID, '');
	IF @NHAN_VIEN_ID = ''
		SET @NHAN_VIEN_ID = '0'
	----------

	SET @V_WHERE_CLAUSE = @NHAN_VIEN_ID + '<> ''0''';

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
		SELECT COUNT(*) OVER () MAXCNT,LPC.NhanVienId LPC_ID,LPC.CtrVersion LPC_CTRVERSION,LPC.*
		FROM LuongPhuCap LPC
	'

	-- Where clause Quick search
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + N' AND LPC.NhanVienId = ''' + @NHAN_VIEN_ID + ''' '
	

	-- Build Where clause
	IF @V_WHERE_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE

---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

