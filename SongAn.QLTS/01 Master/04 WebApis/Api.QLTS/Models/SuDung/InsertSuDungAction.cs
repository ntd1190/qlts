using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.SuDung;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;
using Newtonsoft.Json;

namespace SongAn.QLTS.Api.QLTS.Models.SuDung
{
    public class InsertSuDungAction
    {
        public string suDungId { get; set; }
        public string phieuSuDung { get; set; }
        public string listChiTiet { get; set; }
        public string loginId { get; set; }

        #region private
        private Entity.QLTS.Entity.SuDung _phieuBaoDuong;
        private List<Entity.QLTS.Entity.SuDungChiTiet> _listChiTiet;
        private int _LoginId;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                int suDungId = 0;

                var bizHeader = new InsertSuDungBiz(context);
                var bizLine = new InsertSuDungChiTietBiz(context);

                bizHeader.KyLap = _phieuBaoDuong.KyLap;
                bizHeader.Nam = _phieuBaoDuong.Nam;
                bizHeader.NoiDung = Protector.String(_phieuBaoDuong.NoiDung);
                bizHeader.CoSoId = _phieuBaoDuong.CoSoId;
                bizHeader.NguoiTao = _LoginId;

                IEnumerable<dynamic> SuDungId = await bizHeader.Execute();
                if (SuDungId.Count() > 0)
                {
                    var obj = SuDungId.FirstOrDefault();

                    suDungId = Protector.Int(obj.SuDungIdI);
                }

                foreach (var item in _listChiTiet)
                {
                    bizLine = new InsertSuDungChiTietBiz(context);
                    bizLine.SuDungId = Protector.Int(suDungId);
                    bizLine.TaiSanId = Protector.Int(item.TaiSanId);
                    bizLine.PhongBanId = Protector.Int(item.PhongBanId);
                    bizLine.NhanVienId = Protector.Int(item.NhanVienId);
                    bizLine.SoSanPhamPhucVu = Protector.Decimal(item.SoSanPhamPhucVu);
                    bizLine.DonViTinhSanPham = Protector.String(item.DonViTinhSanPham);
                    bizLine.SoNguyenLieuSuDung = Protector.Decimal(item.SoNguyenLieuSuDung);
                    bizLine.DonViTinhNguyenLieu = Protector.String(item.DonViTinhNguyenLieu);
                    bizLine.GhiChu = Protector.String(item.GhiChu);

                    var result_line = await bizLine.Execute();
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, SuDungId, _metaData);
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

        private void init()
        {
            var __phieuBaoDuong = JsonConvert.DeserializeObject<dynamic>(phieuSuDung);

            phieuSuDung = JsonConvert.SerializeObject(__phieuBaoDuong);
            _phieuBaoDuong = JsonConvert.DeserializeObject<Entity.QLTS.Entity.SuDung>(phieuSuDung);



            var __phieuSuaChua = JsonConvert.DeserializeObject<dynamic>(listChiTiet);

            listChiTiet = JsonConvert.SerializeObject(__phieuSuaChua);
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.SuDungChiTiet>>(listChiTiet);

            _LoginId = Protector.Int(loginId, 0);

        }

        private void validate()
        {

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
