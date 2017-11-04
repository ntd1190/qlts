/**************************************************
1. Create Date	: 2017.11.03
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: báo cáo công khai phương tiện đi lại và tài sản khác
				  biểu 04 Thông tư số 89/2010/TT/BTC
				  ngày 16/6/2010 của Bộ Tài chính
4. Function		: 
5. Example		: 
					EXEC [sp_CongKhai_report_KhacBieu04]
						 @Year				=	'2017'
						,@LoaiKeKhai		=	'3|4'
						,@COSO_ID			=	1
						,@NHANVIEN_ID		=	6
6. Precaution	:
7. History		:
				  2017.11.03 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_CongKhai_report_KhacBieu04]
	 @Year			NVARCHAR(MAX)	=	NULL
	,@LoaiKeKhai	NVARCHAR(MAX)	=	NULL
	,@COSO_ID		INT				=	NULL
	,@NHANVIEN_ID	INT				=	NULL
AS
BEGIN
SET NOCOUNT ON
--------------------------------------------------
DECLARE
	 @col			varchar(max)	=	''
	,@V_DELIMITER	VARCHAR(1)		=	'|'
	,@V_SQL			nvarchar(max)	=	''


SET @LoaiKeKhai = '3|4'

IF OBJECT_ID('tempdb..#NguonNganSach') IS NOT NULL
	DROP TABLE #NguonNganSach

select *
	,(case when TenNguonNganSach like N'nguồn ngân sách' then 'NguonNganSach'
		when TenNguonNganSach like N'Nguồn bảo hiểm' then 'BaoHiem'
		when TenNguonNganSach like N'Nguồn chi không thường xuyên' then 'ChiKhongThuongXuyen'
		when TenNguonNganSach like N'Nguồn ngân sách viện trợ, tài trợ' then 'TaiTro'
		when TenNguonNganSach like N'nguồn khác' then 'NguonKhac'
		else MaNguonNganSach
	end) MaNguon
into #NguonNganSach
from NguonNganSach

-- lấy danh chuỗi sách cột nguồn nhân sách
select @col = coalesce(@col + ',','') + MaNguon
from #NguonNganSach
if @col <> ''
	set @col = substring(@col,2,len(@col))

print ('@col=' + @col)

set @V_SQL = N'
	select ts.TaiSanId
			,ts.TenTaiSan
			,ts.LoaiKeKhai
			,pv.Nam
			,cs.TenCoSo
			,cstt.TenCoSo DonViChuQuan

			,ttkk_oto.NhanHieu
			,ttkk_oto.BienKiemSoat
			,ttkk_oto.TrongTai
			,ttkk_oto.CongSuatXe

			,ttkk_500.KyHieu

			,lts.TenLoai TenLoai

			,(case 
				when htsd.NoiDung like N''Phục vụ chức danh có tiêu chuẩn''  then ''PhucVuChucDanh''
				when htsd.NoiDung like N''Phục vụ công tác chung''  then ''PhucVuChung''
				when htsd.NoiDung like N''Phục vụ HĐ đặc thù''  then ''PhucVuHoatDong''
				when htsd.NoiDung like N''Sử dụng khác''  then ''SuDungKhac''
				else ''''
			end) MaHienTrangSuDung
			,isnull(pv.NguonNganSach,0)/1000 NguonNganSach
			,isnull((pv.NguyenGia - pv.NguonNganSach),0)/1000 NguonKhac
	from (
		select td.*
			,nns.MaNguon
			,isnull(ng.GiaTri,0) GiaTri
		from (
			select _ts.TaiSanId,_td.Nam
				,sum(SLTon + SLTang - SLGiam) SoLuong
				,sum(_ng.GiaTri) NguyenGia
			from TheoDoi _td
				left join TaiSan _ts on _td.TaiSanId = _ts.TaiSanId
				left join NguyenGia _ng on _td.TaiSanId = _ng.TaiSanId
			where
				Nam = @Year
				and charindex(@V_DELIMITER + cast(_ts.LoaiKeKhai as varchar(10)) + @V_DELIMITER,@V_DELIMITER + @LoaiKeKhai + @V_DELIMITER) > 0
				and _ts.CoSoId = @COSO_ID
			group by _ts.TaiSanId,_td.Nam
			having sum(SLTon + SLTang - SLGiam) > 0
		) td
		right join #NguonNganSach nns on nns.NguonNganSachId = nns.NguonNganSachId
		left join NguyenGia ng on nns.NguonNganSachId = ng.NguonNganSachId and ng.TaiSanId = td.TaiSanId
	) rs
	pivot(
		sum(GiaTri)
		for MaNguon in (BaoHiem,NguonNganSach,ChiKhongThuongXuyen,TaiTro,NguonKhac)
	) pv
	left join TaiSan ts on pv.TaiSanId = ts.TaiSanId
	left join CoSo cs on ts.CoSoId = cs.CoSoId
	left join CoSo cstt on cs.TrucThuoc = cstt.CoSoId
	left join ThongTinKeKhai_Oto ttkk_oto on ts.TaiSanId = ttkk_oto.TaiSanId
	left join ThongTinKeKhai_Tren500 ttkk_500 on ts.TaiSanId = ttkk_500.TaiSanId
	left join HienTrangSuDung htsd on ttkk_oto.HienTrangSuDung = htsd.HienTrangSuDungId or ttkk_500.HienTrangSuDung = htsd.HienTrangSuDungId
	left join LoaiTaiSan lts on ts.LoaiId = lts.LoaiId
	where ts.TaiSanId is not null
'
print @v_sql

EXECUTE sp_executesql @V_SQL,N'
	 @Year			varchar(4)		=	null
	,@LoaiKeKhai	varchar(max)	=	null
	,@COSO_ID		int				=	null
	,@V_DELIMITER	VARCHAR(10)		=	null
	'
	,@Year			=	@Year
	,@LoaiKeKhai	=	@LoaiKeKhai
	,@COSO_ID		=	@COSO_ID
	,@V_DELIMITER	=	@V_DELIMITER
--------------------------------------------------
SET NOCOUNT OFF
END