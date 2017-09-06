/*************************************************************  
1. Create Date	: 2017.04.15
2. Creator		: Tran Quoc Hung
3. Description	: Lấy danh sách Nghỉ phép theo điều kiện
4. Function		: QLDNMAIN/NghiPhep/List
5. Example		: 
					exec [sp_NghiPhep_GetListNghiPhepByCriteria]  
					@MA_FORM = 'FL0002'
					,@FIELD = NULL
					, @SEARCH_STRING =''
					, @LOAI_PHEP ='PHEPNAM|THAISAN'
					, @NGUOI_DUYET ='2|1'
					, @TRANG_THAI ='ALL'
					, @NGAY_BAT_DAU = '20170402'
					, @NGAY_KET_THUC = ''
		 
					, @ORDER_CLAUSE = NULL

					, @SKIP = 0
					, @TAKE =10

6. Precaution	:
7. History		:
				  2017.04.15(Tran Quoc Hung) - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_NghiPhep_GetListNghiPhepByCriteria]
( 
	@MA_FORM			varchar(6)		= null			-- Mã Form

	, @FIELD			nvarchar(500)	= null			-- Danh sách các field cần lấy

	, @SEARCH_STRING	nvarchar(500)	= null			-- Chuỗi QUICK SEARCH
	, @LOAI_PHEP		nvarchar(500)	= null			-- Loại phép ID. VD: 1|2|3
	, @NGUOI_DUYET		nvarchar(500)	= null			-- Người duyệt ID. VD: 22,44
	, @TRANG_THAI		varchar(20)		= null			-- Trạng thái ID. VD: 0: ALL|DY|DD
	, @NGAY_BAT_DAU		varchar(8)		= null			-- Ngày bắt đầu. VD: 20170417
	, @NGAY_KET_THUC	varchar(8)		= null			-- Ngày kết thúc. VD: 20170517
		
	, @ORDER_CLAUSE		nvarchar(500)	= null			-- Mệnh đề order by (VD: NhanVienId ASC|DESC,HoTen ASC|DESC)

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
	SET @LOAI_PHEP = ISNULL(@LOAI_PHEP,'');
	SET @NGUOI_DUYET = ISNULL(@NGUOI_DUYET,'');
	SET @TRANG_THAI = ISNULL(@TRANG_THAI,'ALL');
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
		SET @ORDER_CLAUSE = ' NP_NGAYTAO DESC ';
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

		IF (@ORDER_CLAUSE = ' NP_NGAYTAO DESC ' AND @V_ORDER_CLAUSE <> '')
		BEGIN
			SET @ORDER_CLAUSE = @V_ORDER_CLAUSE;
		END
	END

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, ' + @FIELD + ' ,NP.NghiPhepId AS NP_ID, NP.NgayTao AS NP_NGAYTAO, NP.CTRVERSION
	FROM NghiPhep NP WITH(NOLOCK, READUNCOMMITTED) 
	LEFT JOIN NhanVien NV WITH(NOLOCK, READUNCOMMITTED) ON NP.NhanVienId = NV.NhanVienId
	LEFT JOIN NhanVien NV_DUYET WITH(NOLOCK, READUNCOMMITTED) ON NP.NguoiDuyet = NV_DUYET.NhanVienId
	LEFT JOIN NhanVien NV_BANGIAO WITH(NOLOCK, READUNCOMMITTED) ON NP.NguoiBanGiao = NV_BANGIAO.NhanVienId
	LEFT JOIN NhanVien NV_TAO WITH(NOLOCK, READUNCOMMITTED) ON NP.NguoiTao = NV_TAO.NhanVienId
	LEFT JOIN LoaiNghiPhep LNP WITH(NOLOCK, READUNCOMMITTED) ON NP.MaLoaiNghiPhep = LNP.MaLoaiNghiPhep
	LEFT JOIN TrangThai TT WITH(NOLOCK, READUNCOMMITTED) ON NP.MaTrangThai = TT.MaTrangThai ';

	-- Build Where clause
	-- Where clause Quick search
	IF @SEARCH_STRING <> ''
	BEGIN
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + N' AND (NV.Ma LIKE '''+ @V_SEARCH_STRING + ''' OR NV.Ho LIKE N'''+ @SEARCH_STRING + N''' OR NV.Ho LIKE ''' + @V_SEARCH_STRING + ''' OR NV.Ten LIKE '''+ @SEARCH_STRING + ''' OR NV.Ten LIKE '''+ @V_SEARCH_STRING + ''') ';
	END

	-- Where clause filter Loai Phep
	IF @LOAI_PHEP <> ''
	BEGIN 
	IF CHARINDEX('|', @LOAI_PHEP) > 0
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND CHARINDEX(''|'' + NP.MaLoaiNghiPhep+ ''|'', ''|'' + ''' + @LOAI_PHEP + ''' + ''|'') > 0 ';
	ELSE 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND NP.MaLoaiNghiPhep=''' + @LOAI_PHEP + ''' ';
	END

	-- Where clause filter Nguoi Duyet
	IF @NGUOI_DUYET <> ''
	BEGIN 
	IF CHARINDEX('|', @NGUOI_DUYET) > 0
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND CHARINDEX(''|'' + CAST(NP.NguoiDuyet AS VARCHAR(20)) + ''|'', ''|'' + ''' + @NGUOI_DUYET + ''' + ''|'') > 0 ';
	ELSE 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND NP.NguoiDuyet =''' + @NGUOI_DUYET + ''' ';
	END

	-- Where clause filter Trang Thai
	IF @TRANG_THAI <> 'ALL'
	BEGIN 
	IF CHARINDEX('|', @TRANG_THAI) > 0
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND CHARINDEX(''|'' + NP.MaTrangThai + ''|'', ''|'' + ''' + @TRANG_THAI + ''' + ''|'') > 0 ';
	ELSE 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND NP.MaTrangThai =''' + @TRANG_THAI + ''' ';
	END

	-- Where clause filter Ngay Bat dau & Ngay Ket Thuc
	IF @NGAY_BAT_DAU <> '' AND @NGAY_KET_THUC <> ''
	BEGIN 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND ((NP.TuNgay BETWEEN  ''' + @NGAY_BAT_DAU + ''' AND '''+ @NGAY_KET_THUC + ''') 
														OR (NP.DenNgay BETWEEN  ''' + @NGAY_BAT_DAU + ''' AND '''+ @NGAY_KET_THUC + ''')) ';
	END
	ELSE IF @NGAY_BAT_DAU <> ''
	BEGIN
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND ((NP.TuNgay >=  ''' + @NGAY_BAT_DAU + ''') 
													OR (NP.DenNgay >=  ''' + @NGAY_BAT_DAU + ''')) ';
	END
	ELSE IF @NGAY_KET_THUC <> ''
	BEGIN
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND ((NP.TuNgay <=  ''' + @NGAY_KET_THUC + ''') 
													OR (NP.DenNgay <=  ''' + @NGAY_KET_THUC + ''')) ';
	END

	IF @V_WHERE_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE
						+ ' AND NP.XoaYN = ''N'' ';

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

