/*************************************************************  
1. Create Date	: 2017.06.07
2. Creator		: NGUYEN THANH BINH
3. Description	: THÔNG ITN HÃNG SẢN XUẤT
4. Function		: QLDNKHO/KHOKHOHANG/LIST
5. Example		: 
					--∬
					exec [sp_KhoKhoHang_GetKhoKhoHangById]  
					  @FIELD					= ''
					, @KHO_HANG_ID				= N'1'

6. Precaution	:
7. History		:
				  2017.06.07 (Nguyen Thanh Binh) - TẠO MỚI
*************************************************************/
ALTER PROC [dbo].[sp_KhoKhoHang_GetKhoKhoHangById]
( 
	  @FIELD					NVARCHAR(4000)	= null			-- Danh sách các field cần lấy
	, @KHO_HANG_ID				NVARCHAR(4000)	= null			-- LoaiHangHoaId
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

	SET		@V_WHERE_CLAUSE		= N' KHO.XoaYN = ''N'' ';

	-- Chuẩn bị biến @FIELD
	SET @FIELD = ISNULL(@FIELD, '');
	IF (@FIELD = '')
		SET @FIELD = ' KHO.* ';

	-- Chuẩn bị biến @HANG_SAN_XUAT_ID
	SET @KHO_HANG_ID = ISNULL(@KHO_HANG_ID, '');
	IF (@KHO_HANG_ID = '')
		SET @KHO_HANG_ID = '0';

---- Xây dựng nội dung câu SQL  
	SET @V_SQL = N'
		SELECT
					COUNT(*) OVER () MAXCNT,
					' + @FIELD + '
					,KHO.KhoHangId KHO_ID,(NV.Ho+'' ''+NV.Ten) TenNguoiTao
		FROM
					KhoKhoHang KHO WITH(NOLOCK, READUNCOMMITTED)
		LEFT JOIN	NhanVien NV WITH(NOLOCK, READUNCOMMITTED) ON KHO.NguoiTao=NV.NhanVienId
	'

	-- Where clause @KHO_HANG_ID
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + N' AND ( 
			KHO.KhoHangId = ''' + @KHO_HANG_ID + '''
		) '

	-- Build Where clause
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE

	-- Build Order clause
---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

SET NOCOUNT OFF
END