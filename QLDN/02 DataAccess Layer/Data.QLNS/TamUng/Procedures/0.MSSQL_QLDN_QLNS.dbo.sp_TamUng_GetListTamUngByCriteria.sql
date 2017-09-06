USE [MSSQL_QLDN_QLNS]
GO
/****** Object:  StoredProcedure [dbo].[sp_TamUng_GetListTamUngByCriteria]    Script Date: 05/24/2017 10:11:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*************************************************************  
1. Create Date	: 2017.04.26
2. Creator		: Nguyen Ngoc Tan
3. Description	: Lấy danh sách Khen Thuong theo điều kiện
4. Function		: QLDNMAIN/TamUng/List
5. Example		: 
					exec sp_TamUng_GetListTamUngByCriteria 
					@FIELD=N'TamUngId,Ngay,ho +'' '' +ten as HoTen,Tien,HinhThuc,LyDo',
					@SEARCH_TUNGAY=N'2017-04-24',
					@SEARCH_DENNGAY=N'2017-04-24',
					@SEARCH_NHANVIEN=N'4',
					@ORDER_CLAUSE=N'TamUngId asc',@SKIP=0,@TAKE=10

6. Precaution	:
7. History		:
				  2017.04.26(Nguyen Ngoc Tan) - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_TamUng_GetListTamUngByCriteria]
( 
	@FIELD				nvarchar(500)	= null			-- Danh sách các field cần lấy
	, @ORDER_CLAUSE		nvarchar(500)	= null	
	, @SEARCH_TUNGAY		nvarchar(500)	= null	
	, @SEARCH_DENNGAY		nvarchar(500)	= null	
	, @SEARCH_NHANVIEN		nvarchar(500)	= null	
	, @SEARCH_TAMUNGID	nvarchar(500)	= null	
	, @SEARCH_TRANGTHAI		nvarchar(500)	= null
	, @LOGIN_ID			varchar (20)	='3'	
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
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) =''
	DECLARE @V_WHERE_CLAUSE NVARCHAR(4000) =''
	DECLARE @IS_VIEW_ALL varchar = '0'
	-- Chuẩn bị biến @FIELD
	IF (@FIELD IS NULL)
	SET @FIELD = '*';
	IF (@FIELD = '')
	SET @FIELD = '*';

	----------
	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@ORDER_CLAUSE IS NULL)
		SET @ORDER_CLAUSE = ' MAXCNT ';

	IF (@ORDER_CLAUSE = '')
		SET @ORDER_CLAUSE = ' MAXCNT ';
	----------
		exec MSSQL_QLDN_MAIN.dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGIN_ID = @LOGIN_ID,
		@CHUC_NANG = 'CN0013',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

		print '@IS_VIEW_ALL:'+@IS_VIEW_ALL
    
	---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'SELECT COUNT(*) OVER () AS MAXCNT, a.TamUngId,a.Ngay,b.Ho,b.Ten,a.NhanVienId,a.Tien,a.BangChu,a.LyDo,e.TrangThai,a.MaTrangThai,a.So,a.CtrVersion,a.XoaYN,a.NguoiTao
	FROM [MSSQL_QLDN_QLNS].[dbo].TamUng a INNER JOIN 
	[MSSQL_QLDN_QLNS].[dbo].[NhanVien] b on a.NhanVienId=b.NhanVienId
	INNER JOIN [MSSQL_QLDN_QLNS].[dbo].[NhanVien] d on a.NguoiTao=d.NhanVienId left join TrangThai e on a.MaTrangThai=e.MaTrangThai'
	-- Build Where clause
	-- Where clause Quick search

		IF( @SEARCH_TUNGAY <> '' AND @SEARCH_DENNGAY <> '')
		BEGIN 
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + '  a.Ngay BETWEEN  ''' + @SEARCH_TUNGAY + ''' AND '''+ @SEARCH_DENNGAY + '  ''';
		END
		ELSE IF @SEARCH_TUNGAY <> ''
		BEGIN
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + '  a.Ngay >=  ''' + @SEARCH_TUNGAY + '  ''';
		END
		ELSE IF @SEARCH_DENNGAY <>''
		BEGIN 
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + '  a.Ngay <=  ''' + @SEARCH_DENNGAY + '  ''';
		END
		

	IF @SEARCH_NHANVIEN <> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' b.NhanVienId in(' + @SEARCH_NHANVIEN + ') ' ;
	END

	IF @SEARCH_TAMUNGID <> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' a.TamUngId in(' + @SEARCH_TAMUNGID + ') ' ;
	END

	
	IF @SEARCH_TRANGTHAI <> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' a.MaTrangThai in(' + @SEARCH_TRANGTHAI + ') ' ;
	END

	IF @IS_VIEW_ALL = '0' 
	BEGIN		
	 IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'AND'
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + '  (a.NguoiTao =''' + @LOGIN_ID + ''' OR a.NhanVienId =''' + @LOGIN_ID + ''' )';
		
	END
			
	IF @V_WHERE_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' WHERE  ' + @V_WHERE_CLAUSE + ' AND A.XoaYN = ''N'' ';
	ELSE 
	SET @V_SQL = @V_SQL + ' WHERE  ' + @V_WHERE_CLAUSE + ' A.XoaYN = ''N'' ';

	-- Build Order clause
	IF @ORDER_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @ORDER_CLAUSE

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
    print(@V_SQL)
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

