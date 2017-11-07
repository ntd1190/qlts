using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.TheoDoi;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;
using Newtonsoft.Json;

namespace SongAn.QLTS.Api.QLTS.Models.TheoDoi
{
    public class InsertTheoDoiAction
    {
        public string TaiSanId { get; set; }
        public string NgayGhiTang { get; set; }
        public string NgayTrangCap { get; set; }
        public string NgayBatDauSuDung { get; set; }
        public string PhongBanId { get; set; }
        public string NhanVienId { get; set; }
        public decimal SLTon { get; set; }
        public decimal SLTang { get; set; }
        public decimal SLGiam { get; set; }
        public string HopDongId { get; set; }
        public string CoSoId { get; set; }
        public string NguoiTao { get; set; }

        #region private

        #endregion

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            try
            {
                init();
                validate();

                var biz = new InsertTheoDoiBiz(context);
                biz.TaiSanId = Protector.Int(TaiSanId);
                biz.NgayTrangCap = DateTime.ParseExact(NgayTrangCap, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                biz.NgayGhiTang = DateTime.ParseExact(NgayGhiTang, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                biz.NgayBatDauSuDung = DateTime.ParseExact(NgayBatDauSuDung, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                biz.PhongBanId = Protector.Int(PhongBanId);
                biz.NhanVienId = Protector.Int(NhanVienId);
                biz.SLTon = Protector.Decimal(SLTon);
                biz.SLTang = 0;
                biz.SLGiam = 0;
                biz.HopDongId = Protector.Int(HopDongId);
                biz.CoSoId = Protector.String(CoSoId);
                biz.NguoiTao = Protector.String(NguoiTao);
                var result = await biz.Execute();

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
