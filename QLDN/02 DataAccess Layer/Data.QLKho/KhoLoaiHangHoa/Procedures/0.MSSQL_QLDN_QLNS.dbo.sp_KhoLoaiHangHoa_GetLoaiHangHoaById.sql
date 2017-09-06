/*************************************************************  
1. Create Date	: 2017.06.06
2. Creator		: NGUYEN THANH BINH
3. Description	: Lấy danh sách loại hàng hóa
4. Function		: QLDNMAIN/nhanvien/List
5. Example		: 
					--∬
					exec [sp_KhoLoaiHangHoa_GetLoaiHangHoaById]  
					  @FIELD					= ''
					, @LOAI_HANG_HOA_ID			= N'2'

6. Precaution	:
7. History		:
				  2017.06.06 (Nguyen Thanh Binh) - TẠO MỚI
*************************************************************/
ALTER PROC [dbo].[sp_KhoLoaiHangHoa_GetLoaiHangHoaById]
( 
	  @FIELD					NVARCHAR(4000)	= null			-- Danh sách các field cần lấy
	, @LOAI_HANG_HOA_ID			NVARCHAR(4000)	= null			-- LoaiHangHoaId
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL				NVARCHAR(4000) 
	DECLARE @V_FIELD			NVARCHAR(4000)
	DECLARE @V_WHERE_CLAUSE		NVARCHAR(4000) 

	SET		@V_WHERE_CLAUSE		= N' LHH.XoaYN = ''N'' ';

	-- Chuẩn bị biến @FIELD
	SET @FIELD = ISNULL(@FIELD, '');
	IF (@FIELD = '')
		SET @FIELD = ' LHH.* ';

	-- Chuẩn bị biến @LOAI_HANG_HOA_ID
	SET @LOAI_HANG_HOA_ID = ISNULL(@LOAI_HANG_HOA_ID, '');
	IF (@LOAI_HANG_HOA_ID = '')
		SET @LOAI_HANG_HOA_ID = '0';

---- Xây dựng nội dung câu SQL  
	SET @V_SQL = N'
		SELECT
					COUNT(*) OVER () MAXCNT,
					' + @FIELD + '
					,LHH.LoaiHangHoaId LHH_ID,(NV.Ho+'' ''+NV.Ten) TenNguoiTao
		FROM
					KhoLoaiHangHoa LHH WITH(NOLOCK, READUNCOMMITTED)
		LEFT JOIN	NhanVien NV WITH(NOLOCK, READUNCOMMITTED) ON LHH.NguoiTao=NV.NhanVienId
	'

	-- Where clause @SEARCH_STRING
	IF @LOAI_HANG_HOA_ID <> 0
	BEGIN
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + N' AND ( 
				LHH.LoaiHangHoaId = ''' + @LOAI_HANG_HOA_ID + '''
			) '
	END

	-- Build Where clause
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE

	-- Build Order clause
---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

SET NOCOUNT OFF
END