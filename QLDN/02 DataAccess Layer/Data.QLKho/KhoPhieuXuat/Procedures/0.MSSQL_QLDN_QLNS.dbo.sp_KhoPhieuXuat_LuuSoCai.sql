/*************************************************************  
1. Create Date	: 2017.08.21
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: NHẬP THẺ KHO
4. Function		: QLDNKHO/KHOPHIEUXUAT
5. Example		: 
					DECLARE		@MESSAGE	NVARCHAR(MAX)
					EXEC [sp_KhoPhieuXuat_LuuSoCai]
							 @PHIEU_XUAT_ID		=	2045
							,@LOGIN_ID			=	'68'
							,@MESSAGE			=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE

6. Precaution	:
7. History		:
				  2017.08.21 (NGUYỄN THANH BÌNH) - TẠO MỚI
*************************************************************/
ALTER PROCEDURE [dbo].[sp_KhoPhieuXuat_LuuSoCai]
		  @PHIEU_XUAT_ID			INT				=	NULL
	    , @LOGIN_ID					INT				=	NULL
	    , @MESSAGE					NVARCHAR(MAX)		OUTPUT
AS
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------
DECLARE		@V_SO_PHIEU					NVARCHAR(MAX)		=	N''
--DECLARE		@V_PHIEU_ID					INT					=	0
DECLARE		@V_SO_LUONG_XUAT			DECIMAL				=	0
DECLARE		@V_DON_GIA_NHAP				DECIMAL				=	0
DECLARE		@V_TONKHOID					INT					=	0
DECLARE		@V_TEMP_TONKHOID			INT					=	0
DECLARE		@V_ROWID					INT					=	0
DECLARE		@V_KHOHANGID				INT					=	0
DECLARE		@V_HANGHOAID				INT					=	0
DECLARE		@V_LOHANG					NVARCHAR(MAX)		=	''
DECLARE		@V_NGAY_XUAT_PHIEU			DATETIME			=	NULL
DECLARE		@V_THANG_NAM				DATETIME			=	NULL -- TÍNH NGÀY 01 THÁNG TRƯỚC ĐÓ
DECLARE		@V_THANG_NAM_MAX			DATETIME			=	NULL 
DECLARE		@V_THANG_NAM_MIN			DATETIME			=	NULL 
DECLARE		@V_THANG_XUAT_PHIEU			DATETIME			=	NULL -- TÍNH NGÀY 01 THÁNG NHẬP PHIẾU
DECLARE		@V_CHI_TIET_ID				INT					=	0
DECLARE		@V_CHECK_CHI_TIET			INT					=	0
DECLARE		@V_TRANG_THAI_PHIEU_XUAT	NVARCHAR(MAX)		=	N''
DECLARE		@V_TON_KHO_CHI_TIET_ID		VARCHAR(MAX)		=	''
--------------------
-- LẤY THÔNG TIN PHIẾU
SELECT	 @V_KHOHANGID = KPX.KhoXuat
		,@V_SO_PHIEU = KPX.SoPhieu
		,@V_NGAY_XUAT_PHIEU = KPX.NgayXuat
		,@V_TRANG_THAI_PHIEU_XUAT = KPX.MaTrangThai
FROM	KhoPhieuXuat KPX
		LEFT JOIN KhoKhoHang KHO ON KPX.KhoXuat = KHO.KhoHangId
WHERE	PhieuXuatId = @PHIEU_XUAT_ID

/*--------KIỂM TRA TRANG THÁI PHIẾU-------------*/
IF @V_TRANG_THAI_PHIEU_XUAT = 'KPX_LSC'
BEGIN
	--ROLLBACK
	SET @MESSAGE = N'CHECK_INPUT|1|Phiếu này đã lưu sổ cái'
	SELECT * FROM KhoPhieuXuat WHERE PhieuXuatId = @PHIEU_XUAT_ID
	RETURN
END

-- KIỂM TRA PHIẾU CHI TIẾT
IF NOT EXISTS(SELECT * FROM KhoPhieuXuatChiTiet WHERE PhieuXuatId = @PHIEU_XUAT_ID ) OR EXISTS(SELECT * FROM KhoPhieuXuatChiTiet WHERE PhieuXuatId = @PHIEU_XUAT_ID AND SoLuong=0)
BEGIN	
	--ROLLBACK
	SET @MESSAGE = N'CHECK_INPUT|2|Không tìm thấy chi tiết - Số lượng phải > 0'
	SELECT * FROM KhoPhieuXuat WHERE PhieuXuatId = @PHIEU_XUAT_ID
	RETURN
END
/*--------------------------------------------*/

/*------TAO BANG TAM CHUA THÔNG TIN CHI TIẾT-------*/
SELECT	KPXCT.PhieuXuatChiTietId, KPXCT.HangHoaId, KPXCT.SoLuong, KPXCT.GiaNhap, KPXCT.DonGia,KPXCT.LoHang
		,KHH.MaHangHoa
INTO	#PHIEU_CHITIET 
FROM	KhoPhieuXuatChiTiet KPXCT
		LEFT JOIN KhoHangHoa KHH ON KPXCT.HangHoaId = KHH.HangHoaId
		LEFT JOIN KhoPhieuXuat KPX ON KPXCT.PhieuXuatId = KPX.PhieuXuatId
WHERE	KPXCT.PhieuXuatId = @PHIEU_XUAT_ID

SELECT * FROM #PHIEU_CHITIET

/*-------------------------------------------------*/

/*
Ngày nhập không được lớn hơn ngày hiện tại
*/
IF @V_NGAY_XUAT_PHIEU>getdate()
BEGIN
	--ROLLBACK
	SET @MESSAGE = N'CHECK_INPUT|1|Ngày xuất lớn hơn ngày hiện tại, vui lòng kiểm tra lại.'
	SELECT * FROM KhoPhieuXuat WHERE PhieuXuatId = @PHIEU_XUAT_ID
	RETURN
END
/*-------------------------------------------------*/

BEGIN TRANSACTION PHIEUNHAP_LSC

BEGIN TRY

	-- Tháng năm của phiếu nhập, ví dụ: (2017-08-20 => 2017-08-01
	SET @V_THANG_XUAT_PHIEU = DATEADD(MONTH, DATEDIFF(MONTH, 0, @V_NGAY_XUAT_PHIEU), 0) 

	-- Kiểm tra @ThangNam có tồn trong KhoTonKho?
	IF NOT EXISTS (	SELECT		TonKhoId 
					FROM		KhoTonKho
					WHERE		ThangNam = @V_THANG_XUAT_PHIEU AND  KhoHangId = @V_KHOHANGID)
	BEGIN		
		
		-- Select tháng kề trước, ví dụ: Hiện tại Phiếu nhập là T8, KhoTonKho chỉ có T6,T5 (T7 chưa có)
		-- Như vậy tháng kề trước T8 là T6, Insert T6 cho T7 và T8	
		
		-- TH1: KhoTonKho=empty
		IF (NOT EXISTS (SELECT * FROM KhoTonKho WHERE KhoHangId = @V_KHOHANGID))
		BEGIN
			print 'TH1'
			--Insert KhoTonKho
			INSERT INTO KhoTonKho	(	KhoHangId		,ThangNam				,Ten														,NgayTao	,MaTrangThai	,NguoiTao	)
			VALUES					(	@V_KHOHANGID	,@V_THANG_XUAT_PHIEU	,'THÁNG ' + CAST(MONTH(@V_THANG_XUAT_PHIEU) AS VARCHAR(10))	,GETDATE()	,'TonKho_KN'	,@LOGIN_ID	)
			
		END
		-- KhoTonKho!=empty
		ELSE 
		BEGIN			
			SELECT @V_THANG_NAM_MAX=max(DATEADD(MONTH, DATEDIFF(MONTH, 0, ThangNam), 0)), @V_THANG_NAM_MIN=min(DATEADD(MONTH, DATEDIFF(MONTH, 0, ThangNam), 0))					 
			FROM	KhoTonKho 
			WHERE	KhoHangId = @V_KHOHANGID		
			
				print '@V_THANG_XUAT_PHIEU'
				print @V_THANG_XUAT_PHIEU
				print '@V_THANG_NAM_MAX'
				print @V_THANG_NAM_MAX
				print '@V_THANG_NAM_MIN'
				print @V_THANG_NAM_MIN
						
			-- TH2: KhoTonKho!=empty & Ngày nhập phiếu > Thangnam in KhoTonKho
			IF(@V_THANG_XUAT_PHIEU > @V_THANG_NAM_MAX)
			BEGIN	
				print 'TH2'			
				SET @V_THANG_NAM=@V_THANG_NAM_MAX

				SELECT  @V_TONKHOID=TonKhoId
				FROM	KhoTonKho 
				WHERE	KhoHangId = @V_KHOHANGID AND ThangNam=@V_THANG_NAM

				WHILE(@V_THANG_NAM < @V_THANG_XUAT_PHIEU) -- LẶP Từ tháng kề trước (@V_THANG_NAM_MAX) tới tháng nhập phiếu
				BEGIN
					SET @V_THANG_NAM=DATEADD(month, 1, @V_THANG_NAM) -- Tăng lên một tháng

					--Insert KhoTonKho
					INSERT INTO KhoTonKho	(	KhoHangId		,ThangNam		,Ten													,NgayTao	,MaTrangThai	,NguoiTao	)
					VALUES					(	@V_KHOHANGID	,@V_THANG_NAM	,'THÁNG ' + CAST(MONTH(@V_THANG_NAM) AS VARCHAR(10))	,GETDATE()	,'TonKho_KN'	,@LOGIN_ID	)
					-- khóa chính tự động sinh ra sau khi insert
					SET @V_ROWID = @@IDENTITY

					--Insert tháng kề trước vào KhoTonKhoChiTiet
					INSERT INTO KhoTonKhoChiTiet	(	TonKhoId	,HangHoaId	,GiaNhap	,LoHang	,TonDau								,SoLuongNhap	,SoLuongXuat)
					SELECT								@V_ROWID	,HangHoaId	,GiaNhap	,LoHang	,TonDau + SoLuongNhap - SoLuongXuat	,0				,0
					FROM KhoTonKhoChiTiet tonct JOIN KhoTonKho ton ON tonct.TonKhoId = ton.TonKhoId
					WHERE tonct.TonKhoId = @V_TONKHOID
				END
			END 
			-- TH3: KhoTonKho!=empty & Ngày nhập phiếu < Thangnam in KhoTonKho
			ELSE IF(@V_THANG_XUAT_PHIEU < @V_THANG_NAM_MIN) 
			BEGIN
				print 'TH3'		
				--Không cho phép tạo mới phiếu trước tháng khai báo tồn đầu
				ROLLBACK
			END
		END
		
	END -- end IF NOT EXISTS 

	/*---------------------------------------------------------------
		Lặp từng chi tiết của phiếu nhập : ChiTiet[i]
		1. Nếu ChiTiet[i] tồn tại trong KhoTonKhoChiTiet
			1.1 Update soluong trong KhoTonKhochitiet. (Lưu lược sử)
			1.2 Update tồn đầu cho các tháng sau đó. (Lưu lược sử)			
		2. Ngược lại ChiTiet[i] không tồn tại trong KhoTonKhoChiTiet
		    - Insert ChiTiet[i] trong KhoTonKhochitiet. (Lưu lược sử)
			- Dùng while kiểm tra các tháng sau đó nếu:
				+ ChiTiet[i] tồn tại: Update tồn đầu.
				+ ChiTiet[i] không tồn tại: insert 		
	---------------------------------------------------------------*/
	
	SELECT @V_TONKHOID=TonKhoId FROM KhoTonKho  WHERE ThangNam = @V_THANG_XUAT_PHIEU AND  KhoHangId = @V_KHOHANGID

	WHILE (SELECT COUNT(PhieuXuatChiTietId) FROM #PHIEU_CHITIET) > 0
	BEGIN
		-- chi tiết của phiếu nhập : ChiTiet[i]
	    SELECT TOP 1
			@V_CHI_TIET_ID = PhieuXuatChiTietId,
			@V_HANGHOAID = HangHoaId,
			@V_LOHANG = LoHang,
			@V_SO_LUONG_XUAT = SoLuong,
			@V_DON_GIA_NHAP = GiaNhap
		FROM #PHIEU_CHITIET		
		
		-- KIỂM TRA TỒN - XUẤT < 0
		IF EXISTS (	SELECT	*
							FROM	KhoTonKhoChiTiet TONCT
									LEFT JOIN KhoTonKho TON ON TONCT.TonKhoId = TON.TonKhoId
							WHERE	TON.ThangNam = @V_THANG_XUAT_PHIEU AND  TON.KhoHangId = @V_KHOHANGID
									AND TONCT.HangHoaId = @V_HANGHOAID AND TONCT.GiaNhap = @V_DON_GIA_NHAP AND TONCT.LoHang = @V_LOHANG
									AND (TONCT.TonDau + TONCT.SoLuongNhap - (TONCT.SoLuongXuat+@V_SO_LUONG_XUAT)) < 0)
		BEGIN
			ROLLBACK
			SET @MESSAGE = N'TON_CUOI|1|Số lượng xuất lớn hơn số lượng tồn'
			SELECT * FROM KhoPhieuXuat WHERE PhieuXuatId = @PHIEU_XUAT_ID
			DROP TABLE #PHIEU_CHITIET
			RETURN
		END

		IF (@V_TONKHOID > 0)
		BEGIN 
			-- 1. Nếu ChiTiet[i] tồn tại trong KhoTonKhoChiTiet
			IF EXISTS (	SELECT	TonKhoChiTietId
						FROM	KhoTonKhoChiTiet
						WHERE	TonKhoId=@V_TONKHOID
								AND HangHoaId = @V_HANGHOAID AND GiaNhap = @V_DON_GIA_NHAP AND LoHang = @V_LOHANG )
			BEGIN			
				--1.1 Cập nhật số lượng
				UPDATE	KhoTonKhoChiTiet
				SET		SoLuongXuat	=	SoLuongXuat + @V_SO_LUONG_XUAT,
						CtrVersion=CtrVersion+1
				WHERE TonKhoId = @V_TONKHOID AND HangHoaId = @V_HANGHOAID AND GiaNhap = @V_DON_GIA_NHAP AND LoHang = @V_LOHANG							
		
				-- LƯU LƯỢC SỬ
				INSERT INTO KhoLuocSuTonKho (TonKhoChiTietId, CtrVersion, SuKien, LoaiPhieu, PhieuId, TonDau, SoLuong, NguoiDung)
				SELECT TonKhoChiTietId, CtrVersion, 'LSC-UPDATE-SL','PX', @PHIEU_XUAT_ID, TonDau, @V_SO_LUONG_XUAT, @LOGIN_ID
				FROM KHOTONKHOCHITIET
				WHERE TonKhoId = @V_TONKHOID AND HangHoaId = @V_HANGHOAID AND GiaNhap = @V_DON_GIA_NHAP AND LoHang = @V_LOHANG							
				-- end LƯU LƯỢC SỬ

				--1.2. Cập nhật gia trị tồn đầu cho các tháng sau nó			
				IF( EXISTS(SELECT TonKhoId FROM KhoTonKho WHERE KhoHangId=@V_KHOHANGID AND ThangNam>@V_THANG_XUAT_PHIEU) )
				BEGIN
					UPDATE	KhoTonKhoChiTiet 
					SET		TonDau=TonDau - @V_SO_LUONG_XUAT			 
					WHERE	HangHoaId = @V_HANGHOAID AND GiaNhap = @V_DON_GIA_NHAP AND LoHang = @V_LOHANG
							AND TonKhoId IN (SELECT TonKhoId FROM KhoTonKho ton WHERE KhoHangId=@V_KHOHANGID AND ThangNam>@V_THANG_XUAT_PHIEU)			 
					
					-- LƯU LƯỢC SỬ				
					SET @V_TON_KHO_CHI_TIET_ID='' -- danh sách các TonKhoChiTietId được cập nhật tồn đầu
					Select @V_TON_KHO_CHI_TIET_ID = COALESCE(@V_TON_KHO_CHI_TIET_ID + ',' + cast(TonKhoChiTietId as varchar(10)),  cast(TonKhoChiTietId as varchar(10))) 
					From KhoTonKhoChiTiet
					WHERE HangHoaId = @V_HANGHOAID AND GiaNhap = @V_DON_GIA_NHAP AND LoHang = @V_LOHANG
							AND TonKhoId IN (SELECT TonKhoId FROM KhoTonKho ton WHERE ton.KhoHangId=@V_KHOHANGID AND ton.ThangNam>@V_THANG_XUAT_PHIEU)

					INSERT INTO KhoLuocSuTonKho (TonKhoChiTietId, CtrVersion, SuKien, LoaiPhieu, PhieuId, TonDau, SoLuong, NguoiDung, GhiChu)
					SELECT TonKhoChiTietId, CtrVersion, 'LSC-TonDau','PX', @PHIEU_XUAT_ID, TonDau , @V_SO_LUONG_XUAT, @LOGIN_ID, @V_TON_KHO_CHI_TIET_ID
					FROM KHOTONKHOCHITIET
					WHERE TonKhoId = @V_TONKHOID AND HangHoaId = @V_HANGHOAID AND GiaNhap = @V_DON_GIA_NHAP AND LoHang = @V_LOHANG							
					-- END LƯU LƯỢC SỬ

				END -- END IF(EXISTS

			END -- end if 1.
			-- 2. Ngược lại ChiTiet[i] không tồn tại trong KhoTonKhoChiTiet
			ELSE 
			BEGIN
				-- 2.1 Insert ChiTiet[i]
				INSERT INTO	KhoTonKhoChiTiet(HangHoaId, LoHang ,TonDau, GiaNhap, SoLuongNhap, SoLuongXuat, TonKhoId)
				VALUES(@V_HANGHOAID, @V_LOHANG, 0, @V_DON_GIA_NHAP, 0, @V_SO_LUONG_XUAT, @V_TONKHOID)

				-- LƯU LƯỢC SỬ
				INSERT INTO KhoLuocSuTonKho (TonKhoChiTietId, CtrVersion, SuKien, LoaiPhieu, PhieuId, TonDau, SoLuong, NguoiDung)
				SELECT TonKhoChiTietId, CtrVersion, 'LSC-INSERT','PX', @PHIEU_XUAT_ID, TonDau, @V_SO_LUONG_XUAT, @LOGIN_ID
				FROM KHOTONKHOCHITIET
				WHERE TonKhoId = @V_TONKHOID AND HangHoaId = @V_HANGHOAID AND GiaNhap = @V_DON_GIA_NHAP AND LoHang = @V_LOHANG							
				-- LƯU LƯỢC SỬ

				--2.2 Insert ChiTiet[i] vào các tháng sau đó (Nếu ChiTiet[i] tồn tại tháng sau đó thì Update Tồn đầu)
					-- Tạo bảng tạm chứa các TonkhoId của các tháng sau đó, ví dụ: 
				
				CREATE TABLE #TEMP_TON_KHO(TonKhoId INT)

				INSERT INTO #TEMP_TON_KHO(TonKhoId)
				SELECT TonKhoId
				FROM KhoTonKho ton WHERE KhoHangId=@V_HANGHOAID AND ThangNam>@V_THANG_XUAT_PHIEU
				
				WHILE(SELECT COUNT(*) FROM #TEMP_TON_KHO) > 0
				BEGIN
					SELECT TOP 1 @V_TEMP_TONKHOID = TonKhoId	FROM #TEMP_TON_KHO	
	
					IF(EXISTS(SELECT * FROM KHOTONKHOCHITIET
								WHERE TonKhoId = @V_TEMP_TONKHOID AND HangHoaId = @V_HANGHOAID AND GiaNhap = @V_DON_GIA_NHAP AND LoHang = @V_LOHANG	))
					BEGIN
						-- UPDATE
						UPDATE	KhoTonKhoChiTiet 
						SET		TonDau=TonDau - @V_SO_LUONG_XUAT			 
						WHERE	HangHoaId = @V_HANGHOAID AND GiaNhap = @V_DON_GIA_NHAP AND LoHang = @V_LOHANG
								AND TonKhoId=@V_TEMP_TONKHOID
					END
					ELSE
					BEGIN 
						--INSERT
						INSERT INTO	KhoTonKhoChiTiet(HangHoaId, LoHang ,TonDau, GiaNhap, SoLuongNhap, SoLuongXuat, TonKhoId)
						VALUES(@V_HANGHOAID, @V_LOHANG, 0, @V_DON_GIA_NHAP, 0, @V_SO_LUONG_XUAT, @V_TEMP_TONKHOID)
					END
	
					DELETE FROM #TEMP_TON_KHO WHERE TonKhoId=@V_TEMP_TONKHOID	
				END

				If(OBJECT_ID('tempdb..#TEMP_TON_KHO') Is Not Null)	
					Drop Table #TEMP_TON_KHO
				--END 2.2-------------------------------------------
			END
			
		END-- end IF (@V_TONKHOID <> 0
		ELSE
		BEGIN
			ROLLBACK -- Không tồn tại 
		END 

		DELETE #PHIEU_CHITIET WHERE PhieuXuatChiTietId = @V_CHI_TIET_ID

	END -- end WHILE

	UPDATE KhoPhieuXuat SET MaTrangThai = 'KPX_LSC' WHERE PhieuXuatId = @PHIEU_XUAT_ID

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

DROP TABLE #PHIEU_CHITIET

SELECT * FROM KhoPhieuXuat WHERE PhieuXuatId = @PHIEU_XUAT_ID
------------------------------------------------
END
