using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.GhiTang;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;
using Newtonsoft.Json;

namespace SongAn.QLTS.Api.QLTS.Models.GhiTang
{
    public class UpdateGhiTangByGhiTangIdAction
    {
        public string ghiTangId { get; set; }
        public string phieuGhiTang { get; set; }
        public string listChiTiet { get; set; }
        public string loginId { get; set; }

        #region private
        private Entity.QLTS.Entity.GhiTang _phieuGhiTang;
        private List<Entity.QLTS.Entity.GhiTangChiTiet> _listChiTiet;
        private int _LoginId;
        private int _ghiTangId = 0;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                if (_ghiTangId < 1)
                {
                    return returnActionError(HttpStatusCode.BadRequest, "Không tìm thấy GhiTangId");
                }

                var bizHeader = new UpdateGhiTangByGhiTangIdBiz(context);
                var bizLine = new InsertGhiTangChiTietBiz(context);

                bizHeader.GhiTangId = _ghiTangId;
                bizHeader.NgayChungTu = _phieuGhiTang.NgayChungTu;
                bizHeader.NgayGhiTang = _phieuGhiTang.NgayGhiTang;
                bizHeader.SoChungTu = _phieuGhiTang.SoChungTu;
                bizHeader.NoiDung = _phieuGhiTang.NoiDung;
                bizHeader.CoSoId = _phieuGhiTang.CoSoId;
                bizHeader.NhanVienId = _LoginId;

                var result = await bizHeader.Execute();

                foreach (var item in _listChiTiet)
                {
                    bizLine = new InsertGhiTangChiTietBiz(context);
                    bizLine.GhiTangId = Protector.Int(_ghiTangId);
                    bizLine.TaiSanId = item.TaiSanId;
                    bizLine.NgayBatDauSuDung = item.NgayBatDauSuDung;
                    bizLine.PhongBanId = item.PhongBanId;
                    bizLine.NhanVienId = item.NhanVienId;
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
            //phieuGhiTang = Protector.String(phieuGhiTang, "{}");
            var __phieuGhiTang = JsonConvert.DeserializeObject<dynamic>(phieuGhiTang);
            __phieuGhiTang.NgayChungTu = DateTime.ParseExact(__phieuGhiTang.NgayChungTu.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            __phieuGhiTang.NgayGhiTang = DateTime.ParseExact(__phieuGhiTang.NgayGhiTang.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");

            phieuGhiTang = JsonConvert.SerializeObject(__phieuGhiTang);
            _phieuGhiTang = JsonConvert.DeserializeObject<Entity.QLTS.Entity.GhiTang>(phieuGhiTang);


            //listChiTiet = Protector.String(listChiTiet, "{}");
            var __phieuGhiTangChiTiet = JsonConvert.DeserializeObject<dynamic>(listChiTiet);

            foreach (var item in __phieuGhiTangChiTiet)
            {
                item.NgayBatDauSuDung = DateTime.ParseExact(item.NgayBatDauSuDung.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            }

            listChiTiet = JsonConvert.SerializeObject(__phieuGhiTangChiTiet);
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.GhiTangChiTiet>>(listChiTiet);

            _LoginId = Protector.Int(loginId, 0);
            _ghiTangId = Protector.Int(ghiTangId, 0);
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
