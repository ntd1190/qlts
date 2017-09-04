using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.DeNghiTrangCap;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;
using Newtonsoft.Json;

namespace SongAn.QLTS.Api.QLTS.Models.DeNghiTrangCap
{
    public class UpdateDeNghiTrangCapByDeNghiIdAction
    {
        public string deNghiId { get; set; }
        public string phieuDeNghi { get; set; }
        public string listChiTiet { get; set; }
        public string loginId { get; set; }

        #region private
        private Entity.QLTS.Entity.DeNghiTrangCap _phieuDeNghi;
        private List<Entity.QLTS.Entity.DeNghiTrangCapChiTiet> _listChiTiet;
        private int _LoginId;
        private int _deNghiId = 0;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                
                if (_deNghiId < 1)
                {
                    return returnActionError(HttpStatusCode.BadRequest, "Không tìm thấy DeNghiId");
                }

                var bizHeader = new UpdateDeNghiTrangCapByDeNghiIdBiz(context);
                var bizLine = new InsertDeNghiTrangCapChiTietBiz(context);

                bizHeader.DeNghiId = _deNghiId;
                bizHeader.CoSoId = _phieuDeNghi.CoSoId;
                bizHeader.NgayLap = _phieuDeNghi.Ngay;
                bizHeader.SoPhieu = _phieuDeNghi.SoPhieu;
                bizHeader.PhanLoaiId = _phieuDeNghi.PhanLoaiId;
                bizHeader.PhongBanId = _phieuDeNghi.PhongBanId;
                bizHeader.NoiDung = _phieuDeNghi.NoiDung;
                bizHeader.CoSoId = _phieuDeNghi.CoSoId;
                bizHeader.NhanVienId = _LoginId;

                var result = await bizHeader.Execute();

                foreach (var item in _listChiTiet)
                {
                    bizLine = new InsertDeNghiTrangCapChiTietBiz(context);
                    bizLine.DeNghiId = Protector.Int(_deNghiId);
                    bizLine.TenTaiSan = item.TenTaiSan;
                    bizLine.Mota = item.MoTa;
                    bizLine.LoaiId = item.LoaiId;
                    bizLine.SoLuong = item.SoLuong;
                    bizLine.DonViTinh = item.DonViTinh;
                    bizLine.PhuongThucId = item.PhuongThucId;
                    bizLine.NgayDeNghi = item.NgayDeNghi;
                    bizLine.DuToan = item.DuToan;
                    bizLine.DuToanDuocDuyet = item.DuToanDuocDuyet;
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
            //phieuDeNghi = Protector.String(phieuDeNghi, "{}");
            var __phieuDeNghi = JsonConvert.DeserializeObject<dynamic>(phieuDeNghi);
            __phieuDeNghi.Ngay = DateTime.ParseExact(__phieuDeNghi.Ngay.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            //Protector.DateTime(__phieuDeNghi.NgayLap, "yyyy-MM-dd", true);

            phieuDeNghi = JsonConvert.SerializeObject(__phieuDeNghi);
            _phieuDeNghi = JsonConvert.DeserializeObject<Entity.QLTS.Entity.DeNghiTrangCap>(phieuDeNghi);


            //listChiTiet = Protector.String(listChiTiet, "{}");
            var __phieuDeNghiChiTiet = JsonConvert.DeserializeObject<dynamic>(listChiTiet);

            foreach (var item in __phieuDeNghiChiTiet)
            {
                item.NgayDeNghi = DateTime.ParseExact(item.NgayDeNghi.ToString(), "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
            }

            listChiTiet = JsonConvert.SerializeObject(__phieuDeNghiChiTiet);
            _listChiTiet = JsonConvert.DeserializeObject<List<Entity.QLTS.Entity.DeNghiTrangCapChiTiet>>(listChiTiet);

            _LoginId = Protector.Int(loginId, 0);
            _deNghiId = Protector.Int(deNghiId, 0);

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
