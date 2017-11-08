USE [QLTS]
GO



ALTER PROC [dbo].[sp_KhaiThac_GetListKhaiThacByCriteria]
( 
	  @CoSoId	        NVARCHAR(10)	
	, @SoChungTu	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @TuNgay			DATETIME		= null		
	, @DenNgay			DATETIME		= null		
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
	DECLARE @V_SQL NVARCHAR(4000),@Nam	VARCHAR(MAX)	=	NULL
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
		@CHUC_NANG = 'CN0034',
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
	SELECT COUNT(*) OVER () AS MAXCNT, H.KhaiThacId, H.TaiSanId, TS.MaTaiSan, TS.TenTaiSan, TS.DonViTinh, H.KhachHangNCCId, TenKhachHang, H.SoChungTu,
			H.SoLuongKhaiThac, H.DonGiaKhaiThac, H.ThoiGianBatDau, H.ThoiGianKetThuc, H.SoLuongKhaiThac * H.DonGiaKhaiThac TongSoTien, H.TienThu, H.NopNganSach, H.DonVi, H.GhiChu, H.NguoiTao, nv.TenNhanVien TenNguoiTao, H.NgayTao,
			PB.TenPhongBan, SoHopDong, H.HopDongId
	FROM dbo.KhaiThac H
	LEFT JOIN dbo.NhanVien nv ON nv.NhanVienId = H.NguoiTao 
	LEFT JOIN dbo.KhachHang KH ON KH.KhachHangId = H.KhachHangNCCId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = H.TaiSanId	
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = H.PhongBanId
	left join HopDong hd on hd.HopDongId = H.HopDongId
	LEFT JOIN (SELECT pbnv.NhanVienId,
		STUFF((
				select CONCAT( '','' ,u1.PhongBanId)
				from dbo.PhongBan u1 JOIN dbo.PhongBanNhanVien pbnv1 ON pbnv1.PhongBanId = u1.PhongBanId
				where pbnv1.NhanVienId = pbnv.NhanVienId
				for xml path('''')
			),1,1,'''') PhongBanId
			FROM dbo.PhongBanNhanVien pbnv
			JOIN PhongBan b on pbnv.PhongBanId=b.PhongBanId 
			GROUP BY pbnv.NhanVienId) pbnv ON pbnv.NhanVienId=h.NguoiTao
	WHERE 1 = 1 and CAST(H.NgayTao AS DATE) BETWEEN CAST(''' + CAST(@TuNgay AS VARCHAR) +''' AS DATE) AND CAST(''' + CAST(@DenNgay AS VARCHAR) + ''' AS DATE) and YEAR(H.ThoiGianBatDau)='''+@Nam+'''' 

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.GhiChu LIKE N''%' +@Search+ '%'')';
	END

	IF (@SoChungTu > '')
	BEGIN
		SET @V_SQL = @V_SQL + ' and (H.SoChungTu LIKE N''%' +@SoChungTu+ '%'') ';
	END

	IF @IS_VIEW = 'VB' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and H.CoSoId =''' + @CoSoId + '''';   
	END
	IF @IS_VIEW = 'VR' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and EXISTS (SELECT pbnv1.PhongBanId FROM dbo.NhanVien nv JOIN dbo.PhongBanNhanVien pbnv1 ON pbnv1.NhanVienId = nv.NhanVienId WHERE nv.NhanVienId=''' + @LoginId + '''' +
							  ' AND CHARINDEX('','' + CAST(pbnv1.PhongBanId AS VARCHAR(10)) + '','', '','' + CAST(pbnv.PhongBanId AS VARCHAR(10)) + '','') > 0) ';   
	
	END
	IF @IS_VIEW = 'VE' 
	BEGIN    
		SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @LoginId + '''';   
	END

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY  H.NgayTao desc,' + @OrderClause

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

