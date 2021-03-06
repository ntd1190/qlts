USE [MSSQL_QLDN_QLNS]
GO
/****** Object:  StoredProcedure [dbo].[sp_KhenThuong_GetListKhenThuongByCriteria]    Script Date: 04/28/2017 09:54:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*************************************************************  
1. Create Date	: 2017.04.26
2. Creator		: Nguyen Ngoc Tan
3. Description	: Lấy danh sách Khen Thuong theo điều kiện
4. Function		: QLDNMAIN/KhenThuong/List
5. Example		: 
					exec sp_KhenThuong_GetListKhenThuongByCriteria 
					@FIELD=N'KhenThuongCaNhanId,Ngay,Tien,HinhThuc,LyDo',
					@SEARCH_TUNGAY=N'2017-04-24',
					@SEARCH_DENNGAY=N'2017-04-24',
					@ORDER_CLAUSE=N'KhenThuongCaNhanId asc',@SKIP=0,@TAKE=10

6. Precaution	:
7. History		:
				  2017.04.26(Nguyen Ngoc Tan) - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_KhenThuong_GetListKhenThuongByCriteria]
( 
	@FIELD				nvarchar(500)	= null			-- Danh sách các field cần lấy
	, @ORDER_CLAUSE		nvarchar(500)	= null	
	, @SEARCH_TUNGAY		nvarchar(500)	= null	
	, @SEARCH_DENNGAY		nvarchar(500)	= null	
	, @SEARCH_HINHTHUC		nvarchar(500)	= null	
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

    
	---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'SELECT COUNT(*) OVER () AS MAXCNT, KhenThuongId,Ngay,Tien,CASE HinhThuc When 1 THEN N''Thưởng tiền'' else N''Bằng khen'' end as HinhThuc ,LyDo,VanBanSo
	FROM [MSSQL_QLDN_QLNS].[dbo].KhenThuong a INNER JOIN [MSSQL_QLDN_MAIN].[dbo].[NguoiDung] d on a.NguoiTao=d.NguoiDungId '
	-- Build Where clause
	-- Where clause Quick search

		IF( @SEARCH_TUNGAY <> '' AND @SEARCH_DENNGAY <> '')
		BEGIN 
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + '  Ngay BETWEEN  ''' + @SEARCH_TUNGAY + ''' AND '''+ @SEARCH_DENNGAY + '  ''';
		END
		ELSE IF @SEARCH_TUNGAY <> ''
		BEGIN
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + '  Ngay >=  ''' + @SEARCH_TUNGAY + '  ''';
		END
		ELSE IF @SEARCH_DENNGAY <>''
		BEGIN 
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + '  Ngay <=  ''' + @SEARCH_DENNGAY + '  ''';
		END
		
				IF @SEARCH_HINHTHUC <> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' a.HinhThuc in(' + @SEARCH_HINHTHUC + ') ' ;
	END
			
	IF @V_WHERE_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE

	-- Build Order clause
	IF @ORDER_CLAUSE > ''
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

