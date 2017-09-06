/*************************************************************  
1. Create Date	: 2017.07.17
2. Creator		: NGUYEN THANH BINH
3. Description	: THÔNG TIN CHI NHÁNH
4. Function		: QLDNKHO/CHINHANH/LIST
5. Example		: 
					--∬
					DECLARE @MESSAGE	NVARCHAR(MAX)
					exec [sp_ChiNhanh_GetChiNhanhById]  
						 @FIELD					= ''
						,@CHI_NHANH_ID				= N'4'
					,@LOGIN_ID			=	68
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.07.17 (NGUYEN THANH BINH) - TẠO MỚI
*************************************************************/
ALTER PROCEDURE [dbo].[sp_ChiNhanh_GetChiNhanhById]
(
	 @FIELD					NVARCHAR(MAX)	= null			-- Danh sách các field cần lấy
	,@CHI_NHANH_ID				NVARCHAR(MAX)	= null			-- 
	,@LOGIN_ID					INT				=	null
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
--------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL				NVARCHAR(4000) 
	DECLARE @V_FIELD			NVARCHAR(4000)
	DECLARE @V_WHERE_CLAUSE		NVARCHAR(4000) 

	SET		@V_WHERE_CLAUSE		= N' CHINHANH.XoaYN = ''N'' ';

	-- Chuẩn bị biến @FIELD
	SET @FIELD = ISNULL(@FIELD, '');
	IF (@FIELD = '')
		SET @FIELD = ' CHINHANH.* ';

	-- Chuẩn bị biến @HANG_SAN_XUAT_ID
	SET @CHI_NHANH_ID = ISNULL(@CHI_NHANH_ID, '');
	IF (@CHI_NHANH_ID = '')
		SET @CHI_NHANH_ID = '0';

---- Xây dựng nội dung câu SQL  
	SET @V_SQL = N'
		SELECT
					COUNT(*) OVER () MAXCNT,
					' + @FIELD + '
					,CHINHANH.ChiNhanhId CHINHANH_ID,CNC.MaChiNhanh MaChiNhanhCha,CNC.TenChiNhanh TenChiNhanhCha,(NV.Ho+'' ''+NV.Ten) TenNguoiTao
		FROM
					CHINHANH ChiNhanh WITH(NOLOCK, READUNCOMMITTED)
		LEFT JOIN	NhanVien NV WITH(NOLOCK, READUNCOMMITTED) ON CHINHANH.NguoiTao=NV.NhanVienId
		LEFT JOIN	ChiNhanh CNC WITH(NOLOCK, READUNCOMMITTED) ON CHINHANH.ChiNhanhCha=CNC.ChiNhanhId
	'

	-- Where clause @KHO_HANG_ID
	SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + N' AND ( 
			CHINHANH.ChiNhanhId = ''' + @CHI_NHANH_ID + '''
		) '

	-- Build Where clause
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE

	-- Build Order clause
---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)
--------------------------------------------------
SET NOCOUNT OFF
END