/*************************************************************  
1. Create Date	: 2017.06.19
2. Creator		: NGUYEN THANH BINH
3. Description	: XÓA CHI TIẾT CỦA PHIẾU NHẬP
4. Function		: QLDNKHO/KHOPHIEUNHAP/EDIT
5. Example		: 
					--∬
					exec [sp_KhoPhieuNhap_DeleteListChiTietByPhieuNhapId] 
					  @PHIEU_NHAP_ID		=	6
					, @LOGIN_ID				=	1
6. Precaution	:
7. History		:
				  2017.06.19 (Nguyen Thanh Binh) - TẠO MỚI
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuNhap_DeleteListChiTietByPhieuNhapId]
( 
	  @PHIEU_NHAP_ID					NVARCHAR(4000)	= null			-- @PHIEU_NHAP_ID
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
	SET @PHIEU_NHAP_ID = ISNULL(@PHIEU_NHAP_ID, '');
	IF (@PHIEU_NHAP_ID = '')
		SET @PHIEU_NHAP_ID = 0;

	-- Chuẩn bị biến @LOGIN_ID
	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '');
	IF (@LOGIN_ID = '')
		SET @LOGIN_ID = 0;

	-- KIỂM TRA ĐIỀU KIỆN
	SELECT		@COUNT_CHECK = COUNT(*)
	FROM		KhoPhieuNhap KPN WITH(NOLOCK, READUNCOMMITTED)
	WHERE		KPN.PhieuNhapId = @PHIEU_NHAP_ID
				AND KPN.MaTrangThai = 'KPN_LSC'

	IF(@COUNT_CHECK = 0)
	BEGIN
		DELETE FROM		KhoPhieuNhapChiTiet
		WHERE			PhieuNhapId = @PHIEU_NHAP_ID
	END

	SELECT		COUNT(*) OVER () MAXCNT
				,KPN_CT.*
				,KHH.TenHangHoa,KHH.MaHangHoa,KHH.DonViTinh
	FROM		KhoPhieuNhapChiTiet KPN_CT WITH(NOLOCK, READUNCOMMITTED)
				LEFT JOIN KhoHangHoa KHH WITH(NOLOCK, READUNCOMMITTED) ON KPN_CT.HangHoaId = KHH.HangHoaId
	WHERE		KPN_CT.PhieuNhapId = @PHIEU_NHAP_ID

SET NOCOUNT OFF
END