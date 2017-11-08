USE [QLTS]
GO
/****** Object:  StoredProcedure [dbo].[sp_BaoCao_BaoCaoTongHopTaiSanCoDinh]    Script Date: 11/8/2017 9:43:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
EXEC [dbo].[sp_BaoCao_BaoCaoTongHopTaiSanCoDinh_v1_test] @TuNgay = '2017-09-02 08:07:29', -- datetime
    @DenNgay = '2017-11-05 08:07:29', -- datetime
    @NhanVienId = N'1', -- nvarchar(10)
    @CoSoId = N'1' -- nvarchar(10)
*/

ALTER PROC [dbo].[sp_BaoCao_BaoCaoTongHopTaiSanCoDinh]
( 
	@TuNgay DATETIME,
	@DenNgay DATETIME,
	@NhanVienId NVARCHAR(10),
	@CoSoId NVARCHAR(10)
)
AS  
BEGIN
------------------------------------------------  
	DECLARE @tb_NganSachTaiSan TABLE
	(
		TaiSanId INT,
		MaNguonNganSach NVARCHAR(50),
		TenNguonNganSach NVARCHAR(500),
		GiaTri NUMERIC(18,4)
	)
	DECLARE @tb_Result TABLE
	(
		RowId INT IDENTITY(1,1),
		TaiSanId INT,
		CoSoId INT,
		NhanVienId INT,
		PhongBanId INT,
		SoLuong NUMERIC(18,4),
		NgayBatDauSuDung DATETIME,
		NguonBaoHiem NUMERIC(18,4) DEFAULT 0,
		NguonNganSach NUMERIC(18,4) DEFAULT 0,
		NguonVienTro NUMERIC(18,4) DEFAULT 0, -- tinh luon + nguon khác o day
		NguonKhac NUMERIC(18,4) DEFAULT 0
	)

	INSERT @tb_NganSachTaiSan( TaiSanId ,MaNguonNganSach ,TenNguonNganSach ,GiaTri)
	SELECT NG.TaiSanId, NNS.MaNguonNganSach, NNS.TenNguonNganSach, ISNULL(NG.GiaTri,0)
	FROM dbo.NguonNganSach NNS
	LEFT JOIN dbo.NguyenGia NG ON NG.NguonNganSachId = NNS.NguonNganSachId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = NG.TaiSanId
	WHERE TS.CoSoId = @CoSoId

	INSERT @tb_Result( TaiSanId , CoSoId, NhanVienId, PhongBanId, SoLuong, NgayBatDauSuDung)
	SELECT TS.TaiSanId, TS.CoSoId, TD.NhanVienId, TD.PhongBanId, (TD.SLTon + TD.SLTang - TD.SLGiam), TD.NgayBatDauSuDung
	FROM dbo.TaiSan TS
	LEFT JOIN dbo.TheoDoi TD ON TD.TaiSanId = TS.TaiSanId AND TD.Nam = YEAR(@TuNgay)
	WHERE TS.CoSoId = @CoSoId

	UPDATE RS
	SET RS.NguonBaoHiem = ISNULL(NS.GiaTri,0)
	FROM @tb_Result RS 
	LEFT JOIN 
	(
		SELECT NSTS.TaiSanId, SUM(NSTS.GiaTri) GiaTri
		FROM @tb_NganSachTaiSan NSTS WHERE LOWER(NSTS.TenNguonNganSach) LIKE N'%nguồn bảo hiểm%' GROUP BY NSTS.TaiSanId
	) as NS ON NS.TaiSanId = RS.TaiSanId

	UPDATE RS
	SET RS.NguonNganSach = ISNULL(NS.GiaTri,0)
	FROM @tb_Result RS 
	LEFT JOIN 
	(
		SELECT NSTS.TaiSanId, SUM(NSTS.GiaTri) GiaTri
		FROM @tb_NganSachTaiSan NSTS WHERE LOWER(NSTS.TenNguonNganSach) LIKE N'%nguồn ngân sách' GROUP BY NSTS.TaiSanId
	) as NS ON NS.TaiSanId = RS.TaiSanId

	UPDATE RS
	SET RS.NguonVienTro = ISNULL(NS.GiaTri,0)
	FROM @tb_Result RS 
	LEFT JOIN 
	(
		SELECT NSTS.TaiSanId, SUM(NSTS.GiaTri) GiaTri
		FROM @tb_NganSachTaiSan NSTS WHERE LOWER(NSTS.TenNguonNganSach) LIKE N'%viện trợ%' GROUP BY NSTS.TaiSanId
	) as NS ON NS.TaiSanId = RS.TaiSanId

	UPDATE RS
	SET RS.NguonKhac = ISNULL(NS.GiaTri,0)
	FROM @tb_Result RS 
	LEFT JOIN 
	(
		SELECT NSTS.TaiSanId, SUM(NSTS.GiaTri) GiaTri
		FROM @tb_NganSachTaiSan NSTS WHERE LOWER(NSTS.TenNguonNganSach) NOT LIKE N'%viện trợ%' AND
										   LOWER(NSTS.TenNguonNganSach) not LIKE N'%nguồn ngân sách' AND 
										   LOWER(NSTS.TenNguonNganSach) NOT LIKE N'%nguồn bảo hiểm%' GROUP BY NSTS.TaiSanId
	) as NS ON NS.TaiSanId = RS.TaiSanId

	SELECT YEAR(@TuNgay) Nam, YEAR(@TuNgay) - 1 NamRoi,
		   CS.MaCoSo, CS.TenCoSo, LTS.TenLoai, NTS.TenNhom,
		   TS.TenTaiSan, NSX.TenNuocSanXuat, HSX.TenHangSanXuat, 
		   NV.TenNhanVien, PB.TenPhongBan, YEAR(RS.NgayBatDauSuDung) NamSuDung,
		   CASE WHEN rs.NguonNganSach > 0 THEN N'Ngân sách mua' ELSE '' END + 
		   CASE WHEN rs.NguonBaoHiem > 0 THEN N', Nguồn bảo hiểm' ELSE '' END + 
		   CASE WHEN rs.NguonVienTro > 0 THEN N', Nguồn viện trợ' ELSE '' END
		   NguonNganSach,
		   RS.SoLuong,
		   FLOOR((RS.NguonNganSach + rs.NguonBaoHiem + RS.NguonVienTro)/1000) DonGia,
		   TS.TyLeKhauHao,
		   100 - ((YEAR(@DenNgay) - YEAR(RS.NgayBatDauSuDung)) * TS.TyLeKhauHao) TyLeChatLuongConLai,
		   (RS.NguonNganSach + rs.NguonBaoHiem + RS.NguonVienTro) NguyenGia,
		   rs.NguonNganSach NguonNganSach1,
		   RS.NguonBaoHiem,
		   RS.NguonVienTro,
		   (RS.NguonNganSach + rs.NguonBaoHiem + RS.NguonVienTro) * TS.TyLeKhauHao / 100 GiaTriKhauHao,
		   (RS.NguonNganSach + rs.NguonBaoHiem + RS.NguonVienTro) - (
																		DATEDIFF(YEAR, TS.NgayBDHaoMon, @DenNgay) * ((RS.NguonNganSach + rs.NguonBaoHiem + RS.NguonVienTro) * TS.TyLeHaoMon / 100)
																	  ) GiaTriConLai,
		   
		  -- khấu hao lũy kế
		  /*
				ThangTheoKy = KyTinhKhauHao == 'Tháng' ? 1
							: KyTinhKhauHao == 'Quý' ? 3
							: KyTinhKhauHao == 'Năm' ? 12
							: 0
				SoThangSD = currDate.diff(NgayBDKhauHao, 'months');
				SoThangConLai = SoKyKhauHao * ThangTheoKy - SoThangSD;
				SoKyConLai = SoThangConLai > 0 ? Math.floor(SoThangConLai / ThangTheoKy) : 0;
				KhauHaoKy (gia tri khau hao) = NguyenGia * TyLeKhauHao / 100;
				KhauHaoLuyKe = KhauHaoKy * (SoKyKhauHao - SoKyConLai);	
		  */
		  ISNULL
		  (
			  ((RS.NguonNganSach + rs.NguonBaoHiem + RS.NguonVienTro) * TS.TyLeKhauHao / 100) * 
			  (
					--so ky khau hao
					TS.SoKyKhauHao - 
					--so ky con lai
					(   CASE WHEN 
								(
									CASE WHEN KyTinhKhauHao = N'Tháng' THEN 1 
										 WHEN KyTinhKhauHao = N'Quý' THEN 3
										 WHEN KyTinhKhauHao = N'Năm' THEN 12 
										 ELSE 0 END
									* TS.SoKyKhauHao - DATEDIFF(MONTH, TS.NgayBDKhauHao, @DenNgay)
								) > 0 THEN FLOOR(
													(
														CASE WHEN KyTinhKhauHao = N'Tháng' THEN 1 
															 WHEN KyTinhKhauHao = N'Quý' THEN 3
															 WHEN KyTinhKhauHao = N'Năm' THEN 12 
															 ELSE 0 END
														* TS.SoKyKhauHao - DATEDIFF(MONTH, TS.NgayBDKhauHao, @DenNgay)
													) / 
													(
														CASE WHEN KyTinhKhauHao = N'Tháng' THEN 1 
															 WHEN KyTinhKhauHao = N'Quý' THEN 3
															 WHEN KyTinhKhauHao = N'Năm' THEN 12 
															 ELSE 1 END
													)
												)
										ELSE 0 END
					)
			  ) 
		  , 0)KhauHaoLuyKe--,TS.KyTinhKhauHao,TS.SoKyKhauHao,TS.TyLeKhauHao
	FROM dbo.TaiSan TS
	LEFT JOIN dbo.HangSanXuat HSX ON HSX.HangSanXuatId = TS.HangSanXuatId
	LEFT JOIN dbo.NuocSanXuat NSX ON NSX.NuocSanXuatId = TS.NuocSanXuatId
	LEFT JOIN @tb_Result RS ON RS.TaiSanId = TS.TaiSanId
	LEFT JOIN dbo.LoaiTaiSan LTS ON LTS.LoaiId = TS.LoaiId
	LEFT JOIN dbo.NhomTaiSan NTS ON NTS.NhomId = LTS.NhomId
	LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = rs.PhongBanId
	LEFT JOIN dbo.NhanVien NV ON NV.NhanVienId = rs.NhanVienId
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = TS.CoSoId

	WHERE RS.SoLuong > 0
	AND CS.CoSoId = @CoSoId
	GROUP BY 
			 TS.MaTaiSan, TS.TenTaiSan
			 ,PB.TenPhongBan
			 ,rs.NgayBatDauSuDung
			 ,RS.SoLuong
			 ,RS.NguonNganSach, RS.NguonBaoHiem, RS.NguonVienTro
			 ,TS.TyLeKhauHao
			 ,TS.NgayBDKhauHao
			 ,TS.TyLeHaoMon
			 ,TS.SoKyKhauHao
			 ,TS.KyTinhKhauHao
			 ,TS.NgayBDHaoMon
			 ,CS.MaCoSo
			 ,CS.TenCoSo
			 ,LTS.TenLoai
			 ,NTS.TenNhom
			 ,NSX.TenNuocSanXuat
			 ,HSX.TenHangSanXuat
			 ,NV.TenNhanVien




	--SELECT YEAR(@TuNgay) Nam, YEAR(@TuNgay) - 1 NamRoi,
	--	   CS.MaCoSo, CS.TenCoSo, LTS.TenLoai, NTS.TenNhom,
	--	   TS.TenTaiSan, NSX.TenNuocSanXuat, HSX.TenHangSanXuat, 
	--	   NV.TenNhanVien, PB.TenPhongBan, YEAR(TD.NgayBatDauSuDung) NamSuDung,
	--	   N'Ngân sách mua' NguonNganSach,
	--	   (TD.SLTon + TD.SLTang - TD.SLGiam) SoLuong,
	--	   FLOOR(SUM(ISNULL(NG.GiaTri,0))/1000) DonGia,
	--	   TS.TyLeKhauHao,
	--	   100 - ((YEAR(@DenNgay) - YEAR(TD.NgayBatDauSuDung)) * TS.TyLeKhauHao) TyLeChatLuongConLai,
	--	   SUM(ISNULL(NG.GiaTri,0)) NguyenGia,
	--	   SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeKhauHao / 100 GiaTriKhauHao,
	--	   SUM(ISNULL(NG.GiaTri,0)) - (
	--									DATEDIFF(YEAR, TS.NgayBDHaoMon, @DenNgay) * (SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeHaoMon / 100)
	--								  ) GiaTriConLai,
		   
	--	  -- khấu hao lũy kế
	--	  /*
	--			ThangTheoKy = KyTinhKhauHao == 'Tháng' ? 1
	--						: KyTinhKhauHao == 'Quý' ? 3
	--						: KyTinhKhauHao == 'Năm' ? 12
	--						: 0
	--			SoThangSD = currDate.diff(NgayBDKhauHao, 'months');
	--			SoThangConLai = SoKyKhauHao * ThangTheoKy - SoThangSD;
	--			SoKyConLai = SoThangConLai > 0 ? Math.floor(SoThangConLai / ThangTheoKy) : 0;
	--			KhauHaoKy (gia tri khau hao) = NguyenGia * TyLeKhauHao / 100;
	--			KhauHaoLuyKe = KhauHaoKy * (SoKyKhauHao - SoKyConLai);	
	--	  */
	--	  ISNULL
	--	  (
	--		  (SUM(ISNULL(NG.GiaTri,0)) * TS.TyLeKhauHao / 100) * 
	--		  (
	--				--so ky khau hao
	--				TS.SoKyKhauHao - 
	--				--so ky con lai
	--				(   CASE WHEN 
	--							(
	--								CASE WHEN KyTinhKhauHao = N'Tháng' THEN 1 
	--									 WHEN KyTinhKhauHao = N'Quý' THEN 3
	--									 WHEN KyTinhKhauHao = N'Năm' THEN 12 
	--									 ELSE 0 END
	--								* TS.SoKyKhauHao - DATEDIFF(MONTH, TS.NgayBDKhauHao, @DenNgay)
	--							) > 0 THEN FLOOR(
	--												(
	--													CASE WHEN KyTinhKhauHao = N'Tháng' THEN 1 
	--														 WHEN KyTinhKhauHao = N'Quý' THEN 3
	--														 WHEN KyTinhKhauHao = N'Năm' THEN 12 
	--														 ELSE 0 END
	--													* TS.SoKyKhauHao - DATEDIFF(MONTH, TS.NgayBDKhauHao, @DenNgay)
	--												) / 
	--												(
	--													CASE WHEN KyTinhKhauHao = N'Tháng' THEN 1 
	--														 WHEN KyTinhKhauHao = N'Quý' THEN 3
	--														 WHEN KyTinhKhauHao = N'Năm' THEN 12 
	--														 ELSE 1 END
	--												)
	--											)
	--									ELSE 0 END
	--				)
	--		  ) 
	--	  , 0)KhauHaoLuyKe--,TS.KyTinhKhauHao,TS.SoKyKhauHao,TS.TyLeKhauHao
	--FROM dbo.TaiSan TS
	--LEFT JOIN dbo.HangSanXuat HSX ON HSX.HangSanXuatId = TS.HangSanXuatId
	--LEFT JOIN dbo.NuocSanXuat NSX ON NSX.NuocSanXuatId = TS.NuocSanXuatId
	--LEFT JOIN dbo.TheoDoi TD ON TD.TaiSanId = TS.TaiSanId AND TD.Nam = YEAR(@TuNgay)
	--LEFT JOIN dbo.LoaiTaiSan LTS ON LTS.LoaiId = TS.LoaiId
	--LEFT JOIN dbo.NhomTaiSan NTS ON NTS.NhomId = LTS.NhomId
	--LEFT JOIN dbo.PhongBan PB ON PB.PhongBanId = TD.PhongBanId
	--LEFT JOIN dbo.NhanVien NV ON NV.NhanVienId = TD.NhanVienId
	--LEFT JOIN dbo.NguyenGia NG ON NG.TaiSanId = TS.TaiSanId
	--LEFT JOIN dbo.CoSo CS ON CS.CoSoId = TS.CoSoId

	--WHERE (TD.SLTon + TD.SLTang - TD.SLGiam) > 0
	--AND CS.CoSoId = @CoSoId
	--GROUP BY 
	--		 TS.MaTaiSan, TS.TenTaiSan
	--		 ,PB.TenPhongBan
	--		 ,TD.NgayBatDauSuDung
	--		 ,TD.SLTon
	--		 ,TD.SLTang
	--		 ,TD.SLGiam
	--		 ,TS.TyLeKhauHao
	--		 ,TS.NgayBDKhauHao
	--		 ,TS.TyLeHaoMon
	--		 ,TS.SoKyKhauHao
	--		 ,TS.KyTinhKhauHao
	--		 ,TS.NgayBDHaoMon
	--		 ,CS.MaCoSo
	--		 ,CS.TenCoSo
	--		 ,LTS.TenLoai
	--		 ,NTS.TenNhom
	--		 ,NSX.TenNuocSanXuat
	--		 ,HSX.TenHangSanXuat
	--		 ,NV.TenNhanVien
-----------------------------------------------------
END
