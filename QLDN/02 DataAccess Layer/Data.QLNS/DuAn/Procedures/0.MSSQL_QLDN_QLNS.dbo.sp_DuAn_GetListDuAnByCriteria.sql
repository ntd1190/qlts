/*************************************************************  
1. Create Date	: 2017.04.26
2. Creator		: Nguyen Ngoc Tan
3. Description	: Lấy danh sách Khen Thuong theo điều kiện
4. Function		: QLDNMAIN/DuAn/List
5. Example		: 



6. Precaution	:
7. History		:
				  2017.04.26(Nguyen Ngoc Tan) - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_DuAn_GetListDuAnByCriteria]
( 
	@MA_FORM	nvarchar(500)	= 'FL0007'	
	,@FIELD				nvarchar(500)	= null			-- Danh sách các field cần lấy
	, @ORDER_CLAUSE		nvarchar(500)	= null
	, @SEARCHSTRING		nvarchar(500)	= null		
	, @SEARCH_TUNGAY		nvarchar(500)	= null	
	, @SEARCH_DENNGAY		nvarchar(500)	= null	
	, @SEARCH_NHANVIEN		nvarchar(500)	= null	
	, @SEARCH_DUANID	nvarchar(500)	= null	
	, @SEARCH_TRANGTHAI		nvarchar(500)	= null
	, @LOGIN_ID			varchar (20)	= null
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
	DECLARE @V_SQL NVARCHAR(4000) =''
	DECLARE @V_FIELD NVARCHAR(4000) =''
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) =''
	DECLARE @V_WHERE_CLAUSE NVARCHAR(4000) =''
	DECLARE @IS_VIEW_ALL varchar = '0'
	-- Chuẩn bị biến @FIELD
	SET @LOGIN_ID = ISNULL(@LOGIN_ID ,'')
	----------
	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------
	---- Gọi SP lấy thông tin Cấu Hình
	IF (@MA_FORM <> '' )
	BEGIN
		exec MSSQL_QLDN_MAIN.dbo.[sp_CauHinhFormCot_GetInfoByMaForm]
		@MA_FORM = 'FL0007',
		@FIELD = @V_FIELD OUTPUT,
		@ORDER_CLAUSE = @ORDER_CLAUSE OUTPUT;
		
		IF (@V_FIELD = '*' AND @V_FIELD <> '')
		BEGIN
			SET @V_FIELD = @FIELD;
		END
		IF (@ORDER_CLAUSE = ' MAXCNT ' AND @ORDER_CLAUSE <> '')
		BEGIN
			SET @ORDER_CLAUSE = @ORDER_CLAUSE;
		END
	END
	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@ORDER_CLAUSE IS NULL)
		SET @ORDER_CLAUSE = ' MAXCNT ';

	IF (@ORDER_CLAUSE = '')
		SET @ORDER_CLAUSE = ' MAXCNT ';
	-- check role is ViewAll or wherether not
	if(@LOGIN_ID<>'')
	BEGIN
		exec MSSQL_QLDN_MAIN.dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGIN_ID = @LOGIN_ID,
		@CHUC_NANG = 'CN0020',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT
	END
	---- Xây dựng nội dung câu SQL  
	
	DECLARE @V_NHANVIENDUAN VARCHAR(1000)
	SET @V_NHANVIENDUAN=''
	IF @SEARCH_NHANVIEN <> ''
	BEGIN	  
		SET @V_NHANVIENDUAN =  +' AND nvda.NhanVienId in(' + @SEARCH_NHANVIEN + ') ' ;
	END

	-- get project not delete
	SET @V_WHERE_CLAUSE = ' WHERE A.XoaYN = ''N'' '

	SET @V_SQL = N' 
	SELECT distinct  COUNT(*) OVER () AS MAXCNT, a.DuAnId, a.CtrVersion, a.XoaYN, '+ @V_FIELD +' , a.NhanVienDa
	FROM (SELECT da.*, SUBSTRING(( SELECT ''|''+ CONVERT(nvarchar(255), nvda.NhanVienId)    AS  [text()]  
            FROM NhanVienDuAn nvda
            WHERE nvda.DuAnId = da.DuAnId  '+@V_NHANVIENDUAN+'
            ORDER BY nvda.DuAnId
            FOR XML PATH ('''')
			),2,1000 ) as NhanVienDa
		  FROM duan da 
		 ) as a 	
	LEFT JOIN  NhanVien c on a.QuanLy=c.NhanVienId 
	LEFT JOIN TrangThai d ON a.MaTrangThai = d.MaTrangThai
	LEFT JOIN PhongBan e on a.PhongBan=e.PhongBanId 	
	'
	-- Build Where clause
	-- Where clause Quick search
	
	IF( @SEARCH_TUNGAY <> '' AND @SEARCH_DENNGAY <> '')
	BEGIN 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND  a.NgayTao BETWEEN  ''' + @SEARCH_TUNGAY + ''' AND '''+ @SEARCH_DENNGAY + '  ''';
	END
	ELSE IF @SEARCH_TUNGAY <> ''
	BEGIN
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND a.NgayTao >=  ''' + @SEARCH_TUNGAY + '  ''';
	END
	ELSE IF @SEARCH_DENNGAY <>''
	BEGIN 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND a.NgayTao <=  ''' + @SEARCH_DENNGAY + '  ''';
	END
	

	IF @SEARCHSTRING <> ''
	BEGIN	   
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE + ' AND a.TenDuAn like N''%' + @SEARCHSTRING + '%''' ;
	END
	
	
	IF @SEARCH_NHANVIEN <> ''
	BEGIN  
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' AND a.NhanVienDa <>'''' ' ;
	END
	
	IF @SEARCH_DUANID <> ''
	BEGIN	    
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' AND a.DuAnId in(' + @SEARCH_DUANID + ') ' ;
	END

	
	IF @SEARCH_TRANGTHAI <> ''
	BEGIN	    
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' AND a.MaTrangThai in(' + @SEARCH_TRANGTHAI + ') ' ;
	END

	IF @IS_VIEW_ALL = '0' and @LOGIN_ID !=''
	BEGIN			 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND (a.NguoiTao =''' + @LOGIN_ID + ''')';
	END

	SET @V_SQL = @V_SQL + @V_WHERE_CLAUSE
	-- Build Order clause
	IF @ORDER_CLAUSE <> ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @ORDER_CLAUSE
	
	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL    
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

