/*************************************************************  
1. Create Date	: 2017.08.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: NHẬP THẺ KHO
4. Function		: QLDNKHO/KHOPHIEUNHAP
5. Example		: 
					DECLARE		@MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoPhieuNhap_LuuSoCai]
							 @PHIEU_NHAP_ID		=	2042
							,@LOGIN_ID				=	'68'
							,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE

6. Precaution	:
7. History		:
				  2017.08.14 (NGUYỄN THANH BÌNH) - Tạo mới
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuNhap_LuuSoCai]
		  @PHIEU_NHAP_ID			INT				=	NULL
	    , @LOGIN_ID					INT				=	NULL
	    , @MESSAGE					NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
DECLARE		@V_SO_PHIEU					NVARCHAR(MAX)		=	N''
--DECLARE		@V_PHIEU_ID					INT					=	0
DECLARE		@V_SO_LUONG_NHAP			DECIMAL				=	0
DECLARE		@V_DON_GIA_NHAP				DECIMAL				=	0
DECLARE		@V_TONKHOID					INT					=	0
DECLARE		@V_ROWID					INT					=	0
DECLARE		@V_KHOHANGID				INT					=	0
DECLARE		@V_HANGHOAID				INT					=	0
DECLARE		@V_LOHANG					NVARCHAR(MAX)		=	''
DECLARE		@V_NGAY_NHAP_PHIEU			DATETIME			=	NULL
DECLARE		@V_THANG_NAM				DATETIME			=	NULL -- TÍNH NGÀY 01 THÁNG TRƯỚC ĐÓ
DECLARE		@V_THANG_NHAP_PHIEU			DATETIME			=	NULL -- TÍNH NGÀY 01 THÁNG NHẬP PHIẾU
DECLARE		@V_CHI_TIET_ID				INT					=	0
DECLARE		@V_CHECK_CHI_TIET			INT					=	0
DECLARE		@V_TRANG_THAI_PHIEU_NHAP	NVARCHAR(MAX)		=	N''
--------------------

--SET  @V_PHIEU_ID=@PHIEU_XUAT_ID;

-- TAO BANG TAM CHUA THÔNG TIN CHI TIẾT
SELECT	KPNCT.PhieuNhapChiTietId, KPNCT.HangHoaId, KPNCT.SoLuong, KPNCT.DonGia,KPNCT.LoHang
		,KHH.MaHangHoa
INTO	#PHIEU_CHITIET 
FROM	KhoPhieuNhapChiTiet KPNCT
		LEFT JOIN KhoHangHoa KHH ON KPNCT.HangHoaId = KHH.HangHoaId
		LEFT JOIN KhoPhieuNhap KPN ON KPNCT.PhieuNhapId = KPN.PhieuNhapId
WHERE	KPNCT.PhieuNhapId = @PHIEU_NHAP_ID

SELECT * FROM #PHIEU_CHITIET

-- LẤY THÔNG TIN PHIẾU
SELECT	 @V_KHOHANGID = KPN.KhoNhap
		,@V_SO_PHIEU = KPN.SoPhieu
		,@V_NGAY_NHAP_PHIEU = KPN.NgayNhap
		,@V_TRANG_THAI_PHIEU_NHAP = KPN.MaTrangThai
FROM	KhoPhieuNhap KPN
		LEFT JOIN KhoKhoHang KHO ON KPN.KhoNhap = KHO.KhoHangId
WHERE	PhieuNhapId = @PHIEU_NHAP_ID

-- KIỂM TRA TRANG THÁI PHIẾU
IF @V_TRANG_THAI_PHIEU_NHAP = 'KPN_LSC'
BEGIN
	--ROLLBACK
	SET @MESSAGE = N'CHECK_INPUT|1|Phiếu này đã lưu sổ cái'
	SELECT * FROM KhoPhieuNhap WHERE PhieuNhapId = @PHIEU_NHAP_ID
	RETURN
END

-- KIỂM TRA PHIẾU CHI TIẾT
IF NOT EXISTS(SELECT * FROM KhoPhieuNhapChiTiet WHERE PhieuNhapId = @PHIEU_NHAP_ID ) OR EXISTS(SELECT * FROM KhoPhieuNhapChiTiet WHERE PhieuNhapId = @PHIEU_NHAP_ID AND SoLuong=0)
BEGIN	
	--ROLLBACK
	SET @MESSAGE = N'CHECK_INPUT|2|Không tìm thấy chi tiết - Số lượng phải > 0'
	SELECT * FROM KhoPhieuNhap WHERE PhieuNhapId = @PHIEU_NHAP_ID
	RETURN
END

-- KIỂM TRA PHIẾU CHI TIẾT LƯU TRONG THẺ KHO
/*
IF EXISTS( SELECT * FROM KhoPhieuXuat PX JOIN KhoPhieuXuatChiTiet CT ON PX.PhieuXuatId=CT.PhieuXuatId
			WHERE PX.PhieuXuatId=@PHIEU_XUAT_ID AND
				  EXISTS(SELECT * FROM KhoTheKho WHERE SoPhieu=PX.SoPhieu AND PhieuId=PX.PhieuXuatId AND PhieuChiTietId=CT.PhieuXuatChiTietId)
		 )
BEGIN
	SET @MESSAGE = N'CHECK_INPUT|3|Chi tiết đã tồn tại trong thẻ kho'
	SELECT * FROM KhoPhieuXuat WHERE PhieuXuatId = @PHIEU_XUAT_ID
	RETURN
END
*/
--------------------
BEGIN TRANSACTION PHIEUNHAP_LSC

BEGIN TRY

---- TÍNH TOÁN THÁNG TRƯỚC
	SET @V_THANG_NHAP_PHIEU = DATEADD(MONTH, DATEDIFF(MONTH, 0, @V_NGAY_NHAP_PHIEU), 0) -- NGÀY 1 THÁNG NHẬP PHIẾU (20/08/2017 => 01/08/2017)

	SELECT		@V_TONKHOID = TonKhoId 
					FROM		KhoTonKho
					WHERE		ThangNam = @V_THANG_NHAP_PHIEU AND  KhoHangId = @V_KHOHANGID

	SET @V_ROWID = @V_TONKHOID

	IF NOT EXISTS (	SELECT		TonKhoId 
					FROM		KhoTonKho
					WHERE		ThangNam = @V_THANG_NHAP_PHIEU AND  KhoHangId = @V_KHOHANGID)
	BEGIN
		-- Select tháng trước
		SELECT TOP 1	 @V_THANG_NAM		=	DATEADD(MONTH, DATEDIFF(MONTH, 0, ThangNam), 0)
						,@V_TONKHOID		=	TonKhoId
		FROM			KhoTonKho 
		WHERE			KhoHangId = @V_KHOHANGID
		ORDER BY		ThangNam DESC

		IF (@V_TONKHOID <> 0)
		BEGIN
			WHILE(@V_THANG_NAM<@V_THANG_NHAP_PHIEU) -- LẶP TỪ THÁNG CUỐI CÙNG ĐẾN THÁNG NHẬP PHIẾU
			BEGIN
				SET @V_THANG_NAM=DATEADD(month, 1, @V_THANG_NAM)

				--Insert KhoTonKho
				INSERT INTO KhoTonKho	(	KhoHangId		,ThangNam		,Ten													,NgayTao	,MaTrangThai	,NguoiTao	)
				VALUES					(	@V_KHOHANGID	,@V_THANG_NAM	,'THÁNG ' + CAST(MONTH(@V_THANG_NAM) AS VARCHAR(10))	,GETDATE()	,'TonKho_KN'	,@LOGIN_ID	)
				
				SET @V_ROWID = @@IDENTITY

				--Insert tháng trước vào KhoTonKhoChiTiet
				INSERT INTO KhoTonKhoChiTiet	(	TonKhoId	,HangHoaId	,GiaNhap	,LoHang	,TonDau								,SoLuongNhap	,SoLuongXuat)
				SELECT								@V_ROWID	,HangHoaId	,GiaNhap	,LoHang	,TonDau + SoLuongNhap - SoLuongXuat	,0				,0
				FROM KhoTonKhoChiTiet KTKCT JOIN KhoTonKho KTK ON KTKCT.TonKhoId = KTK.TonKhoId
				WHERE KTKCT.TonKhoId = @V_TONKHOID
			END
		END
		ELSE
		BEGIN
			--Insert KhoTonKho
			INSERT INTO KhoTonKho	(	KhoHangId		,ThangNam				,Ten														,NgayTao	,MaTrangThai	,NguoiTao	)
			VALUES					(	@V_KHOHANGID	,@V_THANG_NHAP_PHIEU	,'THÁNG ' + CAST(MONTH(@V_THANG_NHAP_PHIEU) AS VARCHAR(10))	,GETDATE()	,'TonKho_KN'	,@LOGIN_ID	)
			SET @V_ROWID = @@IDENTITY
		END
	END
--------------------

	WHILE (SELECT COUNT(PhieuNhapChiTietId) FROM #PHIEU_CHITIET) > 0
	BEGIN
	    SELECT TOP 1
			@V_CHI_TIET_ID = PhieuNhapChiTietId,
			@V_HANGHOAID = HangHoaId,
			@V_LOHANG = LoHang,
			@V_SO_LUONG_NHAP = SoLuong,
			@V_DON_GIA_NHAP = DonGia
		FROM #PHIEU_CHITIET


		IF EXISTS (	SELECT	TonKhoChiTietId
					FROM	KhoTonKhoChiTiet
					WHERE	TonKhoId = @V_ROWID AND LoHang = @V_LOHANG AND HangHoaId = @V_HANGHOAID AND GiaNhap = @V_DON_GIA_NHAP)
		BEGIN
			UPDATE	KhoTonKhoChiTiet	
			SET		 SoLuongNhap	=	SoLuongNhap + @V_SO_LUONG_NHAP
			WHERE	TonKhoId = @V_ROWID AND LoHang = @V_LOHANG AND HangHoaId = @V_HANGHOAID AND GiaNhap = @V_DON_GIA_NHAP
		END
		ELSE
		BEGIN
			INSERT INTO	KhoTonKhoChiTiet	(	HangHoaId		,LoHang		,TonDau		,GiaNhap			,SoLuongNhap			,SoLuongXuat	,TonKhoId	)
			VALUES							(	@V_HANGHOAID	,@V_LOHANG	,0			,@V_DON_GIA_NHAP	,@V_SO_LUONG_NHAP		,0				,@V_ROWID	)
		END

		--Cập nhật gia trị tồn đầu cho các tháng sau nó 
		 UPDATE		KhoTonKhoChiTiet 
		 SET		KhoTonKhoChiTiet.TonDau=KhoTonKhoChiTiet.TonDau + @V_SO_LUONG_NHAP
		 FROM		KhoTonKho
		 WHERE		KhoTonKhoChiTiet.TonKhoId = KhoTonKho.TonKhoId AND KhoTonKho.ThangNam>@V_THANG_NHAP_PHIEU
					AND KhoTonKhoChiTiet.HangHoaId = @V_HANGHOAID AND KhoTonKhoChiTiet.GiaNhap = @V_DON_GIA_NHAP AND KhoTonKhoChiTiet.LoHang = @V_LOHANG

		DELETE #PHIEU_CHITIET WHERE PhieuNhapChiTietId = @V_CHI_TIET_ID
	END

	UPDATE KhoPhieuNhap SET MaTrangThai = 'KPN_LSC' WHERE PhieuNhapId = @PHIEU_NHAP_ID

	DROP TABLE #PHIEU_CHITIET
	COMMIT
--------------------
END TRY
BEGIN CATCH
	ROLLBACK
	DECLARE @ErrorMessage NVARCHAR(4000);
    DECLARE @ErrorSeverity INT;
    DECLARE @ErrorState INT;

    SELECT 
        @ErrorMessage = ERROR_MESSAGE(),
        @ErrorSeverity = ERROR_SEVERITY(),
        @ErrorState = ERROR_STATE();

    RAISERROR (@ErrorMessage, -- Message text.
               @ErrorSeverity, -- Severity.
               @ErrorState -- State.
               );
END CATCH
	SELECT * FROM KhoPhieuNhap WHERE PhieuNhapId = @PHIEU_NHAP_ID
------------------------------------------------
END
