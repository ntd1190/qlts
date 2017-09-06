/*************************************************************  
1. Create Date	: 2017.05.09
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: DANH SÁCH CHI TIẾT THEO PHIẾU CÔNG TÁC ID
4. Function		: QLDNMAIN/PHIEUCONGTAC/EDIT
5. Example		: 
					--∬
					exec [sp_PhieuCongTac_GetListChiTietByPhieuCongTacId]  
					  @FIELD					=''
					, @PHIEU_CONG_TAC			= '5'
					, @XOA						= '' -- Y|N
					, @ORDER_CLAUSE				= ''
					, @SKIP						= 0
					, @TAKE						= 10

6. Precaution	:
7. History		:
				  2017.05.09(Nguyễn Thanh Bình) - Tạo mới
				  2017.05.11(Nguyễn Thanh Bình) - thêm biến XoaYN
*************************************************************/
ALTER PROCEDURE [dbo].[sp_PhieuCongTac_GetListChiTietByPhieuCongTacId]
	  @FIELD					nvarchar(500)	= null			-- Danh sách các field cần lấy
	, @PHIEU_CONG_TAC			VARCHAR(500)	= null
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
		SET @FIELD = 'PCTCT.*';


	SET		@PHIEU_CONG_TAC		= ISNULL(@PHIEU_CONG_TAC,'');
	IF (@PHIEU_CONG_TAC = '')
		SET @PHIEU_CONG_TAC = 0;

	SET		@XOA		= ISNULL(@XOA,'');

	SET		@V_WHERE_CLAUSE		= N' 1=1 ';

	-- Chuẩn bị biến @ORDER_CLAUSE
	SET @ORDER_CLAUSE = ISNULL(@ORDER_CLAUSE,'');
	IF (@ORDER_CLAUSE = '')
		SET @ORDER_CLAUSE = ' PhieuCongTacId ';
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
	SELECT COUNT(*) OVER () AS MAXCNT,PCTCT.PhieuCongTacChiTietId PCTCT_ID, PCTCT.CtrVersion PCTCT_CTRVERSION,'+@FIELD+', TT.TrangThai
	FROM PhieuCongTacChiTiet PCTCT WITH(NOLOCK, READUNCOMMITTED)
	LEFT JOIN TrangThai TT WITH(NOLOCK, READUNCOMMITTED) ON PCTCT.MaTrangThai = TT.MaTrangThai '

	-- BULD WHERE CLAUSE VỚI @PHIEU_CONG_TAC
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND PCTCT.PhieuCongTacId=' + @PHIEU_CONG_TAC + ' ';

	-- BULD WHERE CLAUSE VỚI @XOA
	IF @XOA <> ''
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' AND PCTCT.XoaYN=''' + @XOA + ''' ';

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