using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.BienBanKiemKe;
using SongAn.QLTS.Data.Repository.QLTS;
using System.Globalization;

namespace SongAn.QLTS.Api.QLTS.Models.BienBanKiemKe
{
    public class GetListBienBanKiemKeByProjectionAction
    {
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string search { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string CoSoId { get; set; }
        public string TuNgay { get; set; }
        public string DenNgay { get; set; }
        public string SoChungTu { get; set; }
        public string PhongBanId { get; set; }
        public string NhanVienId { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListBienBanKiemKeByCriteriaBiz biz = new GetListBienBanKiemKeByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                var _draw = Protector.Int(draw);
                var _start = Protector.Int(start);
                var _length = Protector.Int(length);

                /* =========================
                 * fixed input
                 * ========================= */
                sortName = string.IsNullOrEmpty(sortName) ? "KiemKeId" : sortName;
                sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
                _length = _length < 1 ? 10 : _length;
                var orderClause = sortName + " " + sortDir;
                var total = 0;
                biz.Search = search;
                biz.OrderClause = orderClause;
                biz.Skip = _start;
                biz.Take = _length;
                biz.CoSoId = Protector.Int(CoSoId);
                biz.TuNgay = DateTime.ParseExact(TuNgay, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                biz.DenNgay = DateTime.ParseExact(DenNgay, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                biz.LoginId = Protector.Int(NhanVienId);
                biz.SoChungTu = Protector.String(SoChungTu);
                biz.PhongBanId = Protector.String(PhongBanId);

                IEnumerable<dynamic> listKiemKe = await biz.Execute();
                if (listKiemKe.Count() > 0)
                {
                    var obj = listKiemKe.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, listKiemKe, _metaData);
            }
            catch (Exception ex)
            {
                result.ReturnCode = HttpStatusCode.InternalServerError;
                result.ReturnData = new
                {
                    error = new
                    {
                        code = HttpStatusCode.InternalServerError,
                        type = HttpStatusCode.InternalServerError.ToString(),
                        message = ex.InnerException != null ? ex.InnerException.Message : ex.Message
                    }
                };
                return result;
            }

        }
    }
}
