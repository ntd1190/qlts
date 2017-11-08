USE [QLTS]
GO

/*
EXEC [dbo].[sp_BaoCao_BaoCaoCongKhaiTinhHinhXuLyTSBieu06] @TuNgay = '2017-10-05 02:12:35', -- datetime
    @DenNgay = '2017-11-05 02:12:35', -- datetime
    @NhanVienId = N'1', -- nvarchar(10)
    @CoSoId = N'1' -- nvarchar(10)
*/

ALTER PROC [dbo].[sp_BaoCao_BaoCaoCongKhaiTinhHinhXuLyTSBieu06]
( 
	@TuNgay DATETIME,
	@DenNgay DATETIME,
	@NhanVienId NVARCHAR(10),
	@CoSoId NVARCHAR(10)
)
AS  
BEGIN
------------------------------------------------------------------------------------------------------------------------------------------------
	DECLARE @tb_NganSach TABLE
	(
		_MaNganSach NVARCHAR(50),
		_TenNganSach NVARCHAR(500)
	)
	DECLARE @tb_NganSachTaiSan TABLE
	(
		TaiSanId INT,
		MaNguonNganSach NVARCHAR(50),
		TenNguonNganSach NVARCHAR(500),
		GiaTri NUMERIC(18,4)
	)
	INSERT @tb_NganSach SELECT MaNguonNganSach,TenNguonNganSach FROM dbo.NguonNganSach

	INSERT @tb_NganSachTaiSan( TaiSanId ,MaNguonNganSach ,TenNguonNganSach ,GiaTri)
	SELECT NG.TaiSanId, NNS.MaNguonNganSach, NNS.TenNguonNganSach, ISNULL(NG.GiaTri,0)
	FROM dbo.NguonNganSach NNS
	LEFT JOIN dbo.NguyenGia NG ON NG.NguonNganSachId = NNS.NguonNganSachId
	LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = NG.TaiSanId
	WHERE TS.CoSoId = @CoSoId

	DECLARE @tb_Result TABLE
	(
		RowId INT IDENTITY(1,1),
		CoSoId INT,
		TaiSanId INT,
		NgayGhiGiam DATETIME,
		TenXuLy NVARCHAR(500),
		SoLuong NUMERIC(18,4),
		NguonBaoHiem NUMERIC(18,4) DEFAULT 0,
		NguonNganSach NUMERIC(18,4) DEFAULT 0,
		NguonVienTro NUMERIC(18,4) DEFAULT 0,
		NguonKhac NUMERIC(18,4) DEFAULT 0
	)

	INSERT @tb_Result( CoSoId, TaiSanId, NgayGhiGiam ,TenXuLy ,SoLuong)
	SELECT H.CoSoId, L.TaiSanId, H.NgayGhiGiam, XL.TenXuLy, L.SoLuong
	FROM dbo.GhiGiam H
	JOIN dbo.GhiGiamChiTiet  L ON L.GhiGiamId = H.GhiGiamId
	LEFT JOIN dbo.XuLy XL ON XL.XuLyId = L.XuLyId
	WHERE CAST(H.NgayGhiGiam AS DATE) BETWEEN CAST(@TuNgay AS DATE) AND CAST(@DenNgay AS DATE)
	AND H.CoSoId = @CoSoId
	
	DECLARE @V_MaNganSach NVARCHAR(50), @V_TenNganSach NVARCHAR(500)
	WHILE EXISTS(SELECT 1 FROM @tb_NganSach)
	BEGIN
		SELECT TOP 1 @V_MaNganSach = [_MaNganSach], @V_TenNganSach= [_TenNganSach] FROM @tb_NganSach
		IF (CHARINDEX(N'bảo hiểm', LOWER(@V_TenNganSach)) > 0)
		BEGIN
			UPDATE RS
			SET RS.NguonBaoHiem = NSTS.GiaTri
			FROM @tb_Result RS 
			LEFT JOIN @tb_NganSachTaiSan NSTS ON NSTS.TaiSanId = RS.TaiSanId
			WHERE NSTS.MaNguonNganSach = @V_MaNganSach
		END
		ELSE IF (CHARINDEX(N'ngân sách viện trợ', LOWER(@V_TenNganSach)) > 0)
		BEGIN
			UPDATE RS
			SET RS.NguonVienTro = NSTS.GiaTri
			FROM @tb_Result RS 
			LEFT JOIN @tb_NganSachTaiSan NSTS ON NSTS.TaiSanId = RS.TaiSanId
			WHERE NSTS.MaNguonNganSach = @V_MaNganSach
		END
		ELSE IF (CHARINDEX(N'nguồn ngân sách', LOWER(@V_TenNganSach)) > 0)
		BEGIN
			UPDATE RS
			SET RS.NguonNganSach = NSTS.GiaTri
			FROM @tb_Result RS 
			LEFT JOIN @tb_NganSachTaiSan NSTS ON NSTS.TaiSanId = RS.TaiSanId
			WHERE NSTS.MaNguonNganSach = @V_MaNganSach
		END
		ELSE
        BEGIN
			UPDATE RS
			SET RS.NguonKhac = RS.NguonKhac + NSTS.GiaTri
			FROM @tb_Result RS 
			LEFT JOIN @tb_NganSachTaiSan NSTS ON NSTS.TaiSanId = RS.TaiSanId
			WHERE NSTS.MaNguonNganSach = @V_MaNganSach
		END
		

		DELETE @tb_NganSach WHERE [_MaNganSach] = @V_MaNganSach
		SELECT @V_MaNganSach = NULL, @V_TenNganSach =NULL
	END

	SELECT CS.MaCoSo, CS.TenCoSo, @TuNgay TuNgay, @DenNgay DenNgay,
			ts.TenTaiSan, NTS.TenNhom, LTS.TenLoai, rs.TenXuLy,
			CASE WHEN CHARINDEX(N'ĐIỀU CHUYỂN', UPPER(rs.TenXuLy)) > 0 THEN 'X' ELSE '' END HTXLDieuChuyen,
			CASE WHEN CHARINDEX(N'CHUYỂN NHƯỢNG', UPPER(rs.TenXuLy)) > 0 OR 
					  CHARINDEX(N'BÁN ĐẤU GIÁ', UPPER(rs.TenXuLy)) > 0 THEN 'X' ELSE '' END HTXLChuyenNhuong,
			CASE WHEN CHARINDEX(N'ĐIỀU CHUYỂN', UPPER(rs.TenXuLy)) <= 0 AND 
					  CHARINDEX(N'CHUYỂN NHƯỢNG', UPPER(rs.TenXuLy)) <= 0 AND
					  CHARINDEX(N'BÁN ĐẤU GIÁ', UPPER(rs.TenXuLy)) <=0 THEN 'X' ELSE '' END HTXLKhac,
			rs.NguonNganSach NguonNganSach,
			(rs.NguonBaoHiem + rs.NguonVienTro + rs.NguonKhac) NguonKhac,
			(
					(rs.NguonBaoHiem + rs.NguonVienTro + rs.NguonKhac + rs.NguonNganSach) - (
																								DATEDIFF(YEAR, TS.NgayBDHaoMon, rs.NgayGhiGiam) * 
																								((rs.NguonBaoHiem + rs.NguonVienTro + rs.NguonKhac + rs.NguonNganSach) * TS.TyLeHaoMon / 100)
																								)
			) GiaTriConLai
	FROM @tb_Result rs
	LEFT JOIN dbo.TaiSan ts ON ts.TaiSanId = rs.TaiSanId
	LEFT JOIN dbo.LoaiTaiSan LTS ON LTS.LoaiId = ts.LoaiId
	LEFT JOIN dbo.NhomTaiSan NTS ON NTS.NhomId = LTS.NhomId
	LEFT JOIN dbo.CoSo CS ON CS.CoSoId = rs.CoSoId

	--DECLARE @V_TableName NVARCHAR(50), @cols AS NVARCHAR(MAX), @query  AS NVARCHAR(MAX)

	--SET @V_TableName = 'TEMPORARY' + @NhanVienId + @CoSoId;

	--IF OBJECT_ID('tempdb..##' + @V_TableName) IS NOT NULL
	--BEGIN
	--	EXEC ('DROP TABLE [##' + @V_TableName + ']')
	--END
	--IF OBJECT_ID('tempdb..#abcd1') IS NOT NULL
	--BEGIN
	--	DROP TABLE #abcd1
	--END
	--CREATE TABLE #abcd1
	--(
	--	id INT
	--)
	--select @cols = STUFF((SELECT ',' + QUOTENAME(TenNguonNganSach) 
 --                   from dbo.NguonNganSach 
 --                   group by TenNguonNganSach
 --                   order by TenNguonNganSach
 --           FOR XML PATH(''), TYPE
 --           ).value('.', 'NVARCHAR(MAX)') 
 --       ,1,1,'')

	--set @query = '
			
	--		SELECT * INTO ##' + @V_TableName +' from (
	--		SELECT TaiSanId,' + @cols + ' from 
 --           (
 --               SELECT NG.TaiSanId, NNS.MaNguonNganSach, NNS.TenNguonNganSach, NG.GiaTri
	--			FROM dbo.NguonNganSach NNS
	--			LEFT JOIN dbo.NguyenGia NG ON NG.NguonNganSachId = NNS.NguonNganSachId
	--			LEFT JOIN dbo.TaiSan TS ON TS.TaiSanId = NG.TaiSanId
	--			WHERE TS.CoSoId = ' + @CoSoId + '
 --           ) x
 --           pivot 
 --           (
 --               sum(GiaTri)
 --               for TenNguonNganSach in (' + @cols + ')
 --           ) p ) AS B
	--		SELECT * from ##' + @V_TableName +' 
	--		 '
	--PRINT @query

	--EXECUTE(@query)

	
-----------------------------------------------------
END
