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
    public class InsertDieuChuyenAction
    {
        public string phieuDieuChuyen { get; set; }
        public string listChiTiet { get; set; }
        public string loginId { get; set; }

        #region private
        private Entity.QLTS.Entity.DieuChuyen _phieuDieuChuyen;
        private List<Entity.QLTS.Entity.DieuChuyenChiTiet> _listChiTiet;
        private int _LoginId;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                int DieuChuyenId = 0;
                var bizHeader = new InsertDieuChuyenBiz(context);
                var bizLine = new InsertDieuChuyenChiTietBiz(context);

                bizHeader.NgayChungTu = _phieuDieuChuyen.NgayChungTu;
                bizHeader.NgayDieuChuyen = _phieuDieuChuyen.NgayDieuChuyen;
                bizHeader.SoPhieu = _phieuDieuChuyen.SoChungTu;
                bizHeader.GhiChu = _phieuDieuChuyen.GhiChu;
                bizHeader.CoSoId = _phieuDieuChuyen.CoSoId;
                bizHeader.NhanVienId = _LoginId;

                IEnumerable<dynamic> DieuChuyenIdINum = await bizHeader.Execute();
                if (DieuChuyenIdINum.Count() > 0)
                {
                    var obj = DieuChuyenIdINum.FirstOrDefault();

                    DieuChuyenId = Protector.Int(obj.DieuChuyenIdI);
                }

                foreach (var item in _listChiTiet)
                {
                    bizLine = new InsertDieuChuyenChiTietBiz(context);
                    bizLine.DieuChuyenId = Protector.Int(DieuChuyenId);
                    bizLine.TaiSanId = item.TaiSanId;
                    bizLine.PhongBanChuyenDen = item.PhongBanChuyenDen;
                    bizLine.NhanVienTiepNhan = item.NhanVienTiepNhan;
                    bizLine.PhongBanSuDung = item.PhongBanSuDung;
                    bizLine.NhanVienSuDung = item.NhanVienSuDung;
                    bizLine.LyDo = item.LyDo;
                    bizLine.SoLuong = item.SoLuong;

                    var result_line = await bizLine.Execute();
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, DieuChuyenIdINum, _metaData);
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
