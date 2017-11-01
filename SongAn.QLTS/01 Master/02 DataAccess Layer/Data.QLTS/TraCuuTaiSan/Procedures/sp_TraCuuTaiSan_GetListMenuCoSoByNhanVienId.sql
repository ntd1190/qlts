/**************************************************
1. Create Date	: 2017.10.02
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_TraCuuTaiSan_GetListMenuCoSoByNhanVienId]
						 @NhanVienId			=	7
						,@MESSAGE				=	@MESSAGE	OUTPUT

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.10.02 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_TraCuuTaiSan_GetListMenuCoSoByNhanVienId]
	 @NhanVienId			INT				=	NULL
	,@COSO_ID				INT				=	NULL
	,@MESSAGE				NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
--------------------------------------------------
---------- BIẾN NỘI BỘ
DECLARE  @FUNCTION_CODE		NVARCHAR(MAX)	=	'CN0037'
		--,@COSO_ID			INT				=	0
		,@PHONGBAN_ID		VARCHAR(MAX)	=	''
		,@IS_VIEW			VARCHAR(10)		=	''

SET @MESSAGE = ISNULL(@MESSAGE,'')
SET @NhanVienId = ISNULL(@NhanVienId,0)

	SELECT	@PHONGBAN_ID =  COALESCE(@PHONGBAN_ID + ',', '') + cast(NVPB.PhongBanId as varchar(10))
	FROM	PhongBanNhanVien NVPB
	WHERE NhanVienId = @NhanVienId

	if @PHONGBAN_ID <> ''
		set @PHONGBAN_ID = SUBSTRING(@PHONGBAN_ID,2,DATALENGTH(@PHONGBAN_ID))

SELECT		@COSO_ID = ND.CoSoId
FROM		NhanVien NV
			LEFT JOIN QLTS_MAIN.DBO.NguoiDung ND ON NV.NhanVienId = ND.NhanVienId
WHERE		NV.NhanVienId = @NhanVienId

	EXEC [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @NhanVienId,
		@CO_SO_ID = @COSO_ID,
		@CHUC_NANG = @FUNCTION_CODE,
		@QUYEN=@IS_VIEW OUTPUT

IF @IS_VIEW = 'VA'
BEGIN
	SELECT		CS.CoSoId ID, CS.MaCoSo MA, CS.TenCoSo TEN,CS.TrucThuoc TRUCTHUOC,ISNULL(CSTT.TenCoSo,'') TENTRUCTHUOC,'COSO' [TYPE]
	FROM		CoSo CS
				LEFT JOIN CoSo CSTT ON CS.TrucThuoc = CSTT.CoSoId
	UNION 
	SELECT		PB.PhongBanId,PB.MaPhongBan,PB.TenPhongBan,PB.CoSoId,ISNULL(CSTT.TenCoSo,'') TENTRUCTHUOC,'PHONGBAN' 
	FROM		PhongBan PB
				LEFT JOIN CoSo CSTT ON PB.CoSoId = CSTT.CoSoId
				LEFT JOIN CoSo CS ON PB.CoSoId = CS.CoSoId
END

IF @IS_VIEW = 'VB'
BEGIN
	SELECT		CS.CoSoId ID, CS.MaCoSo MA, CS.TenCoSo TEN,CS.TrucThuoc TRUCTHUOC,ISNULL(CSTT.TenCoSo,'') TENTRUCTHUOC,'COSO' [TYPE]
	FROM		CoSo CS
				LEFT JOIN CoSo CSTT ON CS.TrucThuoc = CSTT.CoSoId
	WHERE		CS.CoSoId = @COSO_ID OR CS.TrucThuoc = @COSO_ID
	UNION 
	SELECT		PB.PhongBanId,PB.MaPhongBan,PB.TenPhongBan,PB.CoSoId,ISNULL(CSTT.TenCoSo,'') TENTRUCTHUOC,'PHONGBAN' 
	FROM		PhongBan PB
				LEFT JOIN CoSo CSTT ON PB.CoSoId = CSTT.CoSoId
				LEFT JOIN CoSo CS ON PB.CoSoId = CS.CoSoId
	WHERE		PB.CoSoId = @COSO_ID OR CS.TrucThuoc = @COSO_ID
END

IF @IS_VIEW = 'VE' OR @IS_VIEW = 'VR'
BEGIN
	SELECT		PB.PhongBanId ID,PB.MaPhongBan MA,PB.TenPhongBan TEN,PB.CoSoId TRUCTHUOC,ISNULL(CSTT.TenCoSo,'') TENTRUCTHUOC,'PHONGBAN' [TYPE]
	FROM		PhongBan PB
				LEFT JOIN CoSo CSTT ON PB.CoSoId = CSTT.CoSoId
	WHERE		PB.CoSoId = @COSO_ID AND CHARINDEX(',' + CAST(PB.PhongBanId AS VARCHAR(10)) + ',', ',' + @PHONGBAN_ID +',') > 0
END
--------------------------------------------------
	SET NOCOUNT OFF;
END
