USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_TaiSan_cbxTaiSanSuDungByCriteria]    Script Date: 10/26/2017 05:13:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/**************************************************
1. Create Date	: 2017.09.01
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: THÔNG TIN TÀI SẢN
4. Function		: 
5. Example		: 
					EXEC [sp_TaiSan_cbxTaiSanSuDungByCriteria]
						 @Search			=	N''
						,@TaiSanId			=	N''
						,@MaTaiSan			=	N''
						,@CoSoId			=	1
						,@NhanVienId		=	6
						,@FunctionCode		=	6
6. Precaution	:
7. History		:
				  2017.09.01 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_TaiSan_cbxTaiSanSuDungByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @TaiSanId			INT				=	NULL	
	, @MaTaiSan			NVARCHAR(500)   =	NULL	
	, @FunctionCode		NVARCHAR(500)   =	NULL	
	, @PhongBanFilter		NVARCHAR(500)   =	NULL	
)
AS  
BEGIN
SET NOCOUNT ON
	DECLARE  @V_DELIMITER	VARCHAR(10)		=	'|'
			,@_COSO_IDS		VARCHAR(MAX)	=	NULL
			,@V_ISVIEW		VARCHAR(MAX)	=	NULL
			,@Nam	VARCHAR(MAX)	=	NULL
			--LAY SO LIEU CAU HINH THONG SO
	EXEC sp_ThongSoUser_GetThongSo @THONGSO='2',@NHANVIEN=@NhanVienId,@NAM=@NAM OUTPUT;
	PRINT(@NAM)

	SET @Search = ISNULL(@Search,'')
	SET @TaiSanId = ISNULL(@TaiSanId, 0)
	SET @MaTaiSan = ISNULL(@MaTaiSan,'')
	SET @PhongBanFilter = ISNULL(@PhongBanFilter,'')
	-- KIỂM TRA QUYỀN VIEW
	EXEC [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @NhanVienId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = @FunctionCode,
		@QUYEN=@V_ISVIEW OUTPUT
	PRINT @V_ISVIEW
	--/ KIỂM TRA QUYỀN VIEW

	EXEC [dbo].[sp_CoSo_GetListCoSoTrucThuocById]
	   @COSOID=@CoSoId
	  ,@COSOID_OUT=@_COSO_IDS OUTPUT
	SET @_COSO_IDS = REPLACE(@_COSO_IDS,',',@V_DELIMITER)
	PRINT concat('@_COSO_IDS=',@_COSO_IDS)

	SELECT	TOP 10 TS.TaiSanId,TS.MaTaiSan,TS.DonViTinh,TS.TenTaiSan,PB.PhongBanId,PB.TenPhongBan, ISNULL((TD.SLTon + TD.SLTang - TD.SLGiam),0) as SoLuongTon ,  ISNULL(SUM(NG.GiaTri),0) NguyenGia,nv.NhanVienId,nv.TenNhanVien
	FROM	TaiSan TS
			LEFT JOIN NguyenGia NG ON TS.TaiSanId = NG.TaiSanId
			LEFT JOIN TheoDoi TD ON TS.TaiSanId = TD.TaiSanId
			LEFT JOIN PhongBan PB ON TD.PhongBanId = PB.PhongBanId
			LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = TD.NhanVienId
	WHERE	(@V_ISVIEW = 'VA' OR CHARINDEX(@V_DELIMITER + CAST(TS.CoSoId AS VARCHAR(10)) + @V_DELIMITER,@V_DELIMITER + @_COSO_IDS + @V_DELIMITER) > 0)
			and (TD.SLTon + TD.SLTang - TD.SLGiam) > 0  
			AND (@TaiSanId = 0 OR TS.TaiSanId = @TaiSanId)
			AND TD.Nam = @Nam
			AND (@MaTaiSan = '' OR TS.MaTaiSan = @MaTaiSan)
			AND (@PhongBanFilter = '' OR TD.PhongBanId = @PhongBanFilter)
			AND (@Search = '' OR TS.MaTaiSan LIKE N'%' + @Search + '%' OR TS.TenTaiSan LIKE N'%' + @Search + '%')
	GROUP BY  TS.TaiSanId,TS.MaTaiSan,TS.TenTaiSan,TS.DonViTinh,PB.PhongBanId,PB.TenPhongBan,TD.SLTon,TD.SLTang,TD.SLGiam,nv.NhanVienId,nv.TenNhanVien
SET NOCOUNT OFF
END
