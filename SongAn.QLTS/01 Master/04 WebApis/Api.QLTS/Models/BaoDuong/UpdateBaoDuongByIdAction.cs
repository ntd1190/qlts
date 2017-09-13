using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.BaoDuong;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;
using Newtonsoft.Json;

namespace SongAn.QLTS.Api.QLTS.Models.BaoDuong
{
    public class UpdateBaoDuongByIdAction
    {
        public string baoDuongId { get; set; }
        public string phieuBaoDuong { get; set; }
        public string listChiTiet { get; set; }
        public string loginId { get; set; }

        #region private
        private Entity.QLTS.Entity.BaoDuong _phieuBaoDuong;
        private List<Entity.QLTS.Entity.SuaChua> _listChiTiet;
        private int _LoginId;
        private int _baoDuongId = 0;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                if (_baoDuongId < 1)
                {
                    return returnActionError(HttpStatusCode.BadRequest, "Không tìm thấy BaoDungId");
                }

                var bizHeader = new UpdateBaoDuongByIdBiz(context);
                var bizLine = new InsertSuaChuaBiz(context);

                bizHeader.BaoDuongId = _baoDuongId;
                bizHeader.TaiSanId = _phieuBaoDuong.TaiSanId;
                bizHeader.NgayBaoDuong = _phieuBaoDuong.NgayBaoDuong;
                bizHeader.NgayDuKien = _phieuBaoDuong.NgayDuKien;
                bizHeader.DuToan = _phieuBaoDuong.DuToan;
                bizHeader.LoaiBaoDuongId = _phieuBaoDuong.LoaiBaoDuongId;
                bizHeader.MoTa = _phieuBaoDuong.MoTa;
                bizHeader.CoSoId = _phieuBaoDuong.CoSoId;
                bizHeader.NhanVienId = _LoginId;

                var result = await bizHeader.Execute();

                foreach (var item in _listChiTiet)
                {
                    bizLine = new InsertSuaChuaBiz(context);
                    bizLine.BaoDuongId = Protector.Int(_baoDuongId);
                    bizLine.TenBoPhan = item.TenBoPhan;
                    bizLine.NgayBatDau = item.NgayBatDau;
                    bizLine.NgayKetThuc = item.NgayKetThuc;
                    bizLine.ChiPhi = item.ChiPhi;
                    bizLine.NoiDung = item.NoiDung;
                    bizLine.NoiSua = item.NoiSua;
                    bizLine.KetQua = item.KetQua;

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
            var __phieuBaoDuong = JsonConvert.DeserializeObject<dynamic>(phieuBaoDuong);
            __phieuBaoDuong.NgayBaoDuong = DateTime.ParseExact(__phieuBaoDuong.NgayBaoDuong.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            __phieuBaoDuong.NgayDuKien = DateTime.ParseExact(__phieuBaoDuong.NgayDuKien.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");


            phieuBaoDuong = JsonConvert.SerializeObject(__phieuBaoDuong);
            _phieuBaoDuong = JsonConvert.DeserializeObject<Entity.QLTS.Entity.BaoDuong>(phieuBaoDuong);


         
            var __phieuSuaChua = JsonConvert.DeserializeObject<dynamic>(listChiTiet);

            foreach (var item in __phieuSuaChua)
            {
                item.NgayBatDau = DateTime.ParseExact(item.NgayBatDau.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                item.NgayKetThuc = DateTime.ParseExact(item.NgayKetThuc.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            }

            listChiTiet = JsonConvert.SerializeObject(__phieuSuaChua);
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.SuaChua>>(listChiTiet);

            _LoginId = Protector.Int(loginId, 0);
            _baoDuongId = Protector.Int(baoDuongId, 0);

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
