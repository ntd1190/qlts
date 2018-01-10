using SongAn.QLKD.Biz.QLKD.HangHoa;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;



namespace SongAn.QLKD.Api.QLKD.Models.HangHoa
{
    public class GetListHangHoaByProjectionAction
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
            GetListHangHoaByCriteriaBiz biz = new GetListHangHoaByCriteriaBiz(context);
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
                    biz.HangHoa = "";
                    biz.Nhom = search.Split('|')[2];
                    biz.Loai = search.Split('|')[3];
                    biz.HangSanXuat = "";
                    biz.NuocSanXuat = "";
                    biz.NhaCungCap = "";
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

