/*****************************************************************************
1. Create Date : 2017.08.31
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.08.31(NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using Newtonsoft.Json;
using SongAn.QLTS.Biz.QLTS.TaiSan;
using SongAn.QLTS.Util.Common.CustomException;
using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace SongAn.QLTS.Api.QLTS.Models.NhomTaiSan
{
    public class UpdateTaiSanAction : Entity.QLTS.Entity.TaiSan
    {

        #region public
        public int NhanVienId { get; set; }
        public string NguyenGiaList { get; set; }
        #endregion
        #region private
        private List<Entity.QLTS.Entity.NguyenGia> _NguyenGiaList { get; set; }
        #endregion
        #region init & validate
        private void init() {
            NguyenGiaList = Protector.String(NguyenGiaList, "{}");
            _NguyenGiaList = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.NguyenGia>>(NguyenGiaList);
        }

        private void validate() { }
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new UpdateTaiSanBiz(context);
                biz.TaiSan = new Entity.QLTS.Entity.TaiSan();

                biz.TaiSan.TaiSanId = TaiSanId;
                biz.TaiSan.MaTaiSan = MaTaiSan;
                biz.TaiSan.TenTaiSan = TenTaiSan;
                biz.TaiSan.DonViTinh = DonViTinh;
                biz.TaiSan.LoaiId = LoaiId;
                biz.TaiSan.PhuongThucId = PhuongThucId;
                biz.TaiSan.NamSanXuat = NamSanXuat;
                biz.TaiSan.NuocSanXuatId = NuocSanXuatId;
                biz.TaiSan.HangSanXuatId = HangSanXuatId;
                biz.TaiSan.SoQDTC = SoQDTC;
                biz.TaiSan.NhanHieu = NhanHieu;
                biz.TaiSan.DuAnId = DuAnId;
                biz.TaiSan.NgayMua = NgayMua;
                biz.TaiSan.NgayGhiTang = NgayGhiTang;
                biz.TaiSan.NgayBDHaoMon = NgayBDHaoMon;
                biz.TaiSan.SoNamSuDung = SoNamSuDung;
                biz.TaiSan.TyLeHaoMon = TyLeHaoMon;
                biz.TaiSan.HaoMonLuyKe = HaoMonLuyKe;
                biz.TaiSan.NgayBDKhauHao = NgayBDKhauHao;
                biz.TaiSan.KyTinhKhauHao = KyTinhKhauHao;
                biz.TaiSan.GiaTriKhauHao = GiaTriKhauHao;
                biz.TaiSan.SoKyKhauHao = SoKyKhauHao;
                biz.TaiSan.TyLeKhauHao = TyLeKhauHao;
                biz.TaiSan.KhauHaoLuyKe = KhauHaoLuyKe;
                biz.TaiSan.LoaiKeKhai = LoaiKeKhai;

                biz.TaiSan.CtrVersion = CtrVersion;

                biz.NguyenGiaList = _NguyenGiaList;

                biz.TaiSan.CoSoId = CoSoId;
                biz.NhanVienId = NhanVienId;
                var result = await biz.Execute();

                if (string.IsNullOrEmpty(biz.MESSAGE) == false)
                {
                    throw new BaseException(biz.MESSAGE.Split('|')[2]);
                }

                return returnActionResult(HttpStatusCode.OK, result, null);
            }
            catch (FormatException ex)
            {
                return returnActionError(HttpStatusCode.BadRequest, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
            catch (Exception ex)
            {
                return returnActionError(HttpStatusCode.InternalServerError, ex.InnerException != null ? ex.InnerException.Message : ex.Message);
            }
        }

        #region helpers
        private ActionResultDto returnActionError(HttpStatusCode code, string message)
        {
            var _error = new ActionResultDto();
            _error.ReturnCode = code;
            _error.ReturnData = new
            {
                error = new
                {
                    code = code,
                    type = code.ToString(),
                    message = message
                }
            };
            return _error;
        }

        private ActionResultDto returnActionResult(HttpStatusCode code, object data, object metaData)
        {
            var _result = new ActionResultDto();

            _result.ReturnCode = code;
            _result.ReturnData = new
            {
                data = data,
                metaData = metaData
            };
            return _result;
        }
        #endregion
    }
}
