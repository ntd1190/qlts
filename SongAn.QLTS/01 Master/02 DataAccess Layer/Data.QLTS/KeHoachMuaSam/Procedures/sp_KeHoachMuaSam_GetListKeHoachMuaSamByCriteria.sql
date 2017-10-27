USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_KeHoachMuaSam_GetListKeHoachMuaSamByCriteria]    Script Date: 10/27/2017 08:48:44 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROC [dbo].[sp_KeHoachMuaSam_GetListKeHoachMuaSamByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @SEARCH_STRING	nvarchar(500)	= null			
	, @OrderClause		nvarchar(500)	= null				
	, @SKIP				int				= null				-- Số dòng skip (để phân trang)
	, @TAKE				int				= null				-- Số dòng take (để phân trang)
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @V_SQL NVARCHAR(4000) 
	DECLARE @V_SEARCH_STRING NVARCHAR(4000) 
	,@Nam	VARCHAR(MAX)	=	NULL
	--LAY SO LIEU CAU HINH THONG SO
	EXEC sp_ThongSoUser_GetThongSo @LOAITHONGSO='SoLieuNam',@NHANVIEN=@NhanVienId,@NAM=@Nam OUTPUT;


	SET @SEARCH_STRING = ISNULL(@SEARCH_STRING, '')
	IF @SEARCH_STRING <> ''
	BEGIN	
		SET @SEARCH_STRING = N'%' + @SEARCH_STRING + '%'
		SET @V_SEARCH_STRING = CAST(@SEARCH_STRING AS VARCHAR(200))	
	END	
	----------

	DECLARE @IS_VIEW varchar(10) = '0'
  	exec [QLTS_MAIN].dbo.[sp_QuyenTacVu_CheckQuyenTacVuByChucNang]
		@NHAN_VIEN_ID = @NhanVienId,
		@CO_SO_ID = @CoSoId,
		@CHUC_NANG = 'CN0021',
		@QUYEN=@IS_VIEW OUTPUT
		PRINT(@IS_VIEW)
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
	SELECT COUNT(*) OVER () AS MAXCNT,a.*,b.TrangThai
	FROM KeHoachMuaSam a 
	LEFT JOIN dbo.Duyet b ON b.DuyetId = a.DuyetId
	LEFT JOIN NhanVien nv ON nv.NhanVienId = a.NguoiTao
	where a.Nam = '''+@Nam+''' ';

	-- Build Where clause
	-- Where clause Quick search

	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (Nam LIKE N''%' +@Search+ '%'' OR NoiDung LIKE  N''%' +@Search+ '%'')';


		IF @IS_VIEW = 'VB' 
	BEGIN			 
			SET @V_SQL = @V_SQL + ' and a.CoSoId =''' + @CoSoId + '''';	  
	END
	  IF @IS_VIEW = 'VR' 
	BEGIN			 
			SET @V_SQL = @V_SQL + ' and nv.PhongBanId = (select PhongBanId from NhanVien where NhanVienId=''' + @NhanVienId + ''')';	  
	END
	 IF @IS_VIEW = 'VE' 
	BEGIN			 
			SET @V_SQL = @V_SQL + ' and nv.NhanVienId =''' + @NhanVienId + '''';	  
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

