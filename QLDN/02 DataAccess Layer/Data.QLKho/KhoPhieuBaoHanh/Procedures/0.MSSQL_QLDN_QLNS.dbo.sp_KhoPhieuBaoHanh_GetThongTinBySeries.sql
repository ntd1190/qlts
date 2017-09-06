/*************************************************************  
1. Create Date	: 2017.08.02
2. Creator		: NGUYEN THANH BINH
3. Description	: CHI TIẾT PHIẾU BẢO HÀNH
4. Function		: 
5. Example		: 
					--∬
					DECLARE @MESSAGE	NVARCHAR(MAX)
					exec [sp_KhoPhieuBaoHanh_GetThongTinBySeries]  
					  @SERIES						=	'11'
					, @LOGIN_ID						=	68
					, @MESSAGE						=	@MESSAGE OUTPUT
6. Precaution	:
7. History		:
				  2017.08.02 (Nguyen Thanh Binh) - TẠO MỚI
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuBaoHanh_GetThongTinBySeries]
( 
	  @SERIES							NVARCHAR(MAX)	= NULL			-- @PHIEUBAOHANHCHITIET_IDS
	, @LOGIN_ID							NVARCHAR(MAX)	= NULL			-- @LOGIN_ID
	, @MESSAGE							NVARCHAR(MAX)	OUTPUT
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

------------------------------------------------  
---- Khai báo và chuẩn bị biến
	-- Chuẩn bị biến @@PHIEU_XUAT_ID
	SET @SERIES = ISNULL(@SERIES, '');

	-- Chuẩn bị biến @LOGIN_ID
	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '');
	IF (@LOGIN_ID = '')
		SET @LOGIN_ID = 0;

	SELECT		COUNT(*) OVER () MAXCNT
				,PX.NguoiNhanHang TenKhachHang, PX.SoDienThoai DienThoai,PX.SoPhieu SoPhieu,PX.NgayXuat NgayXuat
				,HH.TenHangHoa,HSX.TenHangSanXuat
				,SERIES.Series,SERIES.ThoiGianBaoHanh
	FROM		KhoPhieuSeries SERIES
				LEFT JOIN KhoPhieuXuat PX ON PX.SoPhieu = SERIES.SoPhieu
				LEFT JOIN KhoPhieuXuatChiTiet PXCT ON PX.PhieuXuatId = PXCT.PhieuXuatId
				LEFT JOIN KhoHangHoa HH ON PXCT.HangHoaId = HH.HangHoaId
				LEFT JOIN KhoHangSanXuat HSX ON HH.HangSanXuatId = HSX.HangSanXuatId
	WHERE		Series = @SERIES
SET NOCOUNT OFF
END