USE [MSSQL_QLDN_QLNS]
GO
/****** Object:  StoredProcedure [dbo].[sp_PheDuyet_GetListPheDuyetByCriteria]    Script Date: 05/24/2017 10:12:53 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*************************************************************  
1. Create Date	: 
2. Creator		: 
3. Description	: Lấy danh sách Nghỉ phép theo điều kiện
4. Function		: QLDNMAIN/Issue/List
5. Example		: 

exec sp_Issue_GetListIssueByCriteria @FIELD=N'*',@SEARCH_KHACHANG=N'18',@SEARCH_TUNGAYTAO=N'2017-05-16',
@SEARCH_DENNGAYTAO=N'2017-05-24',@SEARCH_LOAIISSUE=N'1',@SEARCH_TUNGAYKETTHUC=N'2017-05-09',
@SEARCH_DENNGAYKETTHUC=N'2017-05-22',@SEARCH_NGUOIXULY=N'17',@SEARCH_NGUOITAO=N'2',@SEARCH_TRANGTHAI=N'2',
@SEARCH_PHONGBAN=N'49',@ORDER_CLAUSE=N'A.IssueId asc',@SKIP=0,@TAKE=10

6. Precaution	:
7. History		:
				  2017.04.15() - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_PheDuyet_GetListPheDuyetByCriteria]
( 
	@FIELD				nvarchar(500)	= null			-- Danh sách các field cần lấy
	, @SEARCH_TUNGAY		nvarchar(500)	= null
	, @SEARCH_DENNGAY		nvarchar(500)	= null
	, @SEARCH_LOAI 			nvarchar(500)	= null
	, @SEARCH_NGUOITAO		nvarchar(500)	= null
	, @SEARCH_TRANGTHAI		nvarchar(500)	= null
	, @SEARCH_PHONGBAN		nvarchar(500)	= null
	, @ORDER_CLAUSE		nvarchar(500)	= null			-- Mệnh đề order by (VD: NhanVienId ASC|DESC,HoTen ASC|DESC)

	, @SKIP				int				= null			-- Số dòng skip (để phân trang)
	, @TAKE				int				= null			-- Số dòng take (để phân trang)
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
	DECLARE @V_WHERE_CLAUSE NVARCHAR(4000) 
	DECLARE @V_FIELD NVARCHAR(4000) = ''
	DECLARE @V_ORDER_CLAUSE NVARCHAR(4000) = ''

	-- Chuẩn bị biến @FIELD
	SET @FIELD = ISNULL(@FIELD,'*')

	IF (@FIELD = '')
		SET @FIELD = '*';
	----------

	-- Chuẩn bị biến @V_WHERE_CLAUSE
	SET @V_WHERE_CLAUSE = N' 1=1 ';

	-- Chuẩn bị biến @Skip & @Take
	IF (@SKIP IS NULL)
		SET @SKIP = 0;

	IF (@TAKE IS NULL)
		SET @TAKE = 50;
	----------

	-- Chuẩn bị biến @ORDER_CLAUSE
	IF (@ORDER_CLAUSE IS NULL)
		SET @ORDER_CLAUSE = ' MAXCNT ';

	IF (@ORDER_CLAUSE = '')
		SET @ORDER_CLAUSE = ' MAXCNT ';
	----------

---- Gọi SP lấy thông tin Cấu Hình
    
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	SET @V_SQL = N' SELECT COUNT(*) OVER () AS MAXCNT,* FROM (
	select 1 as Id,a.PhieuCongTacId as PheDuyetId,a.NgayDi as NgayTao,a.NoiDung as TieuDe,N''Phiếu công tác'' as LoaiPhieu,a.NhanVienId,b.ho +'' ''+b.ten as NhanVien, a.NguoiDuyet,c.HoTen,a.MaTrangThai,d.TrangThai,e.TenPhongBan,''PCT'' as MA ,''PhieuCongTac'' as TableName, isnull(sum(ct.SoLuong*ct.DonGia),0) as SoTien,b.PhongBanId
from PhieuCongTac a left join PhieuCongTacChiTiet ct on a.PhieuCongTacId=ct.PhieuCongTacId inner join NhanVien b on a.NhanVienId=b.NhanVienId 
left join [MSSQL_QLDN_MAIN].dbo.NguoiDung c on a.NguoiDuyet=c.NguoiDungId 
inner join TrangThai d on a.MaTrangThai=d.MaTrangThai
inner join PhongBan e on b.PhongBanId=e.PhongBanId where a.XoaYN=''N''
group by a.NgayDi,a.NhanVienId,b.ho ,b.ten, a.NguoiDuyet,c.HoTen,a.MaTrangThai,d.TrangThai,e.TenPhongBan,a.PhieuCongTacId,a.NoiDung,b.PhongBanId
union all 
select 2 as Id,a.DeNghiThanhToanId as PheDuyetId,a.Ngay as NgayTao,a.TieuDe,N''Phiếu đề nghị thanh toán'' as LoaiPhieu,a.NhanVienId,b.ho +'' ''+b.ten as NhanVien, a.NguoiDuyet,c.HoTen,a.MaTrangThai,d.TrangThai,e.TenPhongBan,''PDNTT'' as MA ,''PhieuCongTac'' as TableName, isnull(sum(ct.SoLuong*ct.DonGia),0) as SoTien,b.PhongBanId
from DeNghiThanhToan a left join DeNghiThanhToanChiTiet ct on a.DeNghiThanhToanId=ct.DeNghiThanhToanId inner join NhanVien b on a.NhanVienId=b.NhanVienId 
left join [MSSQL_QLDN_MAIN].dbo.NguoiDung c on a.NguoiDuyet=c.NguoiDungId 
inner join TrangThai d on a.MaTrangThai=d.MaTrangThai
inner join PhongBan e on b.PhongBanId=e.PhongBanId where a.XoaYN=''N''
group by a.Ngay,a.NhanVienId,b.ho ,b.ten, a.NguoiDuyet,c.HoTen,a.MaTrangThai,d.TrangThai,e.TenPhongBan,a.DeNghiThanhToanId,a.TieuDe,b.PhongBanId

union all 
select 3 as Id,TamUngId as PheDuyetId,a.Ngay as NgayTao,a.LyDo as TieuDe,N''Phiếu tạm ứng'' as LoaiPhieu,a.NhanVienId,b.ho +'' ''+b.ten as NhanVien, a.NguoiDuyet,c.HoTen,a.MaTrangThai,d.TrangThai,e.TenPhongBan,''TU'' as MA ,''TamUng'' as TableName,0 as SoTien,b.PhongBanId
from TamUng a inner join NhanVien b on a.NhanVienId=b.NhanVienId 
left join [MSSQL_QLDN_MAIN].dbo.NguoiDung c on a.NguoiDuyet=c.NguoiDungId 
inner join TrangThai d on a.MaTrangThai=d.MaTrangThai
inner join PhongBan e on b.PhongBanId=e.PhongBanId where a.XoaYN=''N''

union all 
select 4 as Id,TangCaId as PheDuyetId,a.NgayTangCa as NgayTao,a.TieuDe,N''Phiếu tăng ca'' as LoaiPhieu,a.NhanVienId,b.ho +'' ''+b.ten as NhanVien, a.NguoiDuyet,c.HoTen,a.MaTrangThai,d.TrangThai,e.TenPhongBan,''TC'' as MA  ,''TangCa'' as TableName,0 as SoTien,b.PhongBanId
from TangCa a inner join NhanVien b on a.NhanVienId=b.NhanVienId 
left join [MSSQL_QLDN_MAIN].dbo.NguoiDung c on a.NguoiDuyet=c.NguoiDungId 
inner join TrangThai d on a.MaTrangThai=d.MaTrangThai
inner join PhongBan e on b.PhongBanId=e.PhongBanId where a.XoaYN=''N''

union all 
select 5 as Id,NghiPhepId as PheDuyetId,a.TuNgay as NgayTao,a.TieuDe,N''Phiếu nghỉ phép'' as LoaiPhieu,a.NhanVienId,b.ho +'' ''+b.ten as NhanVien, a.NguoiDuyet,c.HoTen,a.MaTrangThai,d.TrangThai,e.TenPhongBan,''NP'' as MA ,''NghiPhep'' as TableName,0 as SoTien,b.PhongBanId
from NghiPhep a inner join NhanVien b on a.NhanVienId=b.NhanVienId 
left join [MSSQL_QLDN_MAIN].dbo.NguoiDung c on a.NguoiDuyet=c.NguoiDungId 
inner join TrangThai d on a.MaTrangThai=d.MaTrangThai
inner join PhongBan e on b.PhongBanId=e.PhongBanId where a.XoaYN=''N'') as PheDuyet';

	IF( @SEARCH_TUNGAY <> '' AND @SEARCH_DENNGAY <> '')
		BEGIN 
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' and NgayTao BETWEEN  ''' + @SEARCH_TUNGAY + ''' AND '''+ @SEARCH_DENNGAY + '''';
		END
		ELSE IF @SEARCH_TUNGAY <> ''
		BEGIN
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' and NgayTao >=  ''' + @SEARCH_TUNGAY+ '''';
		END
		ELSE IF @SEARCH_DENNGAY <>''
		BEGIN 
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' and NgayTao <=  ''' + @SEARCH_DENNGAY + '''';
		END
		ElSE
		BEGIN 
			SET @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + ' and MONTH(NgayTao) = MONTH(getdate())';
		END


   IF @SEARCH_LOAI<> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' Id in(' + @SEARCH_LOAI + ') ' ;
	END


	IF @SEARCH_NGUOITAO <> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' NhanVienId in(' + @SEARCH_NGUOITAO + ') ' ;
	END

		IF @SEARCH_TRANGTHAI<> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' MaTrangThai in(' + @SEARCH_TRANGTHAI + ') ' ;
	END

			IF @SEARCH_PHONGBAN<> ''
	BEGIN
	    IF(@V_WHERE_CLAUSE!='')
			set @V_WHERE_CLAUSE = @V_WHERE_CLAUSE + 'and'
		SET @V_WHERE_CLAUSE =  @V_WHERE_CLAUSE+' PhongBanId in(' + @SEARCH_PHONGBAN + ') ' ;
	END

	-- Build Where clause

	IF @V_WHERE_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' WHERE ' + @V_WHERE_CLAUSE
					

	-- Build Order clause
	IF @ORDER_CLAUSE > ''
	SET @V_SQL = @V_SQL + ' ORDER BY ' + @ORDER_CLAUSE;

	-- Build Skip clause
	SET @V_SQL = @V_SQL + ' ' + 'OFFSET '+ CAST(@SKIP AS nvarchar(20)) +' ROWS';

	-- Build Take clause
	SET @V_SQL = @V_SQL + ' ' + 'FETCH NEXT '+CAST(@TAKE AS nvarchar(20)) +' ROWS ONLY';

---- Thực thi câu SQL
	print(@V_SQL)
	EXEC(@V_SQL);

---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

