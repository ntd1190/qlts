/**************************************************
1. Create Date	: 2017.09.14
2. Creator		: NGUYỄN THANH BÌNH
3. Description	: 
4. Function		: 
5. Example		: 
					DECLARE @MESSAGE	NVARCHAR(MAX)
					EXEC [sp_ThayDoiThongTinNha_GetThayDoiThongTinNhaById]
						 @ThayDoiThongTinId		=	26

						,@CoSoId				=	1
						,@NhanVienId			=	6
						,@MESSAGE				=	@MESSAGE OUTPUT
					SELECT	@MESSAGE MESSAGE
6. Precaution	:
7. History		:
				  2017.09.14 (NGUYỄN THANH BÌNH) - Tạo mới
**************************************************/
ALTER PROCEDURE [dbo].[sp_ThayDoiThongTinNha_GetThayDoiThongTinNhaById]
	 @ThayDoiThongTinId	INT				=	NULL

	,@CoSoId			INT				=	NULL
	,@NhanVienId		INT				=	NULL
	,@MESSAGE			NVARCHAR(MAX)		OUTPUT
AS  
BEGIN
SET NOCOUNT ON 
	SET @MESSAGE = ISNULL(@MESSAGE,'')
	SELECT	 TDTT_NHA.ThayDoiThongTinId
			,ISNULL(TDTT_NHA.BiLanChiemCu		, TTKK_NHA.BiLanChiem) BiLanChiemCu
			,ISNULL(TDTT_NHA.BoTrongCu			, TTKK_NHA.BoTrong) BoTrongCu
			,ISNULL(TDTT_NHA.CapHangCu			, TTKK_NHA.CapHang) CapHangCu
			,ISNULL(TDTT_NHA.ChoThueCu			, TTKK_NHA.ChoThue) ChoThueCu
			,ISNULL(TDTT_NHA.CoSoHDSuNghiepCu	, TTKK_NHA.CoSoHDSuNghiep) CoSoHDSuNghiepCu
			,ISNULL(TDTT_NHA.DiaChiCu			, TTKK_NHA.DiaChi) DiaChiCu
			,ISNULL(TDTT_NHA.DienTichCu			, TTKK_NHA.DienTich) DienTichCu
			,ISNULL(TDTT_NHA.GiayToCu			, TTKK_NHA.GiayTo) GiayToCu
			,ISNULL(TDTT_NHA.LamTruSoCu			, TTKK_NHA.LamTruSo) LamTruSoCu
			,ISNULL(TDTT_NHA.NamSuDungCu		, TTKK_NHA.NamSuDung) NamSuDungCu
			,ISNULL(TDTT_NHA.NhaOCu				, TTKK_NHA.NhaO) NhaOCu
			,ISNULL(TDTT_NHA.SoTangCu			, TTKK_NHA.SoTang) SoTangCu
			,ISNULL(TDTT_NHA.SuDungKhacCu		, TTKK_NHA.SuDungKhac) SuDungKhacCu
			,ISNULL(TDTT_NHA.TongDienTichSanCu	, TTKK_NHA.TongDienTichSan) TongDienTichSanCu
	FROM	ThayDoiThongTin_Nha TDTT_NHA
			LEFT JOIN ThayDoiThongTin TDTT ON TDTT_NHA.ThayDoiThongTinId = TDTT.ThayDoiThongTinId
			LEFT JOIN ThongTinKeKhai_Nha TTKK_NHA ON TDTT.TaiSanId = TTKK_NHA.TaiSanId
	WHERE	TDTT_NHA.ThayDoiThongTinId = @ThayDoiThongTinId
SET NOCOUNT OFF
END

