/*************************************************************  
1. Create Date	: 2017.05.12
2. Creator		: Tran Quoc Hung
3. Description	: Lấy danh sách Bảng Lương Cá nhân theo điều kiện
4. Function		: QLDNMAIN/BangLuongCaNhan/List
5. Example		: 
					exec [sp_BangLuongCaNhan_GetListBangLuongCaNhanByCriteria]
					@BANGLUONG_ID = '13'
					, @NHANVIEN_ID = ''
					, @MA_TRANG_THAI = ''
					, @NGAY_BAT_DAU = '20170402'
					, @NGAY_KET_THUC = ''
					, @XOA_YN = 'N'
	 
					, @ORDER_CLAUSE = NULL

					, @SKIP = 0
					, @TAKE =100

6. Precaution	:
7. History		:
				  2017.05.12(Tran Quoc Hung) - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_BangLuongCaNhan_GetListBangLuongCaNhanByCriteria]
( 
	@BANGLUONG_ID			varchar(14)		= null			-- Mã Form
	,@NHANVIEN_ID			varchar(500)	= null			-- Mã Nhân vien
	,@MA_TRANG_THAI			varchar(14)		= null			-- Mã Trạng thái
	, @NGAY_BAT_DAU			varchar(8)		= null			-- Ngày bắt đầu. VD: 20170417
	, @NGAY_KET_THUC		varchar(8)		= null			-- Ngày kết thúc. VD: 20170517
	, @XOA_YN				char(1)			= 'N'			-- Xóa YN
		
	, @ORDER_CLAUSE		nvarchar(500)	= null			-- Mệnh đề order by (VD: Loai ASC|DESC,HoTen ASC|DESC)

	, @SKIP				int				= null			-- Số dòng skip (để phân trang)
	, @TAKE				int				= null			-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 
	DECLARE @V_WHERE_CLAUSE NVARCHAR(4000) 
	DECLARE @V_FIELD NVARCHAR(4000) = ''
	DECLARE @V_ORDER_CLAUSE NVARCHAR(4000) = ''

	-- Chuẩn bị biến @BANGLUONG_ID
	SET @BANGLUONG_ID = ISNULL(@BANGLUONG_ID,'')
	----------

	-- Chuẩn bị biến @NHANVIEN_ID
	SET @NHANVIEN_ID = ISNULL(@NHANVIEN_ID,'')
	----------

	-- Chuẩn bị biến @MA_TRANG_THAI
	SET @MA_TRANG_THAI = ISNULL(@MA_TRANG_THAI,'')
	----------

	SET @XOA_YN = ISNULL(@XOA_YN,'');
	IF (@XOA_YN = '')
		SET @XOA_YN = 'N';

	-- Chuẩn bị biến @V_WHERE_CLAUSE
	SET @V_WHERE_CLAUSE = N' 1=1 ';

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 100;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@ORDER_CLAUSE IS NULL)
		SET @ORDER_CLAUSE = '';

	IF (@ORDER_CLAUSE = '')
		SET @ORDER_CLAUSE = ' MaNhanVien ASC ';
	----------
   
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT
	, BLCN.*
	-- Tinh Toan Tru bảo hiểm
	, (	BLCN.TruBHXH	
		+ BLCN.TruBHYT		
		+ BLCN.TruBHTN	
	)
		AS TruBH
	-- Tinh Toan Tong Thu Nhap
	, (BLCN.LuongThang -- 8
		+ BLCN.TienCongTacPhi	-- 9
		+ BLCN.TienThuong		-- 10
		+ BLCN.TienDienThoai	-- 11
		+ BLCN.TienTrachNhiem	-- 12
		+ BLCN.TienCom			-- 13
		+ BLCN.TienTangCa		-- 16
	)
		AS TongThuNhap

	-- Tinh Toan cac khoan khau tru
	, (BLCN.TruBHXH			-- 18
		+ BLCN.TruBHYT			-- 19
		+ BLCN.TruBHTN			-- 20
		+ BLCN.TruCongDoan		-- 21
		+ BLCN.TruLuong			-- 22
		+ BLCN.TruTamUng		-- 24
	)
		AS CacKhoanKhauTru
	,BL.MaTrangThai
	,TT.TrangThai

	FROM BangLuongCaNhan BLCN WITH(NOLOCK, READUNCOMMITTED) 
	LEFT JOIN BangLuong BL WITH(NOLOCK, READUNCOMMITTED) ON BLCN.BangLuongId = BL.BangLuongId
	LEFT JOIN TrangThai TT WITH(NOLOCK, READUNCOMMITTED) ON BL.MaTrangThai = TT.MaTrangThai 
	';

	-- Build Where clause
	IF @BANGLUONG_ID > ''
	SET @V_WHERE_CLAUSE +=  ' AND BLCN.BangLuongId = '''+@BANGLUONG_ID+'''';

	-- Where clause filter Nhan Vine
	IF @NHANVIEN_ID > ''
	BEGIN 
	IF CHARINDEX('|', @NHANVIEN_ID) > 0
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND CHARINDEX(''|'' + CAST(BLCN.NhanVienId AS VARCHAR(14)) + ''|'', ''|'' + ''' + @NHANVIEN_ID + ''' + ''|'') > 0 ';
	ELSE 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND  CAST(BLCN.NhanVienId AS VARCHAR(14)) =''' + @NHANVIEN_ID + ''' ';
	END

	IF @MA_TRANG_THAI > ''
	SET @V_WHERE_CLAUSE +=  ' AND BL.MaTrangThai = '''+@MA_TRANG_THAI+'''';

	-- Where clause filter Ngay Bat dau & Ngay Ket Thuc
	IF @NGAY_BAT_DAU <> '' AND @NGAY_KET_THUC <> ''
	BEGIN 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (BLCN.NgayTao BETWEEN  ''' + @NGAY_BAT_DAU + ''' AND '''+ @NGAY_KET_THUC + ''') ';
	END
	ELSE IF @NGAY_BAT_DAU <> ''
	BEGIN
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (BLCN.NgayTao >=  ''' + @NGAY_BAT_DAU + ''') ';
	END
	ELSE IF @NGAY_KET_THUC <> ''
	BEGIN
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (BLCN.NgayTao <=  ''' + @NGAY_KET_THUC + ''')  ';
	END

	IF @V_WHERE_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE
						+ ' AND BLCN.XoaYN = ''' + @XOA_YN +''' ';

	-- Build Order clause
	IF @ORDER_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @ORDER_CLAUSE;

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@SKIP AS nvarchar(20)) +' ROWS';

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@TAKE AS nvarchar(20)) +' ROWS ONLY';

---- Thực thi câu SQL
	print(@V_SQL)
	EXEC(@V_SQL);

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

