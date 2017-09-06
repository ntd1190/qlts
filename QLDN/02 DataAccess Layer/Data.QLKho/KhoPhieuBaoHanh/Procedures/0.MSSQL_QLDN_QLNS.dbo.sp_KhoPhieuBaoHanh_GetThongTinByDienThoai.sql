/*************************************************************  
1. Create Date	: 2017.08.02
2. Creator		: NGUYEN THANH BINH
3. Description	: PHIẾU BẢO HÀNH
4. Function		: 
5. Example		: 
					--∬
					DECLARE @MESSAGE	NVARCHAR(MAX)
					exec [sp_KhoPhieuBaoHanh_GetThongTinByDienThoai]  
						 @DIENTHOAI					=	'11'
						,@LOGIN_ID					=	68
						,@SKIP						=	0			-- Số dòng skip (để phân trang)
						,@TAKE						=	10			-- Số dòng take (để phân trang)
						,@MESSAGE					=	@MESSAGE OUTPUT
6. Precaution	:
7. History		:
				  2017.08.02 (Nguyen Thanh Binh) - TẠO MỚI
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuBaoHanh_GetThongTinByDienThoai]
( 
	 @DIENTHOAI						NVARCHAR(MAX)	= NULL			-- @DIENTHOAI
	,@LOGIN_ID						NVARCHAR(MAX)	= NULL			-- @LOGIN_ID
	,@SKIP							INT				= 0				-- Số dòng skip (để phân trang)
	,@TAKE							INT				= 10			-- Số dòng take (để phân trang)
	,@MESSAGE						NVARCHAR(MAX)	OUTPUT
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

------------------------------------------------  
---- Khai báo và chuẩn bị biến
	-- Chuẩn bị biến @DIENTHOAI
	SET @DIENTHOAI = ISNULL(@DIENTHOAI, '');

	-- Chuẩn bị biến @LOGIN_ID
	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '');
	IF (@LOGIN_ID = '')
		SET @LOGIN_ID = 0;

	SELECT		 COUNT(*) OVER () MAXCNT
				,PX.NguoiNhanHang TenKhachHang, PX.SoDienThoai DienThoai,PX.SoPhieu SoPhieu,PX.NgayXuat NgayXuat
				,HH.TenHangHoa,HSX.TenHangSanXuat
				,SERI.Series,SERI.ThoiGianBaoHanh
	FROM		KhoPhieuXuat PX
				LEFT JOIN KhoPhieuXuatChiTiet PXCT ON PX.PhieuXuatId = PXCT.PhieuXuatId
				LEFT JOIN KhoHangHoa HH ON PXCT.HangHoaId = HH.HangHoaId
				LEFT JOIN KhoHangSanXuat HSX ON HH.HangSanXuatId = HSX.HangSanXuatId
				LEFT JOIN KhoPhieuSeries SERI ON PX.SoPhieu = SERI.SoPhieu
	WHERE		PX.XoaYN = 'N'
				AND (ISNULL(@DIENTHOAI,'') = '' OR PX.SoDienThoai LIKE '%'+@DIENTHOAI+'%')
	ORDER BY	PX.NgayXuat  OFFSET @SKIP ROWS FETCH NEXT @TAKE ROWS ONLY

	SET NOCOUNT OFF
END