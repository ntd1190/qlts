/***************************************************
1. Create Date	: 2017.11.16
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC sp_KD_HopDong_cbxGetListByCriteria
						 @HOPDONGID		=	NULL
						,@SEARCH		=	N''

						,@ORDERCLAUSE	=	''
						,@SKIP			=	0
						,@TAKE			=	10

						,@USER_ID		=	NULL
						,@NHANVIEN_ID	=	70
						,@FUNCTIONCODE	=	''
						,@MESSAGE		=	@MESSAGE	OUTPUT

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.11.16 (NGUYỄN THANH BÌNH) - Tạo mới
***************************************************/
ALTER PROCEDURE sp_KD_HopDong_cbxGetListByCriteria
	 @HOPDONGID		INT					=	NULL
	,@SEARCH		NVARCHAR(MAX)		=	NULL

	,@ORDERCLAUSE	VARCHAR(MAX)		=	NULL
	,@SKIP			INT					=	NULL
	,@TAKE			INT					=	NULL

	,@USER_ID		INT					=	NULL
	,@NHANVIEN_ID	INT					=	NULL
	,@FUNCTIONCODE	VARCHAR(MAX)		=	NULL
	,@MESSAGE		NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON;
BEGIN TRY
--------------------------------------------------
DECLARE @V_SQL NVARCHAR(MAX) = NULL
	,@V_SEARCH NVARCHAR(MAX) = ''

SET @USER_ID = ISNULL(@USER_ID,0)
SET @NHANVIEN_ID = ISNULL(@NHANVIEN_ID,0)
SET @FUNCTIONCODE = ISNULL(@FUNCTIONCODE,'')
SET @MESSAGE = ''

SET @HOPDONGID = ISNULL(@HOPDONGID,0)
SET @SEARCH = ISNULL(@SEARCH,'')

SET @V_SEARCH = '%' + @SEARCH + '%'

SET @SKIP			=	ISNULL(@SKIP,0)
SET @TAKE			=	ISNULL(@TAKE,0)

SET @ORDERCLAUSE	=	ISNULL(@ORDERCLAUSE,'')
IF @ORDERCLAUSE = ''
	SET @ORDERCLAUSE = 'HD.HopDongId'

-- SELECT
SET @V_SQL = N'
	SELECT COUNT(HD.HopDongId) OVER () AS MAXCNT,HD.*,HD.HopDongId ID
		,LHD.MaLoaiHopDong,LHD.TenLoaiHopDong
		,NV.Ma MaNhanVien,CONCAT(NV.Ho,'' '',NV.Ten) AS TenNhanVien
		,KH.MaKhachHang,KH.TenKhachHang
		,DL.MaDuLieu,DL.TenDuLieu
	FROM KDHopDong HD
		LEFT JOIN KDLoaiHopDong LHD ON HD.LoaiHopDongId = LHD.LoaiHopDongId
		LEFT JOIN NhanVien NV ON HD.NhanVienId = NV.NhanVienId
		LEFT JOIN KDKhachHang KH ON HD.KhachHangId = KH.KhachHangId
		LEFT JOIN KDDuLieu DL ON HD.DuLieuId = DL.DuLieuId
'

-- WHERE
SET @V_SQL = @V_SQL + N'
	WHERE (@HOPDONGID = 0 OR HD.HopDongId = @HOPDONGID)
		AND (@SEARCH = '''' 
			OR HD.SoHopDong LIKE @V_SEARCH
			OR HD.TenHopDong LIKE @V_SEARCH
		)
'

-- ORDER BY
SET @V_SQL = @V_SQL + N'
		ORDER BY ' + @ORDERCLAUSE + ' 
'

-- OFFSET
IF @ORDERCLAUSE <> '' AND @TAKE > 0
	SET @V_SQL = @V_SQL + N'
		OFFSET ' + CAST(@SKIP AS VARCHAR(10)) + ' ROWS FETCH NEXT ' + CAST(@TAKE AS VARCHAR(10)) + ' ROWS ONLY 
	'

PRINT @V_SQL
EXEC SP_EXECUTESQL @V_SQL,N'
	 @NHANVIEN_ID			INT				=	NULL

	,@SEARCH				NVARCHAR(MAX)	=	NULL
	,@V_SEARCH				NVARCHAR(MAX)	=	NULL
	,@HOPDONGID				INT				=	NULL

	'
	,@NHANVIEN_ID							=	@NHANVIEN_ID

	,@SEARCH								=	@SEARCH
	,@V_SEARCH								=	@V_SEARCH
	,@HOPDONGID								=	@HOPDONGID

--------------------------------------------------
END TRY
BEGIN CATCH
	DECLARE @ErrorMessage NVARCHAR(MAX);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

	IF @MESSAGE = ''
		RAISERROR (@ErrorMessage,@ErrorSeverity,@ErrorState);
END CATCH

SET NOCOUNT OFF;
END