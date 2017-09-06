/*************************************************************  
1. Create Date	: 2017.05.17
2. Creator		: NGUYEN THANH BINH
3. Description	: Lấy thông tin quá trình công tác của nhân viên
4. Function		: QLDNMAIN/nhanvien/edit
5. Example		: 
					--∬
					exec [sp_QuaTrinhCongTac_GetListQuaTrinhCongTacByCriteria]  
					  @NHAN_VIEN_ID				=		''
					  , @QUA_TRINH_CONG_TAC_ID	=		'1'

6. Precaution	:
7. History		:
				  2017.05.17(Nguyen Thanh Binh) - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_QuaTrinhCongTac_GetListQuaTrinhCongTacByCriteria]
(
	  @NHAN_VIEN_ID					nvarchar(500)	= null			-- nhân viên ID
	, @QUA_TRINH_CONG_TAC_ID		nvarchar(500)	= null			-- quá trình công tác id
	
	, @ORDER_CLAUSE					nvarchar(500)	= null			-- Mệnh đề order by (VD: NhanVienId ASC|DESC,HoTen ASC|DESC)
	, @SKIP							int				= null			-- Số dòng skip (để phân trang)
	, @TAKE							int				= null			-- Số dòng take (để phân trang)
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
	DECLARE @V_ORDER_CLAUSE		NVARCHAR(4000)

	-- Chuẩn bị biến @NHAN_VIEN_ID
	SET @NHAN_VIEN_ID = ISNULL(@NHAN_VIEN_ID, '');
	----------

	-- Chuẩn bị biến @QUA_TRINH_CONG_TAC_ID
	SET @QUA_TRINH_CONG_TAC_ID = ISNULL(@QUA_TRINH_CONG_TAC_ID, '');
	----------

	-- Chuẩn bị biến @SKIP & @TAKE
	SET @SKIP = ISNULL(@SKIP, '');
	IF (@SKIP = '')
		SET @SKIP = 0;

	SET @TAKE = ISNULL(@TAKE, '');
	IF (@TAKE = '')
		SET @TAKE = 50;
	----------
	
	-- Chuẩn bị biến @ORDER_CLAUSE
	SET @ORDER_CLAUSE = ISNULL(@ORDER_CLAUSE, '');
	IF (@ORDER_CLAUSE = '')
		SET @ORDER_CLAUSE = ' QTCT.TuNgay ';
	----------

	SET @V_WHERE_CLAUSE = 'NV.XoaYN=''N''';
    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
		SELECT COUNT(*) OVER () MAXCNT,QTCT.QuaTrinhCongTacId QTCT_ID,QTCT.CtrVersion QTCT_CTRVERSION,QTCT.*,NV.Ho HoNhanVien,NV.Ten TenNhanVien, CV.TenChucVu
		FROM QuaTrinhCongTac QTCT
		LEFT JOIN NhanVien NV ON QTCT.NhanVienId = NV.NhanVienId
		LEFT JOIN ChucVu CV ON QTCT.ChucVuId = CV.ChucVuId
	'

	-- Where clause @NHAN_VIEN_ID
	IF @NHAN_VIEN_ID <> ''
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + N' AND QTCT.NhanVienId = ''' + @NHAN_VIEN_ID + ''' '
	
	-- Where clause @NHAN_VIEN_ID
	IF @QUA_TRINH_CONG_TAC_ID <> ''
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + N' AND QTCT.QuaTrinhCongTacId = ''' + @QUA_TRINH_CONG_TAC_ID + ''' '

	-- Build Where clause
	IF @V_WHERE_CLAUSE <> ''
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE

	-- Build Order clause
	IF @ORDER_CLAUSE <> ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @ORDER_CLAUSE

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@SKIP AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@TAKE AS nvarchar(20)) +' ROWS ONLY'

---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

