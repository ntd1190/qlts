/*************************************************************  
1. Create Date	: 2017.07.31
2. Creator		: NGUYEN THANH BINH
3. Description	: CHI TIẾT PHIẾU BẢO HÀNH
4. Function		: 
5. Example		: 
					--∬
					DECLARE @MESSAGE	NVARCHAR(MAX)
					exec [sp_KhoPhieuBaoHanh_GetChiTietById]  
					  @PHIEUBAOHANHCHITIET_ID		=	16
					, @LOGIN_ID						=	1
					, @MESSAGE						=	@MESSAGE OUTPUT
6. Precaution	:
7. History		:
				  2017.07.31 (Nguyen Thanh Binh) - TẠO MỚI
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuBaoHanh_GetChiTietById]
( 
	  @PHIEUBAOHANHCHITIET_ID			INT				= null			-- @PHIEUBAOHANHCHITIET_ID
	, @LOGIN_ID							NVARCHAR(4000)	= null			-- @LOGIN_ID
	, @MESSAGE							NVARCHAR(MAX)	OUTPUT
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

------------------------------------------------  
---- Khai báo và chuẩn bị biến
	-- Chuẩn bị biến @@PHIEU_XUAT_ID
	SET @PHIEUBAOHANHCHITIET_ID = ISNULL(@PHIEUBAOHANHCHITIET_ID, '');
	IF (@PHIEUBAOHANHCHITIET_ID = '')
		SET @PHIEUBAOHANHCHITIET_ID = 0;

	-- Chuẩn bị biến @LOGIN_ID
	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '');
	IF (@LOGIN_ID = '')
		SET @LOGIN_ID = 0;

	SELECT
				COUNT(*) OVER () MAXCNT
				,KPBH_CT.*
				,TT.TrangThai TenTrangThaiThietBi
				,KPBH.TrangThaiTiepNhan TrangThaiTiepNhan
	FROM		KhoPhieuBaoHanhChiTiet KPBH_CT WITH(NOLOCK, READUNCOMMITTED)
				LEFT JOIN KhoPhieuBaoHanh KPBH ON KPBH_CT.PhieuBaoHanhId = KPBH.PhieuBaoHanhId
				LEFT JOIN TrangThai TT ON KPBH_CT.TrangThaiThietBi = TT.MaTrangThai
	WHERE		KPBH_CT.PhieuBaoHanhChiTietId = @PHIEUBAOHANHCHITIET_ID
SET NOCOUNT OFF
END