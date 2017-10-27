USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_DeNghiTrangCap_GetListDeNghiTrangCapByCriteria]    Script Date: 10/27/2017 08:52:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROC [dbo].[sp_DeNghiTrangCap_GetListDeNghiTrangCapByCriteria]
( 
	  @CoSoId	        NVARCHAR(10)	
	, @SoPhieu		    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @TuNgay			DATETIME		= null		
	, @DenNgay			DATETIME		= null		
	, @PhongBanId		NVARCHAR(MAX)	
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
	,@Nam	VARCHAR(MAX)	=	NULL
	--LAY SO LIEU CAU HINH THONG SO
	EXEC sp_ThongSoUser_GetThongSo @LOAITHONGSO='SoLieuNam',@NHANVIEN=@LoginId,@NAM=@Nam OUTPUT;


	SET @Search = ISNULL(@Search, '')
	IF @Search <> ''
	BEGIN	
		SET @Search = N'%' + @Search + '%'
		SET @Search = CAST(@Search AS VARCHAR(max))	
	END	
	----------


	DECLARE @IS_VIEW varchar(10) = '0'
	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @LoginId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0019',
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
	SELECT COUNT(*) OVER () AS MAXCNT, H.DeNghiId, H.Ngay, H.SoPhieu, H.PhanLoaiId, PL.TenPhanLoai, H.PhongBanId,ISNULL(PB.TenPhongBan,cs.TenCoSo) as TenPhongBan, H.NoiDung, H.CoSoId,
			H.DuyetId,H.NoiDungDuyet,D.TrangThai,H.NguoiTao,H.GuiCapTren,nv.TenNhanVien TenNhanVien,H.NgayTao,H.CtrVersion
	FROM dbo.DeNghiTrangCap H 
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = H.NguoiTao 
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = h.PhongBanId
	LEFT JOIN dbo.PhanLoai PL ON PL.PhanLoaiId = h.PhanLoaiId
	LEFT JOIN dbo.Duyet D ON D.DuyetId = h.DuyetId
	LEFT JOIN dbo.CoSo cs ON cs.CoSoId = h.CoSoId
	WHERE YEAR(h.ngay)='''+@Nam+''' and CAST(Ngay AS DATE) BETWEEN CAST(''' + CAST(@TuNgay AS VARCHAR) +''' AS DATE) AND CAST(''' + CAST(@DenNgay AS VARCHAR) + ''' AS DATE) ' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.NoiDung LIKE N''%' +@Search+ '%'')';
	END

	IF @PhongBanId > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and  h.PhongBanId in (' + @PhongBanId + ')';
	END

	
	IF @IS_VIEW = 'VB' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and  H.CoSoId =''' + @CoSoId + '''';   
	END
	IF @IS_VIEW = 'VR' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @LoginId + ''')';   
	END
	IF @IS_VIEW = 'VE' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @LoginId + '''';   
	END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY  H.Ngay desc,' + @OrderClause

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

