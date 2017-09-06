using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using SongAn.QLDN.Biz.QLNS.TinhHuyenTram;
using System.Linq;

namespace SongAn.QLDN.Api.QLNS.Models.TinhHuyenTram
{
    public class GetListPhuongXaByProjectionAction
    {
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string search { get; set; }
        public string maHuyen { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string fields { get; set; }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListPhuongXaByCriteriaBiz biz = new GetListPhuongXaByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                var _draw = Protector.Int(draw);
                var _start = Protector.Int(start);
                var _length = Protector.Int(length);

                /* =========================
                 * fixed input
                 * ========================= */
                sortName = string.IsNullOrEmpty(sortName) ? "PhuongXaId" : sortName;
                sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
                _length = _length < 1 ? 10 : _length;
                fields = string.IsNullOrEmpty(fields) ? "PhuongXaId,MaPhuongXa,TenPhuongXa" : fields;

                var whereClause = string.Format("(MaPhuongXa LIKE N'%{0}%' OR TenPhuongXa LIKE N'%{0}%')", search);
                if(maHuyen != null && maHuyen != "") whereClause = whereClause + string.Format("AND MaQuanHuyen='{0}'", maHuyen);
                var orderClause = sortName + " " + sortDir;
                var total = 0;

                biz.FieldsField = fields;
                biz.WhereClause = whereClause;
                biz.OrderClause = orderClause;
                biz.Skip = _start;
                biz.Take = _length;

                TinhHuyenTramRepository repo = new TinhHuyenTramRepository(context);
                IEnumerable<dynamic> listPhuongXa = await biz.Execute();
                if (listPhuongXa.Count() > 0)
                {
                    var obj = listPhuongXa.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, listPhuongXa, _metaData);
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
