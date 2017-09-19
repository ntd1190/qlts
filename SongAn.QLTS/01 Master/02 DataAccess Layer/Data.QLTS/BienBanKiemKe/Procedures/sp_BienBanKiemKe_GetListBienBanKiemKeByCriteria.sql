USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_BienBanKiemKe_GetListBienBanKiemKeByCriteria]    Script Date: 9/19/2017 10:30:46 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROC [dbo].[sp_BienBanKiemKe_GetListBienBanKiemKeByCriteria]
( 
	  @CoSoId	        INT		
	, @Search			nvarchar(500)   = null	
	, @TuNgay			DATETIME		= null		
	, @DenNgay			DATETIME		= null		
	, @SoChungTu		NVARCHAR(50)	= null		
	, @PhongBanId		NVARCHAR(max)
	, @LoginId			NVARCHAR(10)
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
	----------

	DECLARE @IS_VIEW varchar(10) = '0'
	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @LoginId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0031',
		@QUYEN=@IS_VIEW OUTPUT

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
		SELECT COUNT(*) OVER () AS MAXCNT, H.BienBanKiemKeId, H.SoChungTu, H.NgayChungTu, H.NgayKiemKe, H.PhongBanId, PB.TenPhongBan, H.GhiChu, H.NguoiTao, nv.TenNhanVien TenNguoiTao,
			H.NgayTao
	FROM dbo.BienBanKiemKe H
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = H.PhongBanId
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = h.NguoiTao
	WHERE CAST(H.NgayChungTu AS DATE) BETWEEN CAST(''' + CAST(@TuNgay AS VARCHAR) +''' AS DATE) AND CAST(''' + CAST(@DenNgay AS VARCHAR) + ''' AS DATE) ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.GhiChu LIKE N''%' +@Search+ '%'')';
	END

	IF @IS_VIEW = 'VB' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and H.CoSoId =''' + @CoSoId + '''';   
	END
	IF @IS_VIEW = 'VR' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @LoginId + ''')';   
	END
	IF @IS_VIEW = 'VE' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @LoginId + '''';   
	END
		

	--SET @V_SQL = @V_SQL + ' GROUP BY H.GhiTangId, H.SoChungTu, H.NgayChungTu, H.NgayGhiTang, H.NoiDung,
	--						h.DuyetId, H.NguoiDuyet, H.CoSoId, H.NguoiTao, H.NgayTao,ndd.HoTen,nd.HoTen ';

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
