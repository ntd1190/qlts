/*************************************************************  
1. Create Date	: 2017.05.11
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: LẤY THÔNG TIN PHIẾU CÔNG TÁC THEO PhieuCongTacChiTietId
4. Function		: QLDNMAIN/PHIEUCONGTAC/EDIT
5. Example		: 
					--∬
					exec [sp_PhieuCongTac_GetPhieuCongTacByChiTietId]  
					  @FIELD					=''
					, @CHI_TIET_ID				= '2'
					, @XOA						= '' -- Y|N
					, @ORDER_CLAUSE				= ''
					, @SKIP						= 0
					, @TAKE						= 10

6. Precaution	:
7. History		:
				  2017.05.11(Nguyễn Thanh Bình) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_PhieuCongTac_GetPhieuCongTacByChiTietId]
	  @FIELD					nvarchar(500)	= null			-- Danh sách các field cần lấy
	, @CHI_TIET_ID				VARCHAR(500)	= null
	, @XOA						VARCHAR(500)	= null

	, @ORDER_CLAUSE				nvarchar(500)	= null			-- Mệnh đề order by (VD: NhanVienId ASC|DESC,HoTen ASC|DESC)

	, @SKIP						int				= null			-- Số dòng skip (để phân trang)
	, @TAKE						int				= null			-- Số dòng take (để phân trang)
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL				NVARCHAR(4000) 
	DECLARE @V_WHERE_CLAUSE		NVARCHAR(4000) 

	SET @FIELD = ISNULL(@FIELD, '');
	IF (@FIELD = '')
		SET @FIELD = 'PCT.*';


	SET		@XOA		= ISNULL(@XOA,'');

	SET		@V_WHERE_CLAUSE		= N' 1=1 ';

	-- Chuẩn bị biến @ORDER_CLAUSE
	SET @ORDER_CLAUSE = ISNULL(@ORDER_CLAUSE,'');
	IF (@ORDER_CLAUSE = '')
		SET @ORDER_CLAUSE = ' PCT_ID ';
	----------

	-- Chuẩn bị biến @Skip & @Take
	SET @SKIP = ISNULL(@SKIP,0);

	SET @TAKE = ISNULL(@TAKE,0);
	IF (@TAKE = 0)
		SET @TAKE = 100;
	----------

---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT,PCT.PhieuCongTacId PCT_ID, PCT.CtrVersion PCT_CTRVERSION,'+@FIELD+'
	FROM PhieuCongTac PCT WITH(NOLOCK, READUNCOMMITTED)
	LEFT JOIN PhieuCongTacChiTiet PCTCT WITH(NOLOCK, READUNCOMMITTED) ON PCT.PhieuCongTacId = PCTCT.PhieuCongTacId '

	-- BULD WHERE CLAUSE VỚI @CHI_TIET_ID
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND PCTCT.PhieuCongTacChiTietId=' + @CHI_TIET_ID + ' ';

	-- BULD WHERE CLAUSE VỚI @XOA
	IF @XOA <> ''
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND PCT.XoaYN=''' + @XOA + ''' ';

	IF @V_WHERE_CLAUSE > ''
		SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE

	-- Build Order clause
	IF @ORDER_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @ORDER_CLAUSE

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@SKIP AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@TAKE AS nvarchar(20)) +' ROWS ONLY'

---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

END