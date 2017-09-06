/*************************************************************  
1. Create Date	: 2017.06.31
2. Creator		: NGUYEN THANH BINH
3. Description	: CHI TIẾT PHIẾU BẢO HÀNH
4. Function		: 
5. Example		: 
					--∬
					DECLARE @MESSAGE	NVARCHAR(MAX)
					exec [sp_KhoPhieuBaoHanh_GetListChiTietByPhieuBaoHanhId]  
					  @PHIEUBAOHANH_ID		=	24
					, @LOGIN_ID				=	1
					, @MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.06.31 (Nguyen Thanh Binh) - TẠO MỚI
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuBaoHanh_GetListChiTietByPhieuBaoHanhId]
( 
	  @PHIEUBAOHANH_ID					NVARCHAR(4000)	= null			-- @PHIEUBAOHANH_ID
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
	SET @PHIEUBAOHANH_ID = ISNULL(@PHIEUBAOHANH_ID, '');
	IF (@PHIEUBAOHANH_ID = '')
		SET @PHIEUBAOHANH_ID = 0;

	-- Chuẩn bị biến @LOGIN_ID
	SET @LOGIN_ID = ISNULL(@LOGIN_ID, '');
	IF (@LOGIN_ID = '')
		SET @LOGIN_ID = 0;

	SELECT
				COUNT(*) OVER () MAXCNT
				,KPBH_CT.*,(KPBH_CT.ChiPhi-KPBH_CT.KhuyenMai+(KPBH_CT.ChiPhi*KPBH_CT.ThueVAT/100)) ThanhTien
				,TT.TrangThai TenTrangThaiThietBi
	FROM		KhoPhieuBaoHanhChiTiet KPBH_CT WITH(NOLOCK, READUNCOMMITTED)
				LEFT JOIN TrangThai TT ON KPBH_CT.TrangThaiThietBi = TT.MaTrangThai
	WHERE		KPBH_CT.PhieuBaoHanhId = @PHIEUBAOHANH_ID
SET NOCOUNT OFF
END