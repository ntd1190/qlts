/*************************************************************  
1. Create Date	: 2017.06.07
2. Creator		: NGUYEN THANH BINH
3. Description	: THÔNG ITN HÃNG SẢN XUẤT
4. Function		: QLDNKHO/KHOHANGSANXUAT/LIST
5. Example		: 
					--∬
					exec [sp_KhoHangSanXuat_GetKhoHangSanXuatById]  
					  @FIELD					= ''
					, @HANG_SAN_XUAT_ID			= N'1'

6. Precaution	:
7. History		:
				  2017.06.07 (Nguyen Thanh Binh) - TẠO MỚI
*************************************************************/
ALTER PROC [dbo].[sp_KhoHangSanXuat_GetKhoHangSanXuatById]
( 
	  @FIELD					NVARCHAR(4000)	= null			-- Danh sách các field cần lấy
	, @HANG_SAN_XUAT_ID			NVARCHAR(4000)	= null			-- LoaiHangHoaId
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

	SET		@V_WHERE_CLAUSE		= N' HSX.XoaYN = ''N'' ';

	-- Chuẩn bị biến @FIELD
	SET @FIELD = ISNULL(@FIELD, '');
	IF (@FIELD = '')
		SET @FIELD = ' HSX.* ';

	-- Chuẩn bị biến @HANG_SAN_XUAT_ID
	SET @HANG_SAN_XUAT_ID = ISNULL(@HANG_SAN_XUAT_ID, '');
	IF (@HANG_SAN_XUAT_ID = '')
		SET @HANG_SAN_XUAT_ID = '0';

---- Xây dựng nội dung câu SQL  
	SET @V_SQL = N'
		SELECT
					COUNT(*) OVER () MAXCNT,
					' + @FIELD + '
					,HSX.HangSanXuatId HSX_ID,(NV.Ho+'' ''+NV.Ten) TenNguoiTao
		FROM
					KhoHangSanXuat HSX WITH(NOLOCK, READUNCOMMITTED)
		LEFT JOIN	NhanVien NV WITH(NOLOCK, READUNCOMMITTED) ON HSX.NguoiTao=NV.NhanVienId
	'

	-- Where clause @SEARCH_STRING
	IF @HANG_SAN_XUAT_ID <> 0
	BEGIN
		SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + N' AND ( 
				HSX.HangSanXuatId = ''' + @HANG_SAN_XUAT_ID + '''
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