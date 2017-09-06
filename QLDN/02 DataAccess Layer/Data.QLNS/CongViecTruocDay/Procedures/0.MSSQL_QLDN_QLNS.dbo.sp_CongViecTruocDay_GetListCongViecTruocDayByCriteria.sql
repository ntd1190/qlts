/*************************************************************  
1. Create Date	: 2017.08.10
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: DANH SÁCH CÔNG VIỆC TRƯỚC ĐÂY
4. Function		: QLDNMAIN/NHANVIEN
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_CongViecTruocDay_GetListCongViecTruocDayByCriteria]
						 @NHANVIEN_ID			= '70'
						,@FIELD					= ''
						,@SEARCH_STRING			= N''
						,@ORDER_CLAUSE			= ''
						,@SKIP					= 0
						,@TAKE					= 100
						,@LOGIN_ID				=	NULL
						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.08.10 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_CongViecTruocDay_GetListCongViecTruocDayByCriteria]
	 @NHANVIEN_ID			NVARCHAR(MAX)	=	NULL			
	,@FIELD					NVARCHAR(MAX)	=	NULL			-- Danh sách các field cần lấy
	,@SEARCH_STRING			NVARCHAR(MAX)	=	NULL			-- quick search.
	,@ORDER_CLAUSE			NVARCHAR(MAX)	=	NULL			-- Mệnh đề order by (VD: NhanVienId ASC|DESC,HoTen ASC|DESC)
	,@SKIP					INT				=	NULL			-- Số dòng skip (để phân trang)
	,@TAKE					INT				=	NULL			-- Số dòng take (để phân trang)
	,@LOGIN_ID				INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
--------------------------------------------------
	DECLARE  @V_SQL				NVARCHAR(4000)	=	NULL
			,@V_FIELD			NVARCHAR(4000)	=	NULL
			,@V_WHERE_CLAUSE	NVARCHAR(4000)	=	NULL
			,@V_ORDER_CLAUSE	NVARCHAR(4000)	=	NULL
			,@V_CTRVERSION		INT				=	NULL
			,@V_HAS_ERROR		BIT				=	0
----------
	SET @MESSAGE				= ''
	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	SET	@V_ORDER_CLAUSE = ISNULL(@V_ORDER_CLAUSE,'');
	SET	@V_WHERE_CLAUSE = N' NhanVienId='+@NHANVIEN_ID+' ';

	-- Chuẩn bị biến @FIELD
	SET @FIELD = ISNULL(@FIELD, '');
	IF (@FIELD = '')
		SET @FIELD = ' * ';

	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '')
	IF(@LOGIN_ID = '')
		SET @LOGIN_ID = 0

	-- Chuẩn bị biến @ORDER_CLAUSE
	SET @ORDER_CLAUSE = ISNULL(@ORDER_CLAUSE, '');
	IF (@ORDER_CLAUSE = '')
		SET @ORDER_CLAUSE = ' CVTD_ID ';

	-- Chuẩn bị biến @SKIP & @TAKE
	SET @SKIP = ISNULL(@SKIP, '');
	IF (@SKIP = '')
		SET @SKIP = 0;

	SET @TAKE = ISNULL(@TAKE, '');
	IF (@TAKE = '')
		SET @TAKE = 50;
----------
	SET @V_SQL = N'
		SELECT		COUNT(CongViecTruocDayId) OVER () MAXCNT,
					' + @FIELD + '
					,CVTD.CongViecTruocDayId CVTD_ID,CVTD.CtrVersion CVTD_CTRVERSION
		FROM		CongViecTruocDay CVTD WITH(NOLOCK, READUNCOMMITTED)
	'
----------
	-- Where clause @SEARCH_STRING
	IF @SEARCH_STRING <> ''
	BEGIN
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + N' AND CVTD.CongTy LIKE N''%' + @SEARCH_STRING  +'%'' '
	END
----------
	-- Build Where clause
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE

	-- Build Order clause
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @ORDER_CLAUSE

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' OFFSET '+ CAST(@SKIP AS nvarchar(20)) +' ROWS '

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' FETCH NEXT '+CAST(@TAKE AS nvarchar(20)) +' ROWS ONLY '

---- Thực thi câu SQL
	EXEC (@V_SQL)
	PRINT (@V_SQL)
--------------------------------------------------
END
