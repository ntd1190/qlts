/*************************************************************  
1. Create Date	: 2017.06.28
2. Creator		: NGUYEN THANH BINH
3. Description	: XÓA CHI TIẾT CỦA PHIẾU XUẤT
4. Function		: QLDNKHO/KHOPHIEUXUAT/EDIT
5. Example		: 
					--∬
					exec [sp_KhoPhieuXuat_DeleteListChiTietByPhieuXuatId] 
					  @PHIEU_XUAT_ID		=	6
					, @LOGIN_ID				=	1
6. Precaution	:
7. History		:
				  2017.06.28 (Nguyen Thanh Binh) - TẠO MỚI
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuXuat_DeleteListChiTietByPhieuXuatId]
( 
	  @PHIEU_XUAT_ID					NVARCHAR(4000)	= null			-- @PHIEU_XUAT_ID
	, @LOGIN_ID							NVARCHAR(4000)	= null			-- @LOGIN_ID
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước
	DECLARE @COUNT_CHECK			INT		=	0

	-- Chuẩn bị biến @PHIEU_NHAP_ID
	SET @PHIEU_XUAT_ID = ISNULL(@PHIEU_XUAT_ID, '');
	IF (@PHIEU_XUAT_ID = '')
		SET @PHIEU_XUAT_ID = 0;

	-- Chuẩn bị biến @LOGIN_ID
	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '');
	IF (@LOGIN_ID = '')
		SET @LOGIN_ID = 0;

	-- KIỂM TRA ĐIỀU KIỆN
	SELECT		@COUNT_CHECK = COUNT(*)
	FROM		KhoPhieuXuat KPX WITH(NOLOCK, READUNCOMMITTED)
	WHERE		KPX.PhieuXuatId = @PHIEU_XUAT_ID
				AND KPX.MaTrangThai = 'KPX_LSC'

	IF(@COUNT_CHECK = 0)
	BEGIN
		DELETE FROM		KhoPhieuXuatChiTiet
		WHERE			PhieuXuatId = @PHIEU_XUAT_ID
	END

	SELECT		COUNT(*) OVER () MAXCNT
				,KPX_CT.*
				,KHH.TenHangHoa,KHH.MaHangHoa,KHH.DonViTinh
	FROM		KhoPhieuXuatChiTiet KPX_CT WITH(NOLOCK, READUNCOMMITTED)
				LEFT JOIN KhoHangHoa KHH WITH(NOLOCK, READUNCOMMITTED) ON KPX_CT.HangHoaId = KHH.HangHoaId
	WHERE		KPX_CT.PhieuXuatId = @PHIEU_XUAT_ID

SET NOCOUNT OFF
END