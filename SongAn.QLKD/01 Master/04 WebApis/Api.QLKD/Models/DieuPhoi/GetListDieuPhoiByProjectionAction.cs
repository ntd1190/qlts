using SongAn.QLKD.Biz.QLKD.DieuPhoi;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.DieuPhoi
{
    public class GetListDieuPhoiByProjectionAction
    {
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string search { get; set; }
        public string nhanVienDieuPhoiId { get; set; }
        public string tuNgay { get; set; }
        public string denNgay { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string UserId { get; set; }
        public string NhanVienId { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListDieuPhoiByCriteriaBiz biz = new GetListDieuPhoiByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                var _draw = Protector.Int(draw);
                var _start = Protector.Int(start);
                var _length = Protector.Int(length);

                /* =========================
                 * fixed input
                 * ========================= */
                sortName = string.IsNullOrEmpty(sortName) ? "DieuPhoiId" : sortName;
                sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
                _length = _length < 1 ? 10 : _length;
                var orderClause = sortName + " " + sortDir;
                var total = 0;
                biz.Search = search;
                biz.NhanVienDieuPhoiId = nhanVienDieuPhoiId;
                biz.TuNgay = DateTime.ParseExact(tuNgay, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                biz.DenNgay = DateTime.ParseExact(denNgay, "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR"));
                biz.OrderClause = orderClause;
                biz.Skip = _start;
                biz.Take = _length;
                biz.UserId = UserId;
                biz.NhanVienId = NhanVienId;

                IEnumerable<dynamic> listDieuPhoi = await biz.Execute();
                if (listDieuPhoi.Count() > 0)
                {
                    var obj = listDieuPhoi.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, listDieuPhoi, _metaData);
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
