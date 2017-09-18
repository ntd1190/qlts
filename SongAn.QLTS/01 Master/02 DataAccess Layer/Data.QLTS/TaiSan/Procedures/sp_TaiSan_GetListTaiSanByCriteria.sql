/**************************************************
1. Create Date	: 2017.09.05
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: DANH SÁCH TÀI SẢN
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_TaiSan_GetListTaiSanByCriteria]
						 @SEARCH_STRING		=	N''
						,@SKIP				=	''
						,@TAKE				=	''

						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.05 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_TaiSan_GetListTaiSanByCriteria]
	 @SEARCH_STRING		NVARCHAR(MAX)	=	NULL
	,@SKIP				INT				=	NULL
	,@TAKE				INT				=	NULL
	,@OrderClause		NVARCHAR(MAX)	=	NULL				
	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 

	SET @SKIP = ISNULL(@SKIP, 0)
	SET @TAKE = ISNULL(@TAKE, 0)
	IF @TAKE = 0
		SET @TAKE = 10

	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------

	DECLARE @IS_VIEW_ALL varchar = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN0022',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT


	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, TS.* 
	FROM TaiSan TS 
	WHERE 1=1 ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @SEARCH_STRING > ''
	SET @V_SQL = @V_SQL + ' and (MaTaiSan LIKE N''%' +@SEARCH_STRING+ '%'' OR TenTaiSSan LIKE  N''%' +@SEARCH_STRING+ '%'')';


		IF @IS_VIEW_ALL = '0' 
	BEGIN			 
			SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';	  
	END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

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

