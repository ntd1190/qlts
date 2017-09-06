/*************************************************************  
1. Create Date	: 2017.05.04
2. Creator		: Tran Quoc Hung
3. Description	: Lấy danh sách Tăng ca theo điều kiện
4. Function		: QLDNMAIN/TangCa/List
5. Example		: 
					exec [sp_TangCa_GetListTangCaByCriteria]
					@MA_FORM = 'FL0004'
					,@FIELD = NULL
					, @SEARCH_STRING =''
					, @LOAI ='ALL|l150|l200|l300'
					, @NGUOI_DUYET =''
					, @TRANG_THAI ='ALL|TC_DD'
					, @NGAY_BAT_DAU = '20170402'
					, @NGAY_KET_THUC = ''
		 
					, @ORDER_CLAUSE = NULL

					, @SKIP = 0
					, @TAKE =10

6. Precaution	:
7. History		:
				  2017.05.04(Tran Quoc Hung) - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_TangCa_GetListTangCaByCriteria]
( 
	@MA_FORM			varchar(6)		= null			-- Mã Form

	, @FIELD			nvarchar(500)	= null			-- Danh sách các field cần lấy

	, @SEARCH_STRING	nvarchar(500)	= null			-- Chuỗi QUICK SEARCH
	, @LOAI				nvarchar(500)	= null			-- Loại . VD: 'ALL|l150|l200|l300'
	, @NGUOI_DUYET		nvarchar(500)	= null			-- Người duyệt ID. VD: 22|44
	, @TRANG_THAI		varchar(20)		= null			-- Trạng thái ID. VD: 0: ALL|TC_DY|TC_DD
	, @NGAY_BAT_DAU		varchar(8)		= null			-- Ngày bắt đầu. VD: 20170417
	, @NGAY_KET_THUC	varchar(8)		= null			-- Ngày kết thúc. VD: 20170517
		
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
	SET @LOAI = ISNULL(@LOAI,'');
	IF (@LOAI = '')
		SET @LOAI = 'ALL';
	SET @NGUOI_DUYET = ISNULL(@NGUOI_DUYET,'');
	SET @TRANG_THAI = ISNULL(@TRANG_THAI,'');
	IF (@TRANG_THAI = '')
		SET @TRANG_THAI = 'ALL';

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
		SET @ORDER_CLAUSE = ' TC_NGAYTAO DESC ';
	----------

---- Gọi SP lấy thông tin Cấu Hình
	IF (@MA_FORM <> '')
	BEGIN
		exec MSSQL_QLDN_MAIN.dbo.[sp_CauHinhFormCot_GetInfoByMaForm]
		@MA_FORM = @MA_FORM,
		@FIELD = @V_FIELD OUTPUT,
		@ORDER_CLAUSE = @V_ORDER_CLAUSE OUTPUT;

		IF (@FIELD = '*' AND @V_FIELD <> '')
		BEGIN
			SET @FIELD = @V_FIELD;
		END

		IF (@ORDER_CLAUSE = ' TC_NGAYTAO DESC ' AND @V_ORDER_CLAUSE <> '')
		BEGIN
			SET @ORDER_CLAUSE = @V_ORDER_CLAUSE;
		END
	END

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, ' + @FIELD + ' ,TC.TangCaId AS ID, TC.NgayTao AS TC_NGAYTAO,TC.CTRVERSION 
	FROM TangCa TC WITH(NOLOCK, READUNCOMMITTED) 
	LEFT JOIN NhanVien NV WITH(NOLOCK, READUNCOMMITTED) ON TC.NhanVienId = NV.NhanVienId
	LEFT JOIN NhanVien NV_DUYET WITH(NOLOCK, READUNCOMMITTED) ON TC.NguoiDuyet = NV_DUYET.NhanVienId
	LEFT JOIN NhanVien NV_TAO WITH(NOLOCK, READUNCOMMITTED) ON TC.NguoiTao = NV_TAO.NhanVienId
	LEFT JOIN TrangThai TT WITH(NOLOCK, READUNCOMMITTED) ON TC.MaTrangThai = TT.MaTrangThai ';

	-- Build Where clause
	-- Where clause Quick search
	IF @SEARCH_STRING <> ''
	BEGIN
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + N' AND (NV.Ma LIKE '''+ @V_SEARCH_STRING + ''' OR NV.Ho LIKE N'''+ @SEARCH_STRING + N''' OR NV.Ho LIKE ''' + @V_SEARCH_STRING + ''' OR NV.Ten LIKE '''+ @SEARCH_STRING + ''' OR NV.Ten LIKE '''+ @V_SEARCH_STRING + ''') ';
	END

	-- Where clause filter Loai
	IF @LOAI  <> 'ALL'
	BEGIN 
	IF CHARINDEX('|', @LOAI) > 0
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND CHARINDEX(''|'' + TC.Loai+ ''|'', ''|'' + ''' + @LOAI + ''' + ''|'') > 0 ';
	ELSE 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND TC.Loai=''' + @LOAI + ''' ';
	END

	-- Where clause filter Nguoi Duyet
	IF @NGUOI_DUYET <> ''
	BEGIN 
	IF CHARINDEX('|', @NGUOI_DUYET) > 0
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND CHARINDEX(''|'' + CAST(TC.NguoiDuyet AS VARCHAR(20)) + ''|'', ''|'' + ''' + @NGUOI_DUYET + ''' + ''|'') > 0 ';
	ELSE 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND TC.NguoiDuyet =''' + @NGUOI_DUYET + ''' ';
	END

	-- Where clause filter Trang Thai
	IF @TRANG_THAI <> 'ALL'
	BEGIN 
	IF CHARINDEX('|', @TRANG_THAI) > 0
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND CHARINDEX(''|'' + TC.MaTrangThai + ''|'', ''|'' + ''' + @TRANG_THAI + ''' + ''|'') > 0 ';
	ELSE 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND TC.MaTrangThai =''' + @TRANG_THAI + ''' ';
	END

	-- Where clause filter Ngay Bat dau & Ngay Ket Thuc
	IF @NGAY_BAT_DAU <> '' AND @NGAY_KET_THUC <> ''
	BEGIN 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (TC.NgayTangCa BETWEEN  ''' + @NGAY_BAT_DAU + ''' AND '''+ @NGAY_KET_THUC + ''') ';
	END
	ELSE IF @NGAY_BAT_DAU <> ''
	BEGIN
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (TC.NgayTangCa >=  ''' + @NGAY_BAT_DAU + ''') ';
	END
	ELSE IF @NGAY_KET_THUC <> ''
	BEGIN
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (TC.NgayTangCa <=  ''' + @NGAY_KET_THUC + ''')  ';
	END

	IF @V_WHERE_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE
						+ ' AND TC.XoaYN = ''N'' ';

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

