USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCap_GetListDeNghiTrangCapByCriteria]    Script Date: 9/7/2017 2:48:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROC [dbo].[sp_DeNghiTrangCap_GetListDeNghiTrangCapByCriteria]
( 
	  @CoSoId	        INT	
	, @SoPhieu		    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @TuNgay			DATETIME		= null		
	, @DenNgay			DATETIME		= null		
	, @PhongBanId		NVARCHAR(MAX)	
	, @LoginId			INT
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 



	SET @Search = ISNULL(@Search, '')
	IF @Search <> ''
	BEGIN	
		SET @Search = N'%' + @Search + '%'
		SET @Search = CAST(@Search AS VARCHAR(max))	
	END	
	----------

	DECLARE @IS_VIEW_ALL varchar = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@LOGINID = @CoSoId,
		@CHUC_NANG = 'CN0019',
		@QUYEN_TAC_VU = 'View All',
		@YES_NO=@IS_VIEW_ALL OUTPUT

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@OrderClause IS NULL)
		SET @OrderClause = ' MAXCNT ';

	IF (@OrderClause = '')
		SET @OrderClause = ' MAXCNT ';
	----------

    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria

	SET @V_SQL = N'
	SELECT COUNT(*) OVER () AS MAXCNT, H.DeNghiId, H.Ngay, H.SoPhieu, H.PhanLoaiId, PL.TenPhanLoai, H.PhongBanId, PB.TenPhongBan, H.NoiDung, H.CoSoId,
			H.DuyetId,H.NguoiTao,NguoiDung.HoTen TenNhanVien,H.NgayTao,H.CtrVersion
	FROM dbo.DeNghiTrangCap H 
	LEFT JOIN QLTS_MAIN.dbo.NguoiDung ON NguoiDung.NhanVienId = H.NguoiTao 
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = h.PhongBanId
	LEFT JOIN dbo.PhanLoai PL ON PL.PhanLoaiId = h.PhanLoaiId
	WHERE 1 = 1 and CAST(Ngay AS DATE) BETWEEN CAST(''' + CAST(@TuNgay AS VARCHAR) +''' AS DATE) AND CAST(''' + CAST(@DenNgay AS VARCHAR) + ''' AS DATE) ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.NoiDung LIKE N''%' +@Search+ '%'')';
	END

	IF @PhongBanId > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and  h.PhongBanId in (SELECT Item FROM dbo.DelimitedSplit8K(' + @PhongBanId + ','','') WHERE Item > 0 ) ';
	END

	
	IF @IS_VIEW_ALL = '0' 
	BEGIN			 
		SET @V_SQL = @V_SQL + ' and H.CoSoId =''' + CAST(@CoSoId AS VARCHAR) + '''';	  
		SET @V_SQL = @V_SQL + ' and H.NguoiTao =''' + CAST(@LoginId AS VARCHAR) + '''';	  
	END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @OrderClause

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@Skip AS nvarchar(20)) +' ROWS'

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@Take AS nvarchar(20)) +' ROWS ONLY'


---- Thực thi câu SQL
	PRINT(@V_SQL);
	EXEC(@V_SQL)

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

