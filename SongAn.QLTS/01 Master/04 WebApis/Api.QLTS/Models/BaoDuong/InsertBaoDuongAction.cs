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
    public class InsertBaoDuongAction
    {
        public string phieuBaoDuong { get; set; }
        public string listChiTiet { get; set; }
        public string loginId { get; set; }

        #region private
        private Entity.QLTS.Entity.BaoDuong _phieuBaoDuong;
        private List<Entity.QLTS.Entity.SuaChua> _listChiTiet;
        private int _LoginId;
        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();
                int baoDuongId = 0;

                
                var bizHeader = new InsertBaoDuongBiz(context);
                var bizLine = new InsertSuaChuaBiz(context);

                bizHeader.TaiSanId = _phieuBaoDuong.TaiSanId;
                bizHeader.PhongBanId = _phieuBaoDuong.PhongBanId;
                bizHeader.CanBoId = _phieuBaoDuong.NhanVienId;
                bizHeader.NgayBaoDuong = _phieuBaoDuong.NgayBaoDuong;
                bizHeader.NgayDuKien = _phieuBaoDuong.NgayDuKien;
                bizHeader.DuToan = Protector.Decimal(_phieuBaoDuong.DuToan);
                bizHeader.LoaiBaoDuongId = _phieuBaoDuong.LoaiBaoDuongId;
                bizHeader.MoTa = Protector.String(_phieuBaoDuong.MoTa);
                bizHeader.CoSoId = _phieuBaoDuong.CoSoId;
                bizHeader.NhanVienId = _LoginId;

                IEnumerable<dynamic> BaoDuongId = await bizHeader.Execute();
                if (BaoDuongId.Count() > 0)
                {
                    var obj = BaoDuongId.FirstOrDefault();

                    baoDuongId = Protector.Int(obj.BaoDuongIdI);
                }

                foreach (var item in _listChiTiet)
                {
                    bizLine = new InsertSuaChuaBiz(context);
                    bizLine.BaoDuongId = Protector.Int(baoDuongId);
                    bizLine.TenBoPhan = item.TenBoPhan;
                    bizLine.NgayBatDau = item.NgayBatDau;
                    bizLine.NgayKetThuc = item.NgayKetThuc;
                    bizLine.ChiPhi = Protector.Decimal(item.ChiPhi);
                    bizLine.NoiDung = Protector.String(item.NoiDung);
                    bizLine.NoiSua = Protector.String(item.NoiSua);
                    bizLine.KetQua = Protector.String(item.KetQua);

                    var result_line = await bizLine.Execute();
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();

                return ActionHelper.returnActionResult(HttpStatusCode.OK, BaoDuongId, _metaData);
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
