/*************************************************************  
1. Create Date	: 2017.05.08
2. Creator		: Tran Quoc Hung
3. Description	: Lấy danh sách Tăng ca theo điều kiện
4. Function		: QLDNMAIN/BangLuong/List
5. Example		: 
					exec [sp_BangLuong_GetListBangLuongByCriteria]
					@MA_FORM = ''
					,@FIELD = NULL
					, @SEARCH_STRING =''
					, @TAN_SUAT ='ALL|THANG|QUY|NAM'
					, @TRANG_THAI ='ALL|BL_KN'
					, @NGAY_BAT_DAU = '20170402'
					, @NGAY_KET_THUC = ''
		 
					, @ORDER_CLAUSE = NULL

					, @SKIP = 0
					, @TAKE =10

6. Precaution	:
7. History		:
				  2017.05.08(Tran Quoc Hung) - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_BangLuong_GetListBangLuongByCriteria]
( 
	@MA_FORM			varchar(6)		= null			-- Mã Form

	, @FIELD			nvarchar(500)	= null			-- Danh sách các field cần lấy

	, @SEARCH_STRING	nvarchar(500)	= null			-- Chuỗi QUICK SEARCH
	, @TAN_SUAT			nvarchar(500)	= null			-- Tần suất trả lương . VD: 'ALL|THANG|QUY|NAM'
	, @TRANG_THAI		varchar(20)		= null			-- Trạng thái. VD: ALL|BL_KN
	, @NGAY_BAT_DAU		varchar(8)		= null			-- Ngày bắt đầu. VD: 20170417
	, @NGAY_KET_THUC	varchar(8)		= null			-- Ngày kết thúc. VD: 20170517
	, @XOA_YN			char(1)			= 'N'			-- Xóa YN
		
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

	-- Chuẩn bị biến @MA_FORM
	SET @MA_FORM = ISNULL(@MA_FORM,'')
	----------

	-- Chuẩn bị biến @FIELD
	SET @FIELD = ISNULL(@FIELD,'*')

	IF (@FIELD = '')
		SET @FIELD = '*';
	----------

	-- Chuẩn bị biến @SEARCH_STRING
	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%';
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	;
	END	
	----------

	-- Chuẩn bị biến đầu vào khác
	SET @NGAY_BAT_DAU = ISNULL(@NGAY_BAT_DAU,'');
	SET @NGAY_KET_THUC = ISNULL(@NGAY_KET_THUC,'');
	SET @TAN_SUAT = ISNULL(@TAN_SUAT,'');
	IF (@TAN_SUAT = '')
		SET @TAN_SUAT = 'ALL';
	SET @TRANG_THAI = ISNULL(@TRANG_THAI,'');
	IF (@TRANG_THAI = '')
		SET @TRANG_THAI = 'ALL';

	SET @XOA_YN = ISNULL(@XOA_YN,'');
	IF (@XOA_YN = '')
		SET @XOA_YN = 'N';

	-- Chuẩn bị biến @V_WHERE_CLAUSE
	SET @V_WHERE_CLAUSE = N' 1=1 ';

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@ORDER_CLAUSE IS NULL)
		SET @ORDER_CLAUSE = '';

	IF (@ORDER_CLAUSE = '')
		SET @ORDER_CLAUSE = ' BL_NGAYTAO DESC ';
	----------
   
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, BL.TenBangLuong, BL.TanSuatTraLuong, (CONVERT(VARCHAR(10),BL.NgayBatDau,103) + '' ~ '' + CONVERT(VARCHAR(10),BL.NgayKetThuc,103)) AS ThoiGianPhatSinh , BL.SoNguoi, '''' AS TinhToan, CONVERT(VARCHAR(10),BL.NgayTraLuong,103) AS NgayTraLuong, TT.TrangThai, '''' AS Xoa ,BL.MaTrangThai, BL.BangLuongId AS ID, BL.NgayTao AS BL_NGAYTAO,BL.CTRVERSION 
	FROM BangLuong BL WITH(NOLOCK, READUNCOMMITTED) 
	LEFT JOIN TrangThai TT WITH(NOLOCK, READUNCOMMITTED) ON BL.MaTrangThai = TT.MaTrangThai ';

	-- Build Where clause
	-- Where clause Quick search
	IF @SEARCH_STRING <> ''
	BEGIN
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + N' AND (NV.TenBangLuong LIKE '''+ @V_SEARCH_STRING + ''') ';
	END

	-- Where clause filter Loai
	IF @TAN_SUAT  <> 'ALL'
	BEGIN 
	IF CHARINDEX('|', @TAN_SUAT) > 0
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND CHARINDEX(''|'' + BL.TanSuatTraLuong + ''|'', ''|'' + ''' + @TAN_SUAT + ''' + ''|'') > 0 ';
	ELSE 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND BL.TanSuatTraLuong=''' + @TAN_SUAT + ''' ';
	END

	-- Where clause filter Trang Thai
	IF @TRANG_THAI <> 'ALL'
	BEGIN 
	IF CHARINDEX('|', @TRANG_THAI) > 0
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND CHARINDEX(''|'' + BL.MaTrangThai + ''|'', ''|'' + ''' + @TRANG_THAI + ''' + ''|'') > 0 ';
	ELSE 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND BL.MaTrangThai =''' + @TRANG_THAI + ''' ';
	END

	-- Where clause filter Ngay Bat dau & Ngay Ket Thuc
	IF @NGAY_BAT_DAU <> '' AND @NGAY_KET_THUC <> ''
	BEGIN 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (BL.ThangNam BETWEEN  ''' + @NGAY_BAT_DAU + ''' AND '''+ @NGAY_KET_THUC + ''') ';
	END
	ELSE IF @NGAY_BAT_DAU <> ''
	BEGIN
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (BL.ThangNam >=  ''' + @NGAY_BAT_DAU + ''') ';
	END
	ELSE IF @NGAY_KET_THUC <> ''
	BEGIN
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (BL.ThangNam <=  ''' + @NGAY_KET_THUC + ''')  ';
	END

	IF @V_WHERE_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE
						+ ' AND BL.XoaYN = ''' + @XOA_YN +''' ';

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

