using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.GiayBaoHong;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;
using Newtonsoft.Json;

namespace SongAn.QLTS.Api.QLTS.Models.GiayBaoHong
{
    public class UpdateGiayBaoHongByIdAction
    {
        public string giayBaoHongId { get; set; }
        public string phieuGiayBaoHong { get; set; }
        public string listChiTiet { get; set; }
        public string loginId { get; set; }

        #region private
        private Entity.QLTS.Entity.GiayBaoHong _phieuGiayBaoHong;
        private List<Entity.QLTS.Entity.GiayBaoHongChiTiet> _listChiTiet;
        private int _LoginId;
        private int _giayBaoHongId = 0;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                if (_giayBaoHongId < 1)
                {
                    return returnActionError(HttpStatusCode.BadRequest, "Không tìm thấy BaoHongId");
                }

                var bizHeader = new UpdateGiayBaoHongByIdBiz(context);
                var bizLine = new InsertGiayBaoHongChiTietBiz(context);

                bizHeader.GiayBaoHongId = _giayBaoHongId;
                bizHeader.Ngay = _phieuGiayBaoHong.Ngay;
                bizHeader.SoChungTu = _phieuGiayBaoHong.SoChungTu;
                bizHeader.PhongBanId = Protector.Int(_phieuGiayBaoHong.PhongBanId);
                bizHeader.NoiDung = _phieuGiayBaoHong.NoiDung;
                bizHeader.CoSoId = Protector.Int(_phieuGiayBaoHong.CoSoId);
                bizHeader.NhanVienId = Protector.Int(_LoginId);

                var result = await bizHeader.Execute();

                foreach (var item in _listChiTiet)
                {
                    bizLine = new InsertGiayBaoHongChiTietBiz(context);
                    bizLine.GiayBaoHongId = Protector.Int(_giayBaoHongId);
                    bizLine.TaiSanId = Protector.Int(item.TaiSanId);
                    bizLine.PhongBanId = Protector.Int(item.PhongBanId);
                    bizLine.NhanVienId = Protector.Int(item.NhanVienId);
                    bizLine.SoLuong = Protector.Int(item.SoLuong);
                    bizLine.LyDo = item.LyDo;
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
            var __phieuGiayBaoHong = JsonConvert.DeserializeObject<dynamic>(phieuGiayBaoHong);
            __phieuGiayBaoHong.Ngay = DateTime.ParseExact(__phieuGiayBaoHong.Ngay.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");

            phieuGiayBaoHong = JsonConvert.SerializeObject(__phieuGiayBaoHong);
            _phieuGiayBaoHong = JsonConvert.DeserializeObject<Entity.QLTS.Entity.GiayBaoHong>(phieuGiayBaoHong);

            var __phieuGiayBaoHongChiTiet = JsonConvert.DeserializeObject<dynamic>(listChiTiet);

            listChiTiet = JsonConvert.SerializeObject(__phieuGiayBaoHongChiTiet);
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.GiayBaoHongChiTiet>>(listChiTiet);

            _LoginId = Protector.Int(loginId, 0);
            _giayBaoHongId = Protector.Int(giayBaoHongId, 0);

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
