using SongAn.QLDN.Biz.QLNS.Issue;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.Issue
{
    public class GetListIssueByProjectionAction
    {
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string search { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string fields { get; set; }


        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListIssueByCriteraBiz biz = new GetListIssueByCriteraBiz(context);
            var result = new ActionResultDto();
            try
            {
                var _draw = Protector.Int(draw);
                var _start = Protector.Int(start);
                var _length = Protector.Int(length);

                /* =========================
                 * fixed input
                 * ========================= */
                sortName = string.IsNullOrEmpty(sortName) ? "IssueId" : sortName;
                sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
                _length = _length < 1 ? 10 : _length;
                fields = string.IsNullOrEmpty(fields) ? "*" : fields;
                if (search != null && search != "")
                {
                    try
                    {
                        if (search.Split('|')[0] != "" && search.Split('|')[0] != "__/__/____") biz.TuNgayTao = DateTime.ParseExact(search.Split('|')[0], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                    }
                    catch
                    {
                        biz.TuNgayTao = "";
                    }
                    try
                    {
                        if (search.Split('|')[1] != "" && search.Split('|')[1] != "__/__/____") biz.DenNgayTao = DateTime.ParseExact(search.Split('|')[1], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                    }
                    catch
                    {
                        biz.DenNgayTao = "";
                    }
                    biz.KhachHang = search.Split('|')[2];
                    if (search.Split('|')[3] != "") biz.LoaiIssue = search.Split('|')[3].Substring(0, search.Split('|')[3].Length - 1);
                    try
                    {
                        if (search.Split('|')[4] != "" && search.Split('|')[4] != "__/__/____") biz.TuNgayKetThuc = DateTime.ParseExact(search.Split('|')[4], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                    }
                    catch
                    {
                        biz.TuNgayKetThuc = "";
                    }
                    try
                    {
                        if (search.Split('|')[5] != "" && search.Split('|')[4] != "__/__/____") biz.DenNgayKetThuc = DateTime.ParseExact(search.Split('|')[5], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                    }
                    catch
                    {
                        biz.DenNgayKetThuc = "";
                    }
                    biz.NguoiXuLy = search.Split('|')[6];
                    biz.NguoiTao = search.Split('|')[7];
                    if (search.Split('|')[8] != "") biz.TrangThai = search.Split('|')[8].Substring(0, search.Split('|')[8].Length - 1);
                    biz.PhongBan = search.Split('|')[9];
                }
                var orderClause = sortName + " " + sortDir;
                var total = 0;
                biz.FieldsField = fields;
                biz.OrderClause = orderClause;
                biz.Skip = _start;
                biz.Take = _length;
                IEnumerable<dynamic> listIssue = await biz.Execute();
                if (listIssue.Count() > 0)
                {
                    var obj = listIssue.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, listIssue, _metaData);
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
