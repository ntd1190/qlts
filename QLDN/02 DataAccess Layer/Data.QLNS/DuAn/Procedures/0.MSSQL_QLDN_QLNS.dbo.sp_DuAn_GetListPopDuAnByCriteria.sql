USE [MSSQL_QLDN_QLNS]
GO
/****** Object:  StoredProcedure [dbo].[sp_DuAn_GetListPopDuAnByCriteria]    Script Date: 05/24/2017 10:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
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
ALTER PROC [dbo].[sp_DuAn_GetListPopDuAnByCriteria]
( 
	@MA_FORM	nvarchar(500)	= 'FL0007'	
	,@FIELD				nvarchar(500)	= null			-- Danh sách các field cần lấy
	, @ORDER_CLAUSE		nvarchar(500)	= null
	, @SEARCHSTRING		nvarchar(500)	= null		
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

	---- Xây dựng nội dung câu SQL  
	


	-- get project not delete
	SET @V_WHERE_CLAUSE = ' WHERE A.XoaYN = ''N'' '

	SET @V_SQL = N' 
	SELECT distinct  COUNT(*) OVER () AS MAXCNT, a.DuAnId, a.CtrVersion, a.XoaYN, '+ @V_FIELD +' , a.NhanVienDa
	FROM (SELECT da.*, SUBSTRING(( SELECT ''|''+ CONVERT(nvarchar(255), nvda.NhanVienId)    AS  [text()]  
            FROM NhanVienDuAn nvda
            WHERE nvda.DuAnId = da.DuAnId
            ORDER BY nvda.DuAnId
            FOR XML PATH ('''')
			),2,1000 ) as NhanVienDa
		  FROM duan da 
		 ) as a 	
	LEFT JOIN  NhanVien c on a.QuanLy=c.NhanVienId 
	INNER JOIN TrangThai d ON a.MaTrangThai = d.MaTrangThai
	INNER JOIN PhongBan e on a.PhongBan=e.PhongBanId 	
	'
	-- Build Where clause
	-- Where clause Quick search
	

	

	IF @SEARCHSTRING <> ''
	BEGIN	   
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE + ' AND a.TenDuAn like N''%' + @SEARCHSTRING + '%''' ;
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

