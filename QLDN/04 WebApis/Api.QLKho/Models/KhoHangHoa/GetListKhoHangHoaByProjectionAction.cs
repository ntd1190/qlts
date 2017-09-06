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
    public class GetListKhoHangHoaByProjectionAction
    {
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string searchstring { get; set; }
        public string search { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string fields { get; set; }
        public string LoginId { get; set; }


        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListKhoHangHoaByCriteriaBiz biz = new GetListKhoHangHoaByCriteriaBiz(context);
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
                if (search != null && search != "")
                {
                    biz.TuKhoa = search.Split('|')[0];
                    biz.HangHoa = search.Split('|')[1];
                    biz.Nhom = search.Split('|')[2];
                    biz.Loai = search.Split('|')[3];
                    biz.HangSanXuat = search.Split('|')[4];
                    biz.NuocSanXuat = search.Split('|')[5];
                    biz.NhaCungCap = search.Split('|')[6];
                }
                var orderClause = sortName + " " + sortDir;
                var total = 0;
                biz.SearchString = searchstring;
                biz.LoginId = LoginId;
                biz.FieldsField = fields;
                biz.OrderClause = orderClause;
                biz.Skip = _start;
                biz.Take = _length;
                IEnumerable<dynamic> listHangHoa = await biz.Execute();
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
    
