USE [MSSQL_QLDN_QLNS]
GO
/****** Object:  StoredProcedure [dbo].[sp_Issue_GetListIssueByCriteria]    Script Date: 05/24/2017 10:21:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*************************************************************  
1. Create Date	: 
2. Creator		: 
3. Description	: Lấy danh sách Nghỉ phép theo điều kiện
4. Function		: QLDNMAIN/Issue/List
5. Example		: 

exec sp_Issue_GetListIssueByCriteria @FIELD=N'*',@SEARCH_KHACHANG=N'18',@SEARCH_TUNGAYTAO=N'2017-05-16',
@SEARCH_DENNGAYTAO=N'2017-05-24',@SEARCH_LOAIISSUE=N'1',@SEARCH_TUNGAYKETTHUC=N'2017-05-09',
@SEARCH_DENNGAYKETTHUC=N'2017-05-22',@SEARCH_NGUOIXULY=N'17',@SEARCH_NGUOITAO=N'2',@SEARCH_TRANGTHAI=N'2',
@SEARCH_PHONGBAN=N'49',@ORDER_CLAUSE=N'A.IssueId asc',@SKIP=0,@TAKE=10

6. Precaution	:
7. History		:
				  2017.04.15() - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_Issue_GetListIssueByCriteria]
( 
	@MA_FORM			varchar(6)		= 'FL0005'			-- Mã Form
	, @FIELD			nvarchar(500)	= null			-- Danh sách các field cần lấy
	, @SEARCH_KHACHANG			nvarchar(500)	= null
	, @SEARCH_TUNGAYTAO			nvarchar(500)	= null
	, @SEARCH_ISSUEID			nvarchar(500)	= null
	, @SEARCH_DENNGAYTAO		nvarchar(500)	= null
	, @SEARCH_LOAIISSUE 		nvarchar(500)	= null
	, @SEARCH_TUNGAYKETTHUC			nvarchar(500)	= null
	, @SEARCH_DENNGAYKETTHUC			nvarchar(500)	= null
	, @SEARCH_NGUOIXULY		nvarchar(500)	= null
	, @SEARCH_NGUOITAO		nvarchar(500)	= null
	, @SEARCH_TRANGTHAI		nvarchar(500)	= null
	, @SEARCH_PHONGBAN		nvarchar(500)	= null
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
		SET @ORDER_CLAUSE = ' MAXCNT ';

	IF (@ORDER_CLAUSE = '')
		SET @ORDER_CLAUSE = ' MAXCNT ';
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

		IF (@ORDER_CLAUSE = ' MAXCNT ' AND @V_ORDER_CLAUSE <> '')
		BEGIN
			SET @ORDER_CLAUSE = @V_ORDER_CLAUSE;
		END
	END

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT,a.IssueId, '+@FIELD+'
	FROM Issue a left join KhachHang b on a.KhachHangId=b.KhachHangId left join nhanvien c on a.nguoixuly = c.NhanVienId 
	left join nhanvien d on a.nguoitao = d.NhanVienId left join PhongBan e on c.PhongBanId=e.PhongBanId';

	IF( @SEARCH_TUNGAYTAO <> '' AND @SEARCH_DENNGAYTAO <> '')
		BEGIN 
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' and A.NgayTao BETWEEN  ''' + @SEARCH_TUNGAYTAO + ''' AND '''+ @SEARCH_DENNGAYTAO + '''';
		END
		ELSE IF @SEARCH_TUNGAYTAO <> ''
		BEGIN
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' and  A.NgayTao >=  ''' + @SEARCH_TUNGAYTAO + '''';
		END
		ELSE IF @SEARCH_DENNGAYTAO <>''
		BEGIN 
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' and  A.NgayTao <=  ''' + @SEARCH_DENNGAYTAO + '''';
		END
		


	IF @SEARCH_KHACHANG <> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' A.KhachHangId in(' + @SEARCH_KHACHANG + ') ' ;
	END


		IF @SEARCH_LOAIISSUE <> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' A.LoaiIssue in(' + @SEARCH_LOAIISSUE + ') ' ;
	END

	IF( @SEARCH_TUNGAYKETTHUC <> '' AND @SEARCH_DENNGAYKETTHUC <> '')
		BEGIN 
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' and A.NgayDeNghi BETWEEN  ''' + @SEARCH_TUNGAYKETTHUC + ''' AND '''+ @SEARCH_DENNGAYKETTHUC + '''';
		END
		ELSE IF @SEARCH_TUNGAYKETTHUC <> ''
		BEGIN
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' and  A.NgayDeNghi >=  ''' + @SEARCH_TUNGAYKETTHUC + '''';
		END
		ELSE IF @SEARCH_DENNGAYKETTHUC <>''
		BEGIN 
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' and  A.NgayDeNghi <=  ''' + @SEARCH_DENNGAYKETTHUC + '''';
		END

		IF @SEARCH_NGUOIXULY <> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' A.NguoiXuLy in(' + @SEARCH_NGUOIXULY + ') ' ;
	END

	IF @SEARCH_NGUOITAO <> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' A.NguoiTao in(' + @SEARCH_NGUOITAO + ') ' ;
	END

		IF @SEARCH_TRANGTHAI<> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' A.MaTrangThai in(' + @SEARCH_TRANGTHAI + ') ' ;
	END

			IF @SEARCH_PHONGBAN<> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' C.PhongBanId in(' + @SEARCH_PHONGBAN + ') ' ;
	END
				IF @SEARCH_ISSUEID<> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' A.IssueId in(' + @SEARCH_ISSUEID + ') ' ;
	END
	-- Build Where clause

	IF @V_WHERE_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE
					

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

