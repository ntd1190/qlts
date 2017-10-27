USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_DanhGia_GetListDanhGiaByCriteria]    Script Date: 10/27/2017 08:59:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.20
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_DanhGia_GetListDanhGiaByCriteria]
						 @search			=	NULL
						,@DanhGiaIds		=	N'75'
						,@TaiSanIds			=	NULL
						,@PhongBanIds		=	NULL
						,@NhanVienIds		=	NULL
	
						,@Field				=	N''
						,@skip				=	N''
						,@take				=	NULL
						,@OrderClause		=	NULL
				
						,@COSO_ID			=	1
						,@NHANVIEN_ID		=	null
						,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.20 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_DanhGia_GetListDanhGiaByCriteria]
	 @search			NVARCHAR(MAX)	=	NULL
	,@DanhGiaIds		NVARCHAR(MAX)	=	NULL
	,@TaiSanIds			NVARCHAR(MAX)	=	NULL
	,@PhongBanIds		NVARCHAR(MAX)	=	NULL
	,@NhanVienIds		NVARCHAR(MAX)	=	NULL
	
	,@Field				NVARCHAR(MAX)	=	NULL
	,@skip				INT				=	NULL
	,@take				INT				=	NULL
	,@OrderClause		NVARCHAR(MAX)	=	NULL
				
	,@COSO_ID			NVARCHAR(MAX)				=	NULL
	,@NHANVIEN_ID		NVARCHAR(MAX)				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
--------------------------------------------------
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE  @V_SQL				NVARCHAR(MAX) 
			,@_COSO_IDS			VARCHAR(MAX)	=	NULL
			,@Nam	VARCHAR(MAX)	=	NULL
	--LAY SO LIEU CAU HINH THONG SO
	EXEC sp_ThongSoUser_GetThongSo @LOAITHONGSO='SoLieuNam',@NHANVIEN=@NHANVIEN_ID,@NAM=@Nam OUTPUT;
	-- SET DEFAULT

	SET @search = ISNULL(@search, '')
	SET @DanhGiaIds = ISNULL(@DanhGiaIds, '')
	SET @TaiSanIds = ISNULL(@TaiSanIds, '')
	SET @PhongBanIds = ISNULL(@PhongBanIds, '')
	SET @NhanVienIds = ISNULL(@NhanVienIds, '')

	SET @Field = ISNULL(@Field, '')
	IF (@Field = '')
		SET @Field = ' DG.* ';

	SET @skip = ISNULL(@skip, 0)
	SET @take = ISNULL(@take, 0)

	SET @OrderClause = ISNULL(@OrderClause,'')
	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';

	SET @COSO_ID = ISNULL(@COSO_ID, 0)
	SET @NHANVIEN_ID = ISNULL(@NHANVIEN_ID, 0)
	SET @MESSAGE = ISNULL(@MESSAGE, '')

	--EXEC [dbo].[sp_CoSo_GetListCoSoTrucThuocById]
	--   @COSOID=@COSO_ID
	--  ,@COSOID_OUT=@_COSO_IDS OUTPUT
	--SET @_COSO_IDS = REPLACE(@_COSO_IDS,',','|')
	--PRINT concat('@_COSO_IDS=',@_COSO_IDS)

	DECLARE @IS_VIEW varchar(10) = '0'
	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @NHANVIEN_ID,
		@CO_SO_ID = @COSO_ID,
		@CHUC_NANG = 'CN0033',
		@QUYEN=@IS_VIEW OUTPUT
----------
	SET @V_SQL = N'
		SELECT		COUNT(DG.DanhGiaId) OVER () AS MAXCNT,DG.DanhGiaId ID
					,' + @Field + ' 
					,TS.TenTaiSan,TS.LoaiKeKhai,PB.TenPhongBan,NV.TenNhanVien
					,NV_NT.TenNhanVien TenNguoiTao,DG_NG.NguyenGiaCu
		FROM		DanhGia DG
					LEFT JOIN (
						select		DanhGiaId, SUM(GiaTriCu) NguyenGiaCu
						from		DanhGia_NguyenGia
						GROUP BY	DanhGiaId
					) DG_NG ON DG.DanhGiaId = DG_NG.DanhGiaId
					LEFT JOIN TaiSan TS ON DG.TaiSanId = TS.TaiSanId
					LEFT JOIN PhongBan PB ON DG.PhongBanId = PB.PhongBanId
					LEFT JOIN NhanVien NV ON DG.NhanVienId = NV.NhanVienId
					LEFT JOIN CoSo CS ON DG.CoSoId = CS.CoSoId
					LEFT JOIN NhanVien NV_NT ON DG.NguoiTao = NV_NT.NhanVienId
		WHERE YEAR(DG.NgayDanhGia)='''+@Nam+'''	'

	IF @search <> ''
	BEGIN
		SET @V_SQL = @V_SQL + N' AND (DG.SoChungTu LIKE N''%' +@search+ '%'' OR DG.NoiDung LIKE  N''%' +@search+ '%'' ';
		SET @V_SQL = @V_SQL + N' OR TS.MaTaiSan LIKE N''%' +@search+ '%'' OR TS.TenTaiSan LIKE  N''%' +@search+ '%'' ';
		SET @V_SQL = @V_SQL + N' OR PB.MaPhongBan LIKE N''%' +@search+ '%'' OR PB.TenPhongBan LIKE  N''%' +@search+ '%'' ';
		SET @V_SQL = @V_SQL + N' OR NV.MaNhanVien LIKE N''%' +@search+ '%'' OR NV.TenNhanVien LIKE  N''%' +@search+ '%'' ';
		SET @V_SQL = @V_SQL + N' OR CS.MaCoSo LIKE N''%' +@search+ '%'' OR CS.TenCoSo LIKE  N''%' +@search+ '%'') ';
	END
	------------
	IF @IS_VIEW = 'VB' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and DG.CoSoId =''' + @COSO_ID + '''';   
	END
	IF @IS_VIEW = 'VR' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and NV_NT.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @NHANVIEN_ID + ''')';   
	END
	IF @IS_VIEW = 'VE' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and NV_NT.NhanVienId =''' + @NHANVIEN_ID + '''';   
	END
	----------
	IF @DanhGiaIds <> ''
		SET @V_SQL = @V_SQL + N' AND CHARINDEX(''|'' + CAST(DG.DanhGiaId AS VARCHAR(20)) + ''|'', ''|'' + @DanhGiaIds + ''|'') > 0 ';

	IF @TaiSanIds <> ''
		SET @V_SQL = @V_SQL + N' AND CHARINDEX(''|'' + CAST(DG.TaiSanId AS VARCHAR(20)) + ''|'', ''|'' + @TaiSanIds + ''|'') > 0 ';

	IF @PhongBanIds <> ''
		SET @V_SQL = @V_SQL + N' AND CHARINDEX(''|'' + CAST(DG.PhongBanId AS VARCHAR(20)) + ''|'', ''|'' + @PhongBanIds + ''|'') > 0 ';

	IF @NhanVienIds <> ''
		SET @V_SQL = @V_SQL + N' AND CHARINDEX(''|'' + CAST(DG.NhanVienId AS VARCHAR(20)) + ''|'', ''|'' + @NhanVienIds + ''|'') > 0 ';

	IF @OrderClause <> ''
		SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	IF @OrderClause <> '' AND @take <> 0
		SET @V_SQL = @V_SQL + ' OFFSET ' + CAST(@skip AS nvarchar(20)) + ' ROWS FETCH NEXT ' + CAST(@take AS nvarchar(20)) + ' ROWS ONLY '
		
	print @V_SQL
	exec sp_executesql @V_SQL,N'
		 @search			NVARCHAR(MAX)	=	NULL
		,@DanhGiaIds		NVARCHAR(MAX)	=	NULL
		,@TaiSanIds			NVARCHAR(MAX)	=	NULL
		,@PhongBanIds		NVARCHAR(MAX)	=	NULL
		,@NhanVienIds		NVARCHAR(MAX)	=	NULL
	
		,@COSO_ID			INT				=	NULL
		,@NHANVIEN_ID		INT				=	NULL
		'
		,@search			=	@search
		,@DanhGiaIds		=	@DanhGiaIds
		,@TaiSanIds			=	@TaiSanIds
		,@PhongBanIds		=	@PhongBanIds
		,@NhanVienIds		=	@NhanVienIds
				
		,@COSO_ID			=	@COSO_ID
		,@NHANVIEN_ID		=	@NHANVIEN_ID
--------------------------------------------------
SET NOCOUNT OFF
END

