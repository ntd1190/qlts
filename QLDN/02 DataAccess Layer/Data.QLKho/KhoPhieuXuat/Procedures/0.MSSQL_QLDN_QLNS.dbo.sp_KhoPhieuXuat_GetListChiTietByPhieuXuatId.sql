/*************************************************************  
1. Create Date	: 2017.06.28
2. Creator		: NGUYEN THANH BINH
3. Description	: CHI TIẾT PHIẾU NHẬP
4. Function		: QLDNKHO/KHOPHIEUXUAT/EDIT
5. Example		: 
					--∬
					exec [sp_KhoPhieuXuat_GetListChiTietByPhieuXuatId]  
					  @PHIEU_XUAT_ID		=	7
					, @LOGIN_ID				=	1
6. Precaution	:
7. History		:
				  2017.06.28 (Nguyen Thanh Binh) - TẠO MỚI
				  2017.08.16 (Nguyen Thanh Binh) - LẤY THỜI GIAN BẢO HÀNH TỪ CHI TIẾT THAY CHO HÀNG HÓA
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuXuat_GetListChiTietByPhieuXuatId]
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
	-- Chuẩn bị biến @PHIEU_XUAT_ID
	SET @PHIEU_XUAT_ID = ISNULL(@PHIEU_XUAT_ID, '');
	IF (@PHIEU_XUAT_ID = '')
		SET @PHIEU_XUAT_ID = 0;

	-- Chuẩn bị biến @LOGIN_ID
	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '');
	IF (@LOGIN_ID = '')
		SET @LOGIN_ID = 0;

	SELECT
				COUNT(*) OVER () MAXCNT
				,KPX_CT.*
				,KHH.TenHangHoa,KHH.MaHangHoa,KHH.DonViTinh
	FROM
				KhoPhieuXuatChiTiet KPX_CT WITH(NOLOCK, READUNCOMMITTED)
				LEFT JOIN KhoHangHoa KHH WITH(NOLOCK, READUNCOMMITTED) ON KPX_CT.HangHoaId = KHH.HangHoaId
	WHERE
				KPX_CT.PhieuXuatId = @PHIEU_XUAT_ID
SET NOCOUNT OFF
END