/*************************************************************  
1. Create Date	: 2017.05.10
2. Creator		: Tran Quoc Hung
3. Description	: Tính toán Bảng lương cá nhân theo Bảng Lương Và Nhân viên
4. Function		: QLDNMAIN/BangLuongCaNhan/List
5. Example		: 
					exec [sp_BangLuongCaNhan_CalculateBangLuongCaNhanByCriteriaV2]
					@BANGLUONG_ID = 17
					,@NGUOITAO_ID = 1
					,@NHANVIEN_IDS = '3'
					,@NGAYCONG = 24
					,@TIENCOMCONGTAC = 70000

6. Precaution	:
7. History		:
				  2017.05.10(Tran Quoc Hung) - Tạo mới
*************************************************************/
ALTER PROC [dbo].[sp_BangLuongCaNhan_CalculateBangLuongCaNhanByCriteriaV2]
( 
	@BANGLUONG_ID			int					-- Bảng lương id
	,@NGUOITAO_ID			int	= NULL			-- Người tạo id
	,@NHANVIEN_IDS			varchar(500) = NULL	-- Danh sach NhanVienId can tinh toan
	,@NGAYCONG				int	= NULL			-- Ngày công
	,@TIENCOMCONGTAC		int = NULL			-- Tiền cơm được nhận thêm mỗi ngày khi đi công tác
)
AS  
BEGIN
SET NOCOUNT ON  
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
------------------------------------------------  
---- Khai báo và chuẩn bị biến
---- Biến nội bộ có tiền tố V_ phía trước

	-- Biến tỉ lệ tính tăng ca
	DECLARE @V_LoaiTangCa_l150 decimal(5,2)   = 1.5;
	DECLARE @V_LoaiTangCa_l200 decimal(5,2)   = 2;
	DECLARE @V_LoaiTangCa_l300 decimal(5,2)   = 3;

	-- Các Biến tỉ lệ tính bảo hiểm & phí công đoàn
	DECLARE @V_TiLeDongBHXH decimal(5,2)   = 0.15;
	DECLARE @V_TiLeDongBHYT decimal(5,2)   = 0.08;
	DECLARE @V_TiLeDongBHTN decimal(5,2)   = 0.01;
	DECLARE @V_TiLeDongPhiCongDoan decimal(5,2)   = 0.01;

	-- Biến số ngày làm việc trong tuần
	DECLARE @V_NgayLamViecTrongTuan decimal(5,2) = 8;

	-- Các biến phụ

	-- Chuẩn bị biến @BANGLUONG_ID
	SET @BANGLUONG_ID = ISNULL(@BANGLUONG_ID,'');
	----------

	-- Chuẩn bị biến @NHANVIEN_IDS
	SET @NHANVIEN_IDS = ISNULL(@NHANVIEN_IDS,'');
	----------

	-- Chuẩn bị biến @NGAYCONG
	SET @NGAYCONG = ISNULL(@NGAYCONG,24);
	----------

	-- Chuẩn bị biến @TIENCOMCONGTAC
	SET @TIENCOMCONGTAC = ISNULL(@TIENCOMCONGTAC,70000);
	----------
   
---- Xây dựng nội dung câu SQL  
	-- selects all rows from the table according to search criteria
	DELETE BLCN 
	FROM BangLuongCaNhan AS BLCN
	WHERE
	(
		@NHANVIEN_IDS = ''
		AND BLCN.BangLuongId = @BANGLUONG_ID
	)
	OR
	(
		@NHANVIEN_IDS <> ''
		AND CHARINDEX('|' + CAST(BLCN.NhanVienId AS VARCHAR(14)) + '|','|' +  @NHANVIEN_IDS + '|') > 0
		AND BLCN.BangLuongId = @BANGLUONG_ID
	)
	
	INSERT INTO BangLuongCaNhan
	SELECT BL.BangLuongId,BL.TenBangLuong,BL.ThangNam,BL.NgayBatDau,BL.NgayKetThuc,BL.NgayTraLuong
	, NV.NhanVienId, NV.Ma AS MaNhanVien, (NV.Ho + ' ' + NV.Ten) as HoTenNhanVien, PB.TenPhongBan AS PhongBan, CV.TenChucVu AS ChucVu
	, BL.SoNgay AS NgayCong
	, BANGTINHTOAN.NgayCongTac
	, BANGTINHTOAN.NgayChamCong
	--, BANGTINHTOAN.NgayTinhLuong

	-- Tinh toan Ngay lam Thuc
	, (BANGTINHTOAN.NgayChamCong + BANGTINHTOAN.NgayCongTac)  AS NgayLamThuc

	, BANGTINHTOAN.LuongDongBHXH
	, ROUND(BANGTINHTOAN.LuongChinhThuc,-2)
	, BANGTINHTOAN.LuongNgay

	-- Tinh toan Luong Thang
	, ROUND(((BANGTINHTOAN.LuongNgay * BANGTINHTOAN.NgayTinhLuong) - (BANGTINHTOAN.LuongNgay*BANGTINHTOAN.NghiKhongPhep)),-2) AS LuongThang

	, BANGTINHTOAN.TienCongTacPhi
	, BANGTINHTOAN.TienThuong
	, BANGTINHTOAN.TienDienThoai
	, BANGTINHTOAN.TienTrachNhiem
	, (((BANGTINHTOAN.TienCom/@NGAYCONG)*BANGTINHTOAN.NgayChamCongChinhThuc) + (BANGTINHTOAN.NgayCongTacChinhThuc * @TIENCOMCONGTAC)) AS TienCom

	-- Tinh Toan Tien Tang Ca
	, BANGTINHTOAN.TienTangCa * (BANGTINHTOAN.LuongNgay/@V_NgayLamViecTrongTuan) AS TienTangCa

	, BANGTINHTOAN.NghiCoPhep
	, BANGTINHTOAN.NghiKhongPhep

	-- Tinh Toan TruBHXH 
	, (BANGTINHTOAN.LuongDongBHXH * @V_TiLeDongBHXH) AS TruBHXH
	, (BANGTINHTOAN.LuongDongBHXH * @V_TiLeDongBHYT) AS TruBHYT
	, (BANGTINHTOAN.LuongDongBHXH * @V_TiLeDongBHTN) AS TruBHTN
	, (BANGTINHTOAN.LuongDongBHXH * @V_TiLeDongPhiCongDoan) AS TruCongDoan
	, BANGTINHTOAN.TruLuong
	, BANGTINHTOAN.TruTamUng

	-- Tinh Toan Thuc Lanh 
	, (ROUND(((BANGTINHTOAN.LuongNgay * BANGTINHTOAN.NgayTinhLuong) - (BANGTINHTOAN.LuongNgay*BANGTINHTOAN.NghiKhongPhep)),-2) -- 8
		+ BANGTINHTOAN.TienCongTacPhi								-- 9
		+ BANGTINHTOAN.TienThuong									-- 10
		+ BANGTINHTOAN.TienDienThoai								-- 11
		+ BANGTINHTOAN.TienTrachNhiem								-- 12
		+((BANGTINHTOAN.TienCom/@NGAYCONG)*BANGTINHTOAN.NgayChamCongChinhThuc) + (BANGTINHTOAN.NgayCongTacChinhThuc * @TIENCOMCONGTAC) -- 13
		+ BANGTINHTOAN.TienTangCa * (BANGTINHTOAN.LuongNgay/@V_NgayLamViecTrongTuan)		-- 16
	)
	-
	((BANGTINHTOAN.LuongDongBHXH * @V_TiLeDongBHXH)				-- 18
		+ (BANGTINHTOAN.LuongDongBHXH * @V_TiLeDongBHYT)		-- 19
		+ (BANGTINHTOAN.LuongDongBHXH * @V_TiLeDongBHTN)		-- 20
		+ (BANGTINHTOAN.LuongDongBHXH * @V_TiLeDongPhiCongDoan)	-- 21
		+ BANGTINHTOAN.TruLuong									-- 22
		+ BANGTINHTOAN.TruTamUng								-- 24
	)
		AS ThucLanh

	-- NgayTao
	,Getdate() AS NgayTao

	-- NguoiTao
	,@NGUOITAO_ID AS NguoiTao

	-- XoaYN
	, 'N' AS XoaYN

	-- CtrVersion
	, 0 AS CtrVersion 

	FROM(

		SELECT BL.BangLuongId, NV.NhanVienId
		-- Tinh Toan Ngay Cong Tac tu bang PhieuCongTac
		-- Cong thuc: Tong SoNgay theo NhanVienId, Thang/Nam NgayVe = Thang/Nam Bangluong
		--			, trang thai la Da Duyet (PCT_DY), va chua bi xoa
		,ISNULL((SELECT SUM(PCT.SoNgay)
		FROM PhieuCongTac PCT  WITH(NOLOCK, READUNCOMMITTED) 
		WHERE 
		PCT.NhanVienId = NV.NhanVienId AND
		YEAR(PCT.NgayVe) = YEAR(BL.ThangNam) AND
		MONTH(PCT.NgayVe) = MONTH(BL.ThangNam) AND
		PCT.MaTrangThai = 'PCT_DY' AND
		PCT.XoaYN = N'N'),0) AS NgayCongTac

		-- Tinh Toan Ngay Cong Tac Chính thức
		-- Cong thuc: giống như ngày công tác nhưng kết hợp với bảng hợp đồng để
		--				tính số ngày công tác nằm trong khoảng hợp đồng chính thức (hưởng lương =1)
		,ISNULL((SELECT Sum(PCT.SoNgay)
		FROM PhieuCongTac PCT  WITH(NOLOCK, READUNCOMMITTED) 
		inner join QuanLyHopDong as qlhd  WITH(NOLOCK, READUNCOMMITTED) 
		on qlhd.NhanVienId =  NV.NhanVienId and qlhd.HuongLuong = 1
		and
			(cast(NgayVe as Date) BETWEEN qlhd.TuNgay AND ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay))
		WHERE 
		PCT.NhanVienId =  NV.NhanVienId AND
		YEAR(PCT.NgayVe) = YEAR(BL.ThangNam) AND
		MONTH(PCT.NgayVe) = MONTH(BL.ThangNam) AND
		PCT.MaTrangThai = 'PCT_DY' AND
		PCT.XoaYN = N'N'),0) AS NgayCongTacChinhThuc

		-- Tinh Toan Ngay Cham Cong tu bang ChamCong
		-- Cong Thuc: lay Tu Bang cham cong, loc theo NhanVienId, theo thang/nam
		, ISNULL(
			(select count(*) from ChamCong AS CC
				where CC.MaNhanVien = NV.Ma
				and (
				(year(CC.GioLam) = year(BL.ThangNam) and month(CC.GioLam) = month(BL.ThangNam))
				OR 
				(year(CC.GioVe) = year(BL.ThangNam) and month(CC.GioVe) = month(BL.ThangNam))

				)
				AND
				(
				 (CONVERT(TIME(0),CC.GioLam)) > '00:00:00'
				 OR
				 (CONVERT(TIME(0),CC.GioVe)) > '00:00:00'
				)
				and CC.Thu <> 'CN'
			)
		,0)
		
		AS NgayChamCong


		-- Tính toán ngày chấm công chính thức (dựa vào bảng chấm công và bảng hợp đồng)
		-- Công thức: đếm ngày chấm công nằm trong khoảng hợp đồng chính thức (hưởng lương =1)
		,ISNULL(
		(select count(*)
				from ChamCong AS CC  WITH(NOLOCK, READUNCOMMITTED) 
				inner join QuanLyHopDong as qlhd  WITH(NOLOCK, READUNCOMMITTED) 
				on qlhd.NhanVienId = NV.NhanVienId and qlhd.HuongLuong = 1
				and(
					(cast(CC.GioLam as Date) BETWEEN qlhd.TuNgay AND ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay))
					OR
					(cast(CC.GioVe as Date) BETWEEN qlhd.TuNgay AND ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay))
				)
				where CC.MaNhanVien = NV.Ma
				and (
				(year(CC.GioLam) = year(BL.ThangNam) and month(CC.GioLam) = month(BL.ThangNam))
				OR 
				(year(CC.GioVe) = year(BL.ThangNam) and month(CC.GioVe) = month(BL.ThangNam))

				)
				AND
				(
				 (CONVERT(TIME(0),CC.GioLam)) > '00:00:00'
				 OR
				 (CONVERT(TIME(0),CC.GioVe)) > '00:00:00'
				)
				and CC.Thu <> 'CN')
		,0)  as NgayChamCongChinhThuc


		-- Tinh Toan Ngay tinh luong theo quy dinh
		-- Cong thuc: nếu làm việc tròn tháng, ngày tính lương cố định = @NGAYCONG (24 ngày)
		-- Nếu làm việc ko tròn tháng, tra sô ngày tính luong theo bảng chấm công
		, ISNULL(
		(SELECT 
			-- tinh so ngay lam viec
			case when ((BL.ThangNam >= Min(qlhd.TuNgay)) and (EOMONTH(BL.ThangNam) <= Max(ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay))))  then @NGAYCONG
			else count(CC.MaNhanVien)
			end as songaylamviec

			from QuanLyHopDong qlhd WITH(NOLOCK, READUNCOMMITTED) 
			left join ChamCong AS CC WITH(NOLOCK, READUNCOMMITTED) 
			on CC.MaNhanVien = NV.Ma
			and (
			(year(CC.GioLam) = year(BL.ThangNam) and month(CC.GioLam) = month(BL.ThangNam))
			OR 
			(year(CC.GioVe) = year(BL.ThangNam) and month(CC.GioVe) = month(BL.ThangNam))
			)
			AND
			(
				(CONVERT(TIME(0),CC.GioLam)) > '00:00:00'
				OR
				(CONVERT(TIME(0),CC.GioVe)) > '00:00:00'
			)
			and CC.Thu <> 'CN'
			where
			qlhd.NhanVienId = NV.NhanVienId
			and
			(
				year(BL.ThangNam) * 100 + month(BL.ThangNam) BETWEEN year(qlhd.TuNgay) * 100 + month(qlhd.TuNgay) AND
															 year(ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay)) * 100 + month(ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay))
			)
			Group by qlhd.NhanVienId)
		,0)
		AS NgayTinhLuong

		-- Tinh Toan Ngay Lam Thuc tu (= NgayChamCong + NgayCongTac )
		, 0 AS NgayLamThuc

		-- Luong Dong BHXH (LuongCoBan)
		-- Cong Thuc: lay tu bang LuongPhuCap > LuongCoBan, loc theo NhanVienId
		, ISNULL((SELECT LPC.LuongCoBan
		FROM LuongPhuCap LPC WITH(NOLOCK, READUNCOMMITTED) 
		WHERE 
		LPC.NhanVienId = NV.NhanVienId ),0) AS LuongDongBHXH

		-- Luong Chinh Thuc
		-- Cong Thuc: lay tu bang HopDong > Luong * muc huong luong (vd: 0.85), loc theo NhanVienId
		-- Neu trong thang tinh luong trai qua nhieu hop dong thi tinh luong theo ti le thoi gian tung hop dong trong thang
		--------------------------------------------------
		,ISNULL(
			(
				SELECT SUM(BANGTAM.LuongTheoTyLe)
				FROM
				(
				select qlhd.NhanVienId
				,case 
					when 
					((year(qlhd.TuNgay) * 100 + month(qlhd.TuNgay)) <> (year(BL.ThangNam) * 100 + month(BL.ThangNam))) 
					and 
					((year(ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay)) * 100 + month(ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay))) = (year(BL.ThangNam) * 100 + month(BL.ThangNam)))
					then (day(ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay))/ CAST(DAY(EOMONTH(BL.ThangNam)) as decimal))*(Luong*HuongLuong)

					when 
					((year(qlhd.TuNgay) * 100 + month(qlhd.TuNgay)) = (year(BL.ThangNam) * 100 + month(BL.ThangNam))) 
					and 
					((year(ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay)) * 100 + month(ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay))) <> (year(BL.ThangNam) * 100 + month(BL.ThangNam)))
					then (((CAST(DAY(EOMONTH(BL.ThangNam)) as decimal) - day(qlhd.TuNgay))+1)/DAY(EOMONTH(BL.ThangNam)))*(Luong*HuongLuong)

					else  (Luong*HuongLuong)

				end as LuongTheoTyLe

				from QuanLyHopDong qlhd
				where
				qlhd.NhanVienId =  NV.NhanVienId
				and
				(
					year(BL.ThangNam) * 100 + month(BL.ThangNam) BETWEEN year(qlhd.TuNgay) * 100 + month(qlhd.TuNgay) AND
																 year(ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay)) * 100 + month(ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay))
				)
				) AS BANGTAM
				GROUP BY BANGTAM.NhanVienId
			)
		,0) as LuongChinhThuc
		--------------------------------------------------------

		-- Luong Ngay = Luong Chinh Thuc / Ngay cong
		--------------------------------------------------
		,ISNULL(
			(
				SELECT SUM(BANGTAM.LuongTheoTyLe)
				FROM
				(
				select qlhd.NhanVienId
				,case 
					when 
					((year(qlhd.TuNgay) * 100 + month(qlhd.TuNgay)) <> (year(BL.ThangNam) * 100 + month(BL.ThangNam))) 
					and 
					((year(ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay)) * 100 + month(ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay))) = (year(BL.ThangNam) * 100 + month(BL.ThangNam)))
					then (day(ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay))/ CAST(DAY(EOMONTH(BL.ThangNam)) as decimal))*Luong

					when 
					((year(qlhd.TuNgay) * 100 + month(qlhd.TuNgay)) = (year(BL.ThangNam) * 100 + month(BL.ThangNam))) 
					and 
					((year(ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay)) * 100 + month(ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay))) <> (year(BL.ThangNam) * 100 + month(BL.ThangNam)))
					then (((CAST(DAY(EOMONTH(BL.ThangNam)) as decimal) - day(qlhd.TuNgay))+1)/DAY(EOMONTH(BL.ThangNam)))*Luong

					else  Luong

				end as LuongTheoTyLe

				from QuanLyHopDong qlhd
				where
				qlhd.NhanVienId =  NV.NhanVienId
				and
				(
					year(BL.ThangNam) * 100 + month(BL.ThangNam) BETWEEN year(qlhd.TuNgay) * 100 + month(qlhd.TuNgay) AND
																 year(ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay)) * 100 + month(ISNULL(qlhd.NgayKetThucSom,qlhd.DenNgay))
				)
				) AS BANGTAM
				GROUP BY BANGTAM.NhanVienId
			)
		,0)/@NGAYCONG as LuongNgay
		--------------------------------------------------------

		-- Luong Thang
		, 0 AS LuongThang

		-- Tinh Toan Tien Cong Tac phi tu bang PhieuCongTac
		-- Cong thuc: Tong ThanhToan theo NhanVienId, Thang/Nam Ngay = Thang/Nam Bangluong
		--			, trang thai la Da Duyet (PCT_DY), va chua bi xoa
		,ISNULL((SELECT SUM(PCT.ThanhToan)
		FROM PhieuCongTac PCT  WITH(NOLOCK, READUNCOMMITTED) 
		WHERE 
		PCT.NhanVienId = NV.NhanVienId AND
		YEAR(PCT.NgayVe) = YEAR(BL.ThangNam) AND
		MONTH(PCT.NgayVe) = MONTH(BL.ThangNam) AND
		PCT.MaTrangThai = 'PCT_DY' AND
		PCT.XoaYN = N'N'),0) AS TienCongTacPhi

		-- Tinh Toan Tien Thuong tu bang KhenThuong + KhenThuongCaNhan
		-- Cong thuc: KhenThuong.Tien + KhenThuongCaNhan.Tien loc theo NhanVienId, Thang/Nam Ngay = Thang/Nam Bangluong
		--			, chua bi xoa
		,ISNULL((SELECT SUM(KT.Tien)
		FROM KhenThuong KT  WITH(NOLOCK, READUNCOMMITTED) 
		WHERE 
		YEAR(KT.Ngay) = YEAR(BL.ThangNam) AND
		MONTH(KT.Ngay) = MONTH(BL.ThangNam) AND
		KT.XoaYN = N'N'),0) 
		+
		ISNULL((SELECT SUM(KTCN.Tien)
		FROM KhenThuongCaNhan KTCN  WITH(NOLOCK, READUNCOMMITTED) 
		WHERE 
		KTCN.NhanVienId = NV.NhanVienId AND
		YEAR(KTCN.Ngay) = YEAR(BL.ThangNam) AND
		MONTH(KTCN.Ngay) = MONTH(BL.ThangNam) AND
		KTCN.XoaYN = N'N'),0) 

		AS TienThuong

		-- Tien dien thoai
		-- Cong Thuc: lay tu bang LuongPhuCap > DienThoai, loc theo NhanVienId
		,ISNULL((SELECT LPC.DienThoai
		FROM LuongPhuCap LPC WITH(NOLOCK, READUNCOMMITTED) 
		WHERE 
		LPC.NhanVienId = NV.NhanVienId ),0) AS TienDienThoai

		-- Tien trach nhiem
		-- Cong Thuc: lay tu bang LuongPhuCap > TrachNhiem, loc theo NhanVienId
		,ISNULL((SELECT LPC.TrachNhiem
		FROM LuongPhuCap LPC WITH(NOLOCK, READUNCOMMITTED) 
		WHERE 
		LPC.NhanVienId = NV.NhanVienId ),0) AS TienTrachNhiem

		-- Tien com trua
		-- Cong Thuc: lay tu bang LuongPhuCap > ComTrua, loc theo NhanVienId
		,ISNULL((SELECT LPC.ComTrua
		FROM LuongPhuCap LPC WITH(NOLOCK, READUNCOMMITTED) 
		WHERE 
		LPC.NhanVienId = NV.NhanVienId ),0) AS TienCom

		-- Tinh Toan  Tang ca tu bang TangCa
		-- Cong thuc: Tong gio Tang ca theo NhanVienId, Thang/Nam Ngay = Thang/Nam Bangluong
		--			, trang thai la Da Duyet (PCT_DY), va chua bi xoa, Nhan He So Loai Tang Ca
		,ISNULL((SELECT SUM(TC.SoGio 
			* 
			(CASE 
				WHEN TC.Loai='l150' THEN @V_LoaiTangCa_l150
				WHEN TC.Loai='l200' THEN @V_LoaiTangCa_l200
				ELSE @V_LoaiTangCa_l300
			END))
		FROM TangCa TC  WITH(NOLOCK, READUNCOMMITTED) 
		WHERE 
		TC.NhanVienId = NV.NhanVienId AND
		YEAR(TC.NgayTangCa) = YEAR(BL.ThangNam) AND
		MONTH(TC.NgayTangCa) = MONTH(BL.ThangNam) AND
		TC.MaTrangThai = 'TC_DY' AND
		TC.XoaYN = N'N'),0) AS TienTangCa

		-- Tinh Toan  Nghi Phep tu bang NghiPhep
		-- Cong thuc: Tong Nghi Phep theo NhanVienId, Thang/Nam DenNgay = Thang/Nam NghiPhep
		--			, trang thai la Da Duyet (NP_DY), va chua bi xoa
		,ISNULL((SELECT SUM(NP.SoNgay)
		FROM NghiPhep NP  WITH(NOLOCK, READUNCOMMITTED) 
		WHERE 
		NP.NhanVienId = NV.NhanVienId AND
		YEAR(NP.DenNgay) = YEAR(BL.ThangNam) AND
		MONTH(NP.DenNgay) = MONTH(BL.ThangNam) AND
		NP.MaTrangThai = 'NP_DY' AND
		NP.XoaYN = N'N'),0) AS NghiCoPhep

		--
		,0 AS NghiKhongPhep

		--
		,0 AS TruBHXH

		--
		,0 AS TruBHYT

		--
		,0 AS TruBHTN

		--
		,0 AS TruCongDoan

		-- Tinh Toan Tru Luong tu bang KyLuat
		-- Cong thuc: Tong Tien Tru Luong theo NhanVienId, Thang/Nam Ngay = Thang/Nam KyLuat
		--			va chua bi xoa
		,ISNULL((SELECT SUM(KL.Tien)
		FROM KyLuat KL  WITH(NOLOCK, READUNCOMMITTED) 
		WHERE 
		KL.NhanVienId = NV.NhanVienId AND
		YEAR(KL.Ngay) = YEAR(BL.ThangNam) AND
		MONTH(KL.Ngay) = MONTH(BL.ThangNam) AND
		KL.XoaYN = N'N'),0) AS TruLuong

		-- Tinh Toan Tru Tam Ung tu bang Tam Ung
		-- Cong thuc: Tong Tien Tam Ung theo NhanVienId, Thang/Nam DenNgay = Thang/Nam TamUng
		--			, trang thai la Da Duyet (NP_DY), va chua bi xoa
		,ISNULL((SELECT SUM(TU.Tien)
		FROM TamUng TU  WITH(NOLOCK, READUNCOMMITTED) 
		WHERE 
		TU.NhanVienId = NV.NhanVienId AND
		YEAR(TU.Ngay) = YEAR(BL.ThangNam) AND
		MONTH(TU.Ngay) = MONTH(BL.ThangNam) AND
		TU.MaTrangThai = 'TU_DY' AND
		TU.XoaYN = N'N'),0) AS TruTamUng

		--
		,0 AS ThucLanh

		-- Lay Danh Sach Nhan Vien co trang thai dang lam viec theo Bang Luong
		FROM NHANVIEN NV  WITH(NOLOCK, READUNCOMMITTED) 
		INNER JOIN BANGLUONG BL WITH(NOLOCK, READUNCOMMITTED) 
		ON BL.BangLuongId =  @BANGLUONG_ID AND BL.XoaYN = N'N'
		WHERE
		(
			@NHANVIEN_IDS = ''
			AND NV.XoaYN = 'N'
			AND NV.MaTrangThai = 'NV_DL'
		)
		OR
		(
			@NHANVIEN_IDS <> ''
			AND CHARINDEX('|' + CAST(NV.NhanVienId AS VARCHAR(14)) + '|','|' +  @NHANVIEN_IDS + '|') > 0
			AND NV.XoaYN = 'N'
			AND NV.MaTrangThai = 'NV_DL'
		)


	) AS BANGTINHTOAN

	LEFT JOIN NHANVIEN NV WITH(NOLOCK, READUNCOMMITTED) 
	ON BANGTINHTOAN.NhanVienId = NV.NhanVienId
	LEFT JOIN BANGLUONG BL WITH(NOLOCK, READUNCOMMITTED) 
	ON BANGTINHTOAN.BangLuongId = BL.BangLuongId
	LEFT JOIN PHONGBAN PB WITH(NOLOCK, READUNCOMMITTED) 
	ON NV.PhongBanId = PB.PhongBanId
	LEFT JOIN CHUCVU CV WITH(NOLOCK, READUNCOMMITTED) 
	ON NV.ChucVuId = CV.ChucVuId;

	SELECT count(*) AS RESULT_COUNT
	FROM BangLuongCaNhan BLCN
	WHERE
	(
		@NHANVIEN_IDS = ''
		AND BLCN.BangLuongId = @BANGLUONG_ID
	)
	OR
	(
		@NHANVIEN_IDS <> ''
		AND CHARINDEX('|' + CAST(BLCN.NhanVienId AS VARCHAR(14)) + '|','|' +  @NHANVIEN_IDS + '|') > 0
		AND BLCN.BangLuongId = @BANGLUONG_ID
	)

---- Thực thi câu SQL


---- kết thúc và hủy bảng tạm (nếu có)

-----------------------------------------------------
SET NOCOUNT OFF
END

