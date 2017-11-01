/**************************************************
1. Create Date	: 2017.10.06
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_TraCuuTaiSan_LuocSu]
						 @TAISANID		=	0
						,@NHANVIENID	=	0
						,@PHONGBANID	=	0
						,@NHANVIEN_ID	=	6
						,@COSO_ID		=	1
						,@MESSAGE		=	@MESSAGE	OUTPUT

					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.10.06 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_TraCuuTaiSan_LuocSu]
			 @TAISANID		INT					=	NULL
			,@NHANVIENID	INT					=	NULL
			,@PHONGBANID	INT					=	NULL
			,@NHANVIEN_ID	INT					=	NULL
			,@COSO_ID		INT					=	NULL
			,@MESSAGE		NVARCHAR(MAX)		OUTPUT
AS
BEGIN
	SET NOCOUNT ON;
--------------------------------------------------
SET @MESSAGE = ISNULL(@MESSAGE,'')

IF OBJECT_ID('TEMPDB..##LUOCSU') IS NOT NULL
	DROP TABLE ##LUOCSU

SELECT * INTO ##LUOCSU FROM
(
			SELECT		DG.DanhGiaId Id
						,DG.NoiDung
						,DG.NgayDanhGia Ngay,'DANHGIA' [Type],DG.TaiSanId,DG.NhanVienId,DG.PhongBanId 
			FROM		DanhGia DG
			WHERE		DG.TaiSanId = @TAISANID

	UNION	SELECT		KT.KhaiThacId ID
						,concat(	 N'- Phòng ban: ',PB.TenPhongBan
									,N'<br />- Cán bộ: ',NV.TenNhanVien
									,N'<br />- Số lượng: ',FORMAT(KT.SoLuongKhaiThac, 'N0')
								    ,N'<br />- Đơn vị thuê: ',KH.TenKhachHang
								    ,N'<br />- Số hợp đồng: ',HD.SoHopDong
								) MoTa
						,KT.ThoiGianBatDau,'KHAITHAC',KT.TaiSanId,KT.NhanVienId,KT.PhongBanId
			FROM		KhaiThac KT 
						LEFT JOIN PhongBan PB ON KT.PhongBanId = PB.PhongBanId
						LEFT JOIN NhanVien NV ON KT.NhanVienId = NV.NhanVienId
						LEFT JOIN KhachHang KH ON KT.KhachHangNCCId = KH.KhachHangId
						LEFT JOIN HopDong HD ON KT.HopDongId = HD.HopDongId
			WHERE		KT.TaiSanId = @TAISANID AND KT.NhanVienId = @NHANVIENID AND KT.PhongBanId = @PHONGBANID

	UNION	SELECT		TDTT.ThayDoiThongTinId ID,TDTT.LyDo,TDTT.Ngay,'TDTT',TDTT.TaiSanId,'','' 
			FROM		ThayDoiThongTin TDTT 
			WHERE		TDTT.TaiSanId = @TAISANID

	UNION	SELECT		GTCT.GhiTangId
						,concat(	 N'- Phòng ban: ',PB.TenPhongBan
									,N'<br />- Cán bộ: ',NV.TenNhanVien
									,N'<br />- Số lượng: ',FORMAT(GTCT.SoLuong, 'N0')
								    ,N'<br />- Số hợp đồng: ',HD.SoHopDong
								) MoTa
						,GT.NgayGhiTang,'GHITANG',GTCT.TaiSanId,GTCT.NhanVienId,GTCT.PhongBanId 
			FROM		GhiTangChiTiet GTCT 
						LEFT JOIN GHITANG GT ON GTCT.GhiTangId = GT.GhiTangId
						LEFT JOIN PhongBan PB ON GTCT.PhongBanId = PB.PhongBanId
						LEFT JOIN NhanVien NV ON GTCT.NhanVienId = NV.NhanVienId
						LEFT JOIN HopDong HD ON GTCT.HopDongId = HD.HopDongId
			WHERE		GTCT.TaiSanId = @TAISANID AND GTCT.NhanVienId = @NHANVIENID AND GTCT.PhongBanId = @PHONGBANID

	UNION	SELECT		GGCT.GhiGiamId
						,concat(	 N'- Phòng ban: ',PB.TenPhongBan,N'<br />- Cán bộ: ',NV.TenNhanVien,N'<br />- Số lượng: ',FORMAT(GGCT.SoLuong, 'N0') 
								) MoTa
						,GG.NgayGhiGiam,'GHIGIAM',GGCT.TaiSanId,GGCT.NhanVienId,GGCT.PhongBanId 
			FROM		GhiGiamChiTiet GGCT 
						LEFT JOIN GhiGiam GG ON GGCT.GhiGiamId = GG.GhiGiamId
						LEFT JOIN PhongBan PB ON GGCT.PhongBanId = PB.PhongBanId
						LEFT JOIN NhanVien NV ON GGCT.NhanVienId = NV.NhanVienId
			WHERE		GGCT.TaiSanId = @TAISANID AND GGCT.NhanVienId = @NHANVIENID AND GGCT.PhongBanId = @PHONGBANID

	UNION	SELECT		DCCT.DieuChuyenId
						,concat(	 N'- Chuyển từ: ',PB_SD.TenPhongBan,' - ',NV_SD.TenNhanVien
									,N'<br />- Chuyển đến: ',PB_CD.TenPhongBan,' - ',NV_CD.TenNhanVien
								) MoTa
						,DC.NgayDieuChuyen,'DIEUCHUYEN',DCCT.TaiSanId,DCCT.NhanVienTiepNhan,DCCT.PhongBanChuyenDen 
			FROM		DieuChuyenChiTiet DCCT 
						LEFT JOIN DieuChuyen DC ON DCCT.DieuChuyenId = DC.DieuChuyenId
						LEFT JOIN PhongBan PB_SD ON DCCT.PhongBanSuDung = PB_SD.PhongBanId
						LEFT JOIN PhongBan PB_CD ON DCCT.PhongBanChuyenDen = PB_CD.PhongBanId
						LEFT JOIN NhanVien NV_SD ON DCCT.NhanVienSuDung = NV_SD.NhanVienId
						LEFT JOIN NhanVien NV_CD ON DCCT.NhanVienTiepNhan = NV_CD.NhanVienId
			WHERE		DCCT.TaiSanId = @TAISANID AND DCCT.NhanVienTiepNhan = @NHANVIENID AND DCCT.PhongBanChuyenDen = @PHONGBANID
	
	UNION	SELECT		BD.BaoDuongId
						,concat(
							 N'- Ngày bảo dưỡng: ',CONVERT(VARCHAR(10),bd.NgayBaoDuong,103)
							,N'<br />- Các bộ phận sửa chữa: ',sc.TenBoPhan
							,N'<br />- Mô tả: ',BD.MoTa
							) MoTa
						,BD.NgayBaoDuong,'BAODUONG',BD.TaiSanId,BD.NhanVienId,BD.PhongBanId
			FROM		BaoDuong BD 
						LEFT JOIN (
								SELECT
									 BaoDuongId,
									 STUFF(
										 (SELECT ',' + TenBoPhan
										  FROM SuaChua
										  WHERE BaoDuongId = SC.BaoDuongId
										  FOR XML PATH (''))
										  , 1, 1, '')  TenBoPhan
								FROM SuaChua SC
								GROUP BY BaoDuongId
						) SC ON BD.BaoDuongId = SC.BaoDuongId
			WHERE		BD.TaiSanId = @TAISANID AND BD.NhanVienId = @NHANVIENID AND BD.PhongBanId = @PHONGBANID
) TEMP

SELECT	LS.*,PB.TenPhongBan,NV.TenNhanVien,TS.TenTaiSan 
FROM	##LUOCSU LS
		LEFT JOIN TaiSan TS ON LS.TaiSanId = TS.TaiSanId
		LEFT JOIN PhongBan PB ON LS.PhongBanId = PB.PhongBanId
		LEFT JOIN NhanVien NV ON LS.NhanVienId = NV.NhanVienId
ORDER BY LS.Ngay DESC

IF OBJECT_ID('TEMPDB..##LUOCSU') IS NOT NULL
	DROP TABLE ##LUOCSU
--------------------------------------------------
	SET NOCOUNT OFF;
END
