/*************************************************************  
1. Create Date	: 
2. Creator		: 
3. Description	: Lấy danh sách Nghỉ phép theo điều kiện
4. Function		: QLTSMAIN/NguoiDung/List
5. Example		: 



6. Precaution	:
7. History		:
				  2017.04.15() - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_NguoiDung_GetListNguoiDungByCriteria]
( 
	@MA_FORM			    varchar(6)		= 'FL0009'			-- Mã Form
	, @FIELD			    nvarchar(500)	= null			-- Danh sách các field cần lấy
	, @SEARCH_TUNGAY		nvarchar(500)	= null
	, @SEARCH_DENNGAY		nvarchar(500)	= null
	, @SEARCH_NHANVIEN		nvarchar(500)	= null
	, @SEARCH_VAITRO		nvarchar(500)	= null
	, @CoSoId				nvarchar(500)	= null
	, @USER_ID				nvarchar(500)	= NULL
	, @ORDER_CLAUSE			nvarchar(500)	= null			-- Mệnh đề order by (VD: NhanVienId ASC|DESC,HoTen ASC|DESC)

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
	DECLARE @V_WHERE_CLAUSE NVARCHAR(4000) = N' 1 = 1 ';
	DECLARE @V_FIELD NVARCHAR(4000) = ''
	DECLARE @V_ORDER_CLAUSE NVARCHAR(4000) = ''
		,@V_VAITROID	varchar(10)				=	NULL
		,@V_NHANVIENID	varchar(10)				=	NULL

	-- Chuẩn bị biến @MA_FORM
	SET @MA_FORM = ISNULL(@MA_FORM,'')
	----------

	-- Chuẩn bị biến @FIELD
	SET @FIELD = ISNULL(@FIELD,'*')

	IF (@FIELD = '')
		SET @FIELD = '*';
	----------


	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

SELECT TOP 1 @V_VAITROID = VaiTroId,@V_NHANVIENID=NhanVienId FROM NguoiDung WHERE NguoiDungId = @USER_ID
SET @V_VAITROID = ISNULL(@V_VAITROID,'0')
SET @V_NHANVIENID = ISNULL(@V_NHANVIENID,'0')
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
		exec QLTS_MAIN.dbo.[sp_CauHinhFormCot_GetInfoByMaForm]
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

    ----------
  DECLARE @IS_VIEW varchar(10) = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @V_NHANVIENID,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0002',
		@QUYEN=@IS_VIEW OUTPUT

		print'@IS_VIEW=' + @IS_VIEW

	---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT,a.NguoiDungId,a.CtrVersion, a.MaNguoiDung, a.Email, a.DienThoai,a.HoTen,b.TenNhanVien,c.TenVaiTro,Convert(varchar(10),CONVERT(date,a.NgayTao,106),103) AS NgayTao
	FROM NguoiDung a left join [QLTS].[DBO].NhanVien b on a.NhanVienId = b.NhanVienId 
	left join VaiTro c on c.VaiTroId=a.VaiTroId ';

	set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'AND ( ' +
				@V_VAITROID + ' = 1
				OR ( ''' + @IS_VIEW + ''' IN (''VA'',''VB'',''VR'',''VE'') AND a.CoSoId = ''' + @CoSoId + ''')
			)'

	IF( @SEARCH_TUNGAY <> '' AND @SEARCH_DENNGAY <> '')
	BEGIN 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' and a.NgayTao BETWEEN  ''' + @SEARCH_TUNGAY + ''' AND '''+ @SEARCH_DENNGAY + '  ''';
	END
	ELSE IF @SEARCH_TUNGAY <> ''
	BEGIN
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and  a.NgayTao >=  ''' + @SEARCH_TUNGAY + '  ''';
	END
	ELSE IF @SEARCH_DENNGAY <>''
	BEGIN 
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' and a.NgayTao <=  ''' + @SEARCH_DENNGAY + '  ''';
	END
		

	IF @SEARCH_NHANVIEN <> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' A.NhanVienId in(' + @SEARCH_NHANVIEN + ') ' ;
	END

	IF @SEARCH_VAITRO<> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' C.VaiTroId in(' + @SEARCH_VAITRO + ') ' ;
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
	print (@V_SQL)
	EXEC(@V_SQL);

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END



