using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using SongAn.QLDN.Biz.QLKho.KhoHangHoa;
using System.Linq;

namespace SongAn.QLDN.Api.QLKho.Models.KhoHangHoa
{
    public class GetListKhoHangHoaBySearchStringAction
    {
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string search { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string fields { get; set; }
        public string loai { get; set; }
        public string khoId { get; set; }
        public string leftjoinHH { get; set; }


        public async Task<ActionResultDto> Execute(ContextDto context)
        {
           
            var result = new ActionResultDto();
            try
            {

                var _draw = Protector.Int(draw);
                var _start = Protector.Int(start);
                var _length = Protector.Int(length);

                /* =========================
                 * fixed input
                 * ========================= */
                sortName = string.IsNullOrEmpty(sortName) ? "HangHoaId" : sortName;
                sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
                _length = _length < 1 ? 10 : _length;
                fields = string.IsNullOrEmpty(fields) ? "*" : fields;
                var orderClause = sortName + " " + sortDir;
                var total = 0;
                IEnumerable<dynamic> listHangHoa;
                if (loai == "1")
                {
                    GetListKhoHangHoaPopDMByCriteriaBiz biz = new GetListKhoHangHoaPopDMByCriteriaBiz(context);
                    biz.SearchString = search;
                    biz.FieldsField = fields;
                    biz.OrderClause = orderClause;
                    biz.Skip = _start;
                    biz.Take = _length;
                    biz.KhoId = Protector.String(khoId);
                    biz.LeftJoinHH = Protector.String(leftjoinHH);
                    listHangHoa = await biz.Execute();
                }
                else
                {
                    GetListKhoHangHoaPopByCriteriaBiz biz = new GetListKhoHangHoaPopByCriteriaBiz(context);
                    biz.SearchString = search;
                    biz.FieldsField = fields;
                    biz.OrderClause = orderClause;
                    biz.Skip = _start;
                    biz.Take = _length;
                    listHangHoa = await biz.Execute();
                }
                if (listHangHoa.Count() > 0)
                {
                    var obj = listHangHoa.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, listHangHoa, _metaData);
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
    
