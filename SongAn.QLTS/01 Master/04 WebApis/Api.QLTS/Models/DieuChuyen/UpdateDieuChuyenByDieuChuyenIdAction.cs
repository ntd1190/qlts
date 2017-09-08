using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.DieuChuyen;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;
using Newtonsoft.Json;

namespace SongAn.QLTS.Api.QLTS.Models.DieuChuyen
{
    public class UpdateDieuChuyenByDieuChuyenIdAction
    {
        public string dieuChuyenId { get; set; }
        public string phieuDieuChuyen { get; set; }
        public string listChiTiet { get; set; }
        public string loginId { get; set; }

        #region private
        private Entity.QLTS.Entity.DieuChuyen _phieuDieuChuyen;
        private List<Entity.QLTS.Entity.DieuChuyenChiTiet> _listChiTiet;
        private int _LoginId;
        private int _dieuChuyenId = 0;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                if (_dieuChuyenId < 1)
                {
                    return returnActionError(HttpStatusCode.BadRequest, "Không tìm thấy DieuChuyenId");
                }

                var bizHeader = new UpdateDieuChuyenByDieuChuyenIdBiz(context);
                var bizLine = new InsertDieuChuyenChiTietBiz(context);

                bizHeader.DieuChuyenId = _dieuChuyenId;
                bizHeader.NgayChungTu = _phieuDieuChuyen.NgayChungTu;
                bizHeader.NgayDieuChuyen = _phieuDieuChuyen.NgayDieuChuyen;
                bizHeader.SoPhieu = _phieuDieuChuyen.SoChungTu;
                bizHeader.GhiChu = _phieuDieuChuyen.GhiChu;
                bizHeader.CoSoId = _phieuDieuChuyen.CoSoId;
                bizHeader.NhanVienId = _LoginId;

                var result = await bizHeader.Execute();

                foreach (var item in _listChiTiet)
                {
                    bizLine = new InsertDieuChuyenChiTietBiz(context);
                    bizLine.DieuChuyenId = Protector.Int(_dieuChuyenId);
                    bizLine.TaiSanId = item.TaiSanId;
                    bizLine.PhongBanChuyenDen = item.PhongBanChuyenDen;
                    bizLine.PhongBanSuDung = item.PhongBanSuDung;
                    bizLine.LyDo = item.LyDo;
                    bizLine.SoLuong = item.SoLuong;

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
            //phieuDieuChuyen = Protector.String(phieuDieuChuyen, "{}");
            var __phieuDieuChuyen = JsonConvert.DeserializeObject<dynamic>(phieuDieuChuyen);
            __phieuDieuChuyen.NgayChungTu = DateTime.ParseExact(__phieuDieuChuyen.NgayChungTu.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            __phieuDieuChuyen.NgayDieuChuyen = DateTime.ParseExact(__phieuDieuChuyen.NgayDieuChuyen.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");

            phieuDieuChuyen = JsonConvert.SerializeObject(__phieuDieuChuyen);
            _phieuDieuChuyen = JsonConvert.DeserializeObject<Entity.QLTS.Entity.DieuChuyen>(phieuDieuChuyen);


            //listChiTiet = Protector.String(listChiTiet, "{}");
            var __phieuDieuChuyenChiTiet = JsonConvert.DeserializeObject<dynamic>(listChiTiet);

            listChiTiet = JsonConvert.SerializeObject(__phieuDieuChuyenChiTiet);
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.DieuChuyenChiTiet>>(listChiTiet);

            _LoginId = Protector.Int(loginId, 0);
            _dieuChuyenId = Protector.Int(dieuChuyenId, 0);
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
