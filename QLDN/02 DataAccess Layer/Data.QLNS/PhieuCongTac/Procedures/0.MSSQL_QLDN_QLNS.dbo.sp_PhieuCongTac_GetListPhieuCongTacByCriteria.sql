/*************************************************************  
1. Create Date	: 2017.05.05
2. Creator		: NGUYEN THANH BINH
3. Description	: Lấy danh sách phiếu công tác theo điều kiện
4. Function		: QLDNMAIN/nhanvien/List
5. Example		: 
					--∬
					exec [sp_PhieuCongTac_GetListPhieuCongTacByCriteria]
					  @FIELD			='PCT.NoiDung,PCT.NgayDi,PCT.NgayVe,PCT.SoNgay,PCT.MaTrangThai,TT.TrangThai'
					, @SEARCH_STRING	= ''
					, @NGUOI_DUYET_IDS	= ''
					, @START_DATE		= ''
					, @END_DATE			= ''
					, @MA_TRANG_THAI	= ''
					, @XOA				= ''
					, @LOGIN_ID			= '1'
					, @ORDER_CLAUSE		= 'ThanhToan desc'
					, @SKIP				= 0
					, @TAKE				= 50

6. Precaution	:
7. History		:
				  2017.05.05(Nguyen Thanh Binh) - Tạo mới
				  2017.05.09(Nguyen Thanh Binh) - thêm điều kiện tìm kiếm
				  2017.05.22(Nguyen Thanh Binh) - update sp
*************************************************************/
ALTER PROC [dbo].[sp_PhieuCongTac_GetListPhieuCongTacByCriteria]
( 
	  @FIELD				nvarchar(500)	= null			-- Danh sách các field cần lấy
	, @SEARCH_STRING		nvarchar(500)	= null			-- quick search.
	, @NGUOI_DUYET_IDS		nvarchar(500)	= null			-- lọc theo người duyệt.
	, @START_DATE			nvarchar(500)	= null			-- ngày bắt đầu.
	, @END_DATE				nvarchar(500)	= null			-- ngày kết thúc.
	, @MA_TRANG_THAI		nvarchar(500)	= null			-- mã trạng thái.
	, @XOA					nvarchar(500)	= null			-- xóa.
	, @LOGIN_ID				nvarchar(500)	= null			-- ID  nhân viên đăng nhập.
	, @ORDER_CLAUSE			nvarchar(500)	= null			-- Mệnh đề order by
	, @SKIP					int				= null			-- Số dòng skip (phân trang)
	, @TAKE					int				= null			-- Số dòng take (phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL				NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING	NVARCHAR(4000) 
	DECLARE @V_WHERE_CLAUSE		NVARCHAR(4000) 
	DECLARE @V_GROUP_BY			NVARCHAR(4000)
	DECLARE @V_ORDER_CLAUSE		NVARCHAR(4000)

	-- Chuẩn bị biến @FIELD
	SET @FIELD = ISNULL(@FIELD, '');
	IF (@FIELD = '')
		SET @FIELD = ' PCT.NoiDung ';

	-- Chuẩn bị biến @SEARCH_STRING
	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	

	SET @NGUOI_DUYET_IDS = ISNULL(@NGUOI_DUYET_IDS, '')
	SET @MA_TRANG_THAI = ISNULL(@MA_TRANG_THAI, '')
	SET @XOA = ISNULL(@XOA, '')
	----------

	------ Check User has ViewAll whether or not
    DECLARE @IS_VIEW_ALL varchar = '0'
 
  	exec MSSQL_QLDN_MAIN.dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGIN_ID = @LOGIN_ID,
		@CHUC_NANG = 'CN0007',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

		print '@IS_VIEW_ALL:'+@IS_VIEW_ALL
  ---------------------------------------------------

	SET @V_WHERE_CLAUSE = N' 1=1 ';

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	SET @ORDER_CLAUSE = ISNULL(@ORDER_CLAUSE,'');
	IF (@ORDER_CLAUSE = '')
		SET @ORDER_CLAUSE = ' PhieuCongTacId ';
	----------

    
---- Xây dựng nội dung câu SQL  

	-- Where clause Quick search
	IF @SEARCH_STRING <> ''
	BEGIN
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + N' AND (PCT_INNER.NoiDung LIKE N''' + @SEARCH_STRING + N''' OR PCT_INNER.NoiDung LIKE ''' + @V_SEARCH_STRING + ''') '
	END
	
	-- Where clause @NGUOI_DUYET_IDS
	IF @NGUOI_DUYET_IDS <> ''
	BEGIN
	IF CHARINDEX('|', @NGUOI_DUYET_IDS) > 0
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND CHARINDEX(''|'' + CAST(PCT_INNER.NguoiDuyet AS VARCHAR(20)) + ''|'', ''|'' + ''' + @NGUOI_DUYET_IDS + ''' + ''|'') > 0 ';
	ELSE 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND PCT_INNER.NguoiDuyet=' + @NGUOI_DUYET_IDS + ' ';
	END

	-- Where clause @MA_TRANG_THAI
	IF @MA_TRANG_THAI <> ''
	BEGIN
	IF CHARINDEX('|', @MA_TRANG_THAI) > 0
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND CHARINDEX(''|'' + CAST(PCT_INNER.MaTrangThai AS VARCHAR(20)) + ''|'', ''|'' + ''' + @MA_TRANG_THAI + ''' + ''|'') > 0 ';
	ELSE 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND PCT_INNER.MaTrangThai=''' + @MA_TRANG_THAI + ''' ';
	END

	-- Where clause @XOA
	IF @XOA <> ''
	BEGIN
	IF @XOA <> ''
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND PCT_INNER.XoaYN=''' + @XOA + ''' ';
	END

	-- Where clause filter Ngay Bat dau & Ngay Ket Thuc
	IF @START_DATE <> '' AND @END_DATE <> ''
	BEGIN 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND ((PCT_INNER.NgayDi BETWEEN  ''' + @START_DATE + ''' AND '''+ @END_DATE + ''') 
														OR (PCT_INNER.NgayVe BETWEEN  ''' + @START_DATE + ''' AND '''+ @END_DATE + ''')) ';
	END
	ELSE IF @START_DATE <> ''
	BEGIN
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND ((PCT_INNER.NgayDi >=  ''' + @START_DATE + ''') 
													OR (PCT_INNER.NgayVe >=  ''' + @START_DATE + ''')) ';
	END
	ELSE IF @END_DATE <> ''
	BEGIN
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND ((PCT_INNER.NgayDi <=  ''' + @END_DATE + ''') 
													OR (PCT_INNER.NgayVe <=  ''' + @END_DATE + ''')) ';
	END

	-- VIEW 
	IF @IS_VIEW_ALL = '0' 
	BEGIN		
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (PCT_INNER.NguoiTao =''' + @LOGIN_ID + ''' OR PCT_INNER.NhanVienId =''' + @LOGIN_ID + ''' )';
	END

	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT TABLEA.MAXCNT,PCT.PhieuCongTacId PCT_ID,PCT.CtrVersion PCT_CTRVERSION,TABLEA.YeuCauThanhToan, ISNULL(PCT.ThanhToan,0) AS ThanhToan,
	' + @FIELD + ' 
	 FROM(SELECT COUNT(*) OVER () MAXCNT
		, ISNULL( SUM(PCT_CT.DonGia * PCT_CT.SoLuong), 0)  YeuCauThanhToan
		, PCT_INNER.PhieuCongTacId
		FROM PhieuCongTac PCT_INNER WITH(NOLOCK, READUNCOMMITTED)
	
		LEFT JOIN PhieuCongTacChiTiet PCT_CT WITH(NOLOCK, READUNCOMMITTED) on PCT_INNER.PhieuCongTacId = PCT_CT.PhieuCongTacId
		 WHERE ' + @V_WHERE_CLAUSE + ' 
		 GROUP BY  PCT_INNER.PhieuCongTacId
		 ) AS TABLEA
		LEFT JOIN PhieuCongTac PCT WITH(NOLOCK, READUNCOMMITTED) ON TABLEA.PhieuCongTacId = PCT.PhieuCongTacId
		LEFT JOIN TrangThai TT WITH(NOLOCK, READUNCOMMITTED) on PCT.MaTrangThai = TT.MaTrangThai
		LEFT JOIN NhanVien NV WITH(NOLOCK, READUNCOMMITTED) ON PCT.NhanVienId = NV.NhanVienId
		LEFT JOIN NhanVien NV_DUYET WITH(NOLOCK, READUNCOMMITTED) ON PCT.NguoiDuyet = NV_DUYET.NhanVienId
		LEFT JOIN NhanVien NV_TAO WITH(NOLOCK, READUNCOMMITTED) ON PCT.NguoiTao = NV_TAO.NhanVienId	
		ORDER BY  ' + @ORDER_CLAUSE + '  OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS FETCH NEXT ' + CAST(@Take AS nvarchar(20)) +' ROWS ONLY
	'

---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

