/*************************************************************  
1. Create Date	: 2017.05.22
2. Creator		: NGUYEN THANH BINH
3. Description	: Lấy thông tin bảo hiểm xã hội của nhân viên
4. Function		: QLDNMAIN/nhanvien/edit
5. Example		: 
					--∬
					exec [sp_BaoHiemXaHoi_GetListBaoHiemXaHoiByCriteria]  
					    @FIELD						=	''
					  , @SEARCH_STRING				=	'trần'
					  , @NHAN_VIEN_ID				=	'2'
					  , @BHXH_ID					=	''
					  , @LOGIN_ID					=	''

6. Precaution	:
7. History		:
				  2017.05.22(Nguyen Thanh Binh) - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_BaoHiemXaHoi_GetListBaoHiemXaHoiByCriteria]
(
	  @FIELD						NVARCHAR(500)	= null			-- Danh sách các field cần lấy
	, @SEARCH_STRING				NVARCHAR(500)	= null			-- quick search.
	, @NHAN_VIEN_ID					NVARCHAR(500)	= null			-- nhân viên ID
	, @BHXH_ID						NVARCHAR(500)	= null			-- bảo hiểm xã hội id
	, @LOGIN_ID						NVARCHAR(500)	= null			-- nhân viên id login
	
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
	DECLARE @V_SEARCH_STRING	NVARCHAR(4000) 
	DECLARE @V_WHERE_CLAUSE		NVARCHAR(4000)
	DECLARE @V_ORDER_CLAUSE		NVARCHAR(4000)
	------------

	SET		@V_WHERE_CLAUSE		= N' 1=1 ';
	SET		@V_ORDER_CLAUSE		= ISNULL(@V_ORDER_CLAUSE,'');

	-- KIỂM TRA @SEARCH_STRING
	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	------------

	-- Chuẩn bị biến @NHAN_VIEN_ID
	SET @NHAN_VIEN_ID = ISNULL(@NHAN_VIEN_ID, '');
	IF (@NHAN_VIEN_ID = '')
		SET @NHAN_VIEN_ID = '0';
	----------

	-- Chuẩn bị biến @BHXH_ID
	SET @BHXH_ID = ISNULL(@BHXH_ID, '');
	IF (@BHXH_ID = '')
		SET @BHXH_ID = '0';
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
		SET @ORDER_CLAUSE = ' MAXCNT ';
	----------
    
	-- Chuẩn bị biến @FIELD
	SET @FIELD = ISNULL(@FIELD, '');
	IF (@FIELD = '')
		SET @FIELD = 'NV.NhanVienId,Ma,Ho,Ten';
	---------

---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
		SELECT COUNT(*) OVER () MAXCNT, BHXH.CtrVersion BHXH_CTRVERSION, BHXH.BaoHiemXaHoiId BHXH_ID, BHXH.*,NV.Ho, NV.Ten,' + @FIELD + '
		
		FROM BaoHiemXaHoi BHXH
		LEFT JOIN NhanVien NV ON BHXH.NhanVienId = NV.NhanVienId 
	'

	-- Where clause @SEARCH_STRING
	IF @SEARCH_STRING <> ''
	BEGIN
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + N' AND (NV.Ma LIKE '''+ @V_SEARCH_STRING + ''' OR NV.Ho LIKE N'''+ @SEARCH_STRING + N''' OR NV.Ho LIKE ''' + @V_SEARCH_STRING + ''' OR NV.Ten LIKE '''+ @SEARCH_STRING + ''' OR NV.Ten LIKE '''+ @V_SEARCH_STRING + ''') '
	END

	-- Where clause @NHAN_VIEN_ID
	IF @NHAN_VIEN_ID <> '0'
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + N' AND BHXH.NhanVienId = ''' + @NHAN_VIEN_ID + ''' '
	
	-- Where clause @BHXH_ID
	IF @BHXH_ID <> '0'
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + N' AND BHXH.BaoHiemXaHoiId = ''' + @BHXH_ID + ''' '

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

