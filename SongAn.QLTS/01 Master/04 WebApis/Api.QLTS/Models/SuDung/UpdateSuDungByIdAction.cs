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
    public class UpdateSuDungByIdAction
    {
        public string suDungId { get; set; }
        public string phieuSuDung { get; set; }
        public string listChiTiet { get; set; }
        public string loginId { get; set; }

        #region private
        private Entity.QLTS.Entity.SuDung _phieuBaoDuong;
        private List<Entity.QLTS.Entity.SuDungChiTiet> _listChiTiet;
        private int _LoginId;
        private int _suDungId = 0;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                if (_suDungId < 1)
                {
                    return returnActionError(HttpStatusCode.BadRequest, "Không tìm thấy SuDungId");
                }

                var bizHeader = new UpdateSuDungByIdBiz(context);
                var bizLine = new InsertSuDungChiTietBiz(context);

                bizHeader.SuDungId = _suDungId;
                bizHeader.KyLap = _phieuBaoDuong.KyLap;
                bizHeader.Nam = _phieuBaoDuong.Nam;
                bizHeader.NoiDung = _phieuBaoDuong.NoiDung;
                bizHeader.CoSoId = _phieuBaoDuong.CoSoId;
                bizHeader.NguoiTao = _phieuBaoDuong.NguoiTao;

                var result = await bizHeader.Execute();

                foreach (var item in _listChiTiet)
                {
                    bizLine = new InsertSuDungChiTietBiz(context);
                    bizLine.SuDungId = Protector.Int(_suDungId);
                    bizLine.TaiSanId = Protector.Int(item.TaiSanId);
                    bizLine.SoSanPhamPhucVu = Protector.Decimal(item.SoSanPhamPhucVu);
                    bizLine.DonViTinhSanPham = item.DonViTinhSanPham;
                    bizLine.SoNguyenLieuSuDung = Protector.Decimal(item.SoNguyenLieuSuDung);
                    bizLine.DonViTinhNguyenLieu = item.DonViTinhNguyenLieu;
                    bizLine.GhiChu = item.GhiChu;

                    var result_line = await bizLine.Execute();
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, result, _metaData);
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
            _suDungId = Protector.Int(suDungId, 0);

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
