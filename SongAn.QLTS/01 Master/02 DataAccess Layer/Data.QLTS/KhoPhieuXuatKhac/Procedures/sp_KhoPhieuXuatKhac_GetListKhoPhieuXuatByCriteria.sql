/**************************************************
1. Create Date	: 2017.10.24
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoPhieuXuatKhac_GetListKhoPhieuXuatByCriteria]
						 @SEARCH				=	NULL
						,@SOPHIEU				=	''
						,@KHOPHIEUXUATID		=	''
						,@COSOID				=	NULL
						,@NHANVIENID			=	NULL

						,@FIELD					=	NULL
						,@ORDERCLAUSE			=	'KPX.KhoPhieuXuatId DESC'
						,@SKIP					=	0
						,@TAKE					=	10

						,@COSO_ID				=	1
						,@NHANVIEN_ID			=	6
						,@FUNCTIONCODE			=	'CN0046'
						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.10.24 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuXuatKhac_GetListKhoPhieuXuatByCriteria]
	 @SEARCH				NVARCHAR(MAX)	=	NULL
	,@SOPHIEU				VARCHAR(MAX)	=	NULL
	,@KHOPHIEUXUATID		VARCHAR(MAX)	=	NULL
	,@COSOID				VARCHAR(MAX)	=	NULL
	,@NHANVIENID			VARCHAR(MAX)	=	NULL
	,@KHOTAISANID			VARCHAR(MAX)	=	NULL
	,@STARTDATE				VARCHAR(MAX)	=	NULL
	,@ENDDATE				VARCHAR(MAX)	=	NULL

	,@FIELD					VARCHAR(MAX)	=	NULL
	,@ORDERCLAUSE			VARCHAR(MAX)	=	NULL
	,@SKIP					INT				=	NULL
	,@TAKE					INT				=	NULL

	,@COSO_ID				INT				=	NULL
	,@NHANVIEN_ID			INT				=	NULL
	,@FUNCTIONCODE			VARCHAR(MAX)	=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
--------------------------------------------------
-- BIẾN NỘI BỘ
DECLARE  @V_SQL			NVARCHAR(MAX)	=	N''
		,@V_SEARCH		NVARCHAR(MAX)	=	N''
		,@V_ISVIEW		VARCHAR(MAX)	=	N''
		,@V_COSO_IDS	VARCHAR(MAX)	=	N''
		,@V_DELIMITER	VARCHAR(MAX)	=	N'|'

-- INPUT DEFAULT
SET @SEARCH			=	ISNULL(@SEARCH,'')
SET @KHOPHIEUXUATID =	ISNULL(@KHOPHIEUXUATID,'')
SET @SOPHIEU		=	ISNULL(@SOPHIEU,'')
SET @COSOID			=	ISNULL(@COSOID,'')
SET @NHANVIENID		=	ISNULL(@NHANVIENID,'')

SET @ORDERCLAUSE	=	ISNULL(@ORDERCLAUSE,'')
SET @SKIP			=	ISNULL(@SKIP,0)
SET @TAKE			=	ISNULL(@TAKE,0)
SET @MESSAGE		=	ISNULL(@MESSAGE,'')

SET @V_SEARCH		=	'%' + @SEARCH + '%'

SET @FIELD			=	ISNULL(@FIELD,'')
IF @FIELD = ''
	SET @FIELD = 'KPX.*'

BEGIN TRY
	--SET @MESSAGE	=	N'MA_TAI_SAN|1|MÃ NÀY ĐÃ TỒN TẠI';
	--THROW 51000, @MESSAGE, 1;

	-- KIỂM TRA QUYỀN VIEW
	EXEC [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @NHANVIEN_ID,
		@CO_SO_ID = @COSO_ID,
		@CHUC_NANG = @FUNCTIONCODE,
		@QUYEN=@V_ISVIEW OUTPUT
	--/ KIỂM TRA QUYỀN VIEW

	-- DANH SÁCH CƠ SỞ TRƯC THUỘC
	EXEC [dbo].[sp_CoSo_GetListCoSoTrucThuocById]
		@COSOID=@COSO_ID
		,@COSOID_OUT=@V_COSO_IDS OUTPUT
	SET @V_COSO_IDS = REPLACE(@V_COSO_IDS,',',@V_DELIMITER)
	--/ DANH SÁCH CƠ SỞ TRƯC THUỘC

	SET @V_SQL = N'
		SELECT		COUNT(KPX.KhoPhieuXuatId) OVER () AS MAXCNT,' + @FIELD + '
					,KPX.KhoPhieuXuatId ID,KPX.CtrVersion CTRVERSION
					,NV.TenNhanVien TenNguoiTao
		FROM		KhoPhieuXuat KPX
					LEFT JOIN NhanVien NV ON KPX.NguoiTao = NV.NhanVienId
		WHERE		(
					@V_ISVIEW IN (''VA'')
					OR (@V_ISVIEW IN (''VB'',''VR'') AND CHARINDEX(@V_DELIMITER + CAST(KPX.CoSoId AS VARCHAR(10)) + @V_DELIMITER,@V_DELIMITER + @V_COSO_IDS + @V_DELIMITER) > 0)
					OR (@V_ISVIEW IN (''VE'') AND KPX.NguoiTao = @NHANVIEN_ID)
					)
					AND (
						@SEARCH = ''''
						OR KPX.SoPhieu LIKE @V_SEARCH
						OR KPX.LyDo LIKE @V_SEARCH
						OR KPX.Loai LIKE @V_SEARCH
						OR KPX.NguoiNhanHang LIKE @V_SEARCH
					)
					AND (@SOPHIEU = '''' OR KPX.SoPhieu = @SOPHIEU)
					AND KPX.Loai = ''XK''
					AND (@STARTDATE = '''' OR KPX.NgayXuat >= @STARTDATE)
					AND (@ENDDATE = '''' OR KPX.NgayXuat <= @ENDDATE)
					AND (@KHOTAISANID = '''' OR KPX.KhoXuatId = @KHOTAISANID)
					AND (@KHOPHIEUXUATID = '''' OR CHARINDEX(@V_DELIMITER + CAST(KPX.KhoPhieuXuatId AS VARCHAR(10)) + @V_DELIMITER,@V_DELIMITER + @KHOPHIEUXUATID + @V_DELIMITER) > 0)
	'
	IF @ORDERCLAUSE <> ''
		SET @V_SQL = @V_SQL + ' ORDER BY ' + @ORDERCLAUSE

	IF @ORDERCLAUSE <> '' AND @TAKE > 0
		SET @V_SQL = @V_SQL + ' OFFSET ' + CAST(@SKIP AS VARCHAR(20)) + ' ROWS FETCH NEXT ' + CAST(@TAKE AS VARCHAR(20)) + ' ROWS ONLY '

	PRINT @V_SQL
	EXEC SP_EXECUTESQL @V_SQL,N'
		 @COSO_ID				INT				=	NULL
		,@NHANVIEN_ID			INT				=	NULL
		,@FUNCTIONCODE			VARCHAR(MAX)	=	NULL

		,@SEARCH				NVARCHAR(MAX)	=	NULL
		,@KHOPHIEUXUATID		VARCHAR(MAX)	=	NULL
		,@SOPHIEU				VARCHAR(MAX)	=	NULL
		,@COSOID				VARCHAR(MAX)	=	NULL
		,@NHANVIENID			VARCHAR(MAX)	=	NULL
		,@KHOTAISANID			VARCHAR(MAX)	=	NULL
		,@STARTDATE				VARCHAR(MAX)	=	NULL
		,@ENDDATE				VARCHAR(MAX)	=	NULL

		,@V_SEARCH				NVARCHAR(MAX)	=	NULL
		,@V_ISVIEW				VARCHAR(MAX)	=	NULL
		,@V_COSO_IDS			VARCHAR(MAX)	=	NULL
		,@V_DELIMITER			VARCHAR(MAX)	=	NULL
		'
		,@COSO_ID								=	@COSO_ID
		,@NHANVIEN_ID							=	@NHANVIEN_ID
		,@FUNCTIONCODE							=	@FUNCTIONCODE

		,@SEARCH								=	@SEARCH
		,@KHOPHIEUXUATID						=	@KHOPHIEUXUATID
		,@SOPHIEU								=	@SOPHIEU
		,@COSOID								=	@COSOID
		,@NHANVIENID							=	@NHANVIENID
		,@KHOTAISANID							=	@KHOTAISANID
		,@STARTDATE								=	@STARTDATE
		,@ENDDATE								=	@ENDDATE

		,@V_SEARCH								=	@V_SEARCH
		,@V_ISVIEW								=	@V_ISVIEW
		,@V_COSO_IDS							=	@V_COSO_IDS
		,@V_DELIMITER							=	@V_DELIMITER

END TRY
BEGIN CATCH
	DECLARE  @ErrorMessage	NVARCHAR(MAX)	=	ERROR_MESSAGE()
			,@ErrorSeverity INT				=	ERROR_SEVERITY()
			,@ErrorState	INT				=	ERROR_STATE()

	IF @MESSAGE = ''
		RAISERROR (@ErrorMessage,@ErrorSeverity,@ErrorState);
END CATCH
--------------------------------------------------
	SET NOCOUNT OFF;
END
