USE [QLTS]

GO

ALTER PROC [dbo].[sp_KhoTonKho_GetListKhoTonKhoChiTietByCriteria]
( 
	  @CoSoId	        nvarchar(500)	= null			
	, @NhanVienId	    nvarchar(500)	= null		
	, @Search			nvarchar(500)   = null	
	, @SEARCH_STRING	nvarchar(500)	= null	
	,@KhoTaiSanId		varchar(500)		= null	
	,@ThangNam			varchar(4)		= null	
	,@KhoTonKhoId		varchar(500)		= null	
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
		  @CHUC_NANG = 'CN0045',
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
	Select COUNT(*) OVER () AS MAXCNT, a.KhoTonKhoId,b.KhoTonKhoChiTietId,a.KhoTaiSanId,c.TenKhoTaiSan,a.CoSoId,a.ThangNam,a.TrangThai,b.TaiSanId,d.MaTaiSan,d.TenTaiSan,d.DonViTinh,
	b.DonGia,b.GiaMua,b.GiaBan,b.TonDau,b.TonDau * b.DonGia as SoTien,b.NguonNganSachId,e.TenNguonNganSach,b.NhaCungCapId,f.TenNhaCungCap,b.HanDung,b.LoSanXuat,a.TrangThai
	 from KhoTonKho a 
	inner join KhoTonKhoChiTiet b on a.KhoTonKhoId=b.KhoTonKhoId
	inner join KhoTaiSan c on a.KhoTaiSanId=c.KhoTaiSanId
	inner join TaiSan d on b.TaiSanId=d.TaiSanId
	left join NguonNganSach e on b.NguonNganSachId=e.NguonNganSachId
	left join NhaCungCap f on b.NhaCungCapId=f.NhaCungCapId where a.CoSoId =''' + @CoSoId + ''' and b.TonDau>0';  

	-- Build Where clause
	-- Where clause Quick search
	IF @Search > ''
	SET @V_SQL = @V_SQL + ' and (MaTaiSan LIKE N''%' +@Search+ '%'' OR TenTaiSan LIKE  N''%' +@Search+ '%'')';
	IF @KhoTonKhoId <> 0
	SET @V_SQL = @V_SQL + ' and a.KhoTonKhoId =''' +@KhoTonKhoId+ '''';
	else
	SET @V_SQL = @V_SQL + ' and a.KhoTaiSanId =''' + @KhoTaiSanId + ''' and a.ThangNam =''' +@ThangNam+'''';

	-- Build Order clause
	IF @OrderClause > ''
	SET @V_SQL = @V_SQL + ' ORDER BY d.TenTaiSan' ;

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

