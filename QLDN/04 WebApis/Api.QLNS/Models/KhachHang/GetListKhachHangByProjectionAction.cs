using SongAn.QLDN.Biz.QLNS.KhachHang;
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

namespace SongAn.QLDN.Api.QLNS.Models.KhachHang
{
    public class GetListKhachHangByProjectionAction
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
            GetListKhachHangByCriteriaBiz biz = new GetListKhachHangByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                var _draw = Protector.Int(draw);
                var _start = Protector.Int(start);
                var _length = Protector.Int(length);

                /* =========================
                 * fixed input
                 * ========================= */
                sortName = string.IsNullOrEmpty(sortName) ? "KhachHangId" : sortName;
                sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
                _length = _length < 1 ? 10 : _length;
                fields = string.IsNullOrEmpty(fields) ? "" : fields;
                if (search != null && search != "")
                    if (search.Split('|').Length > 1)
                    {
                        try
                        {
                            if (search.Split('|')[0] != "" && search.Split('|')[0] != "__/__/____") biz.tungay = DateTime.ParseExact(search.Split('|')[0], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                        }
                        catch
                        {
                            biz.tungay = "";
                        }
                        try
                        {
                            if (search.Split('|')[1] != "" && search.Split('|')[1] != "__/__/____") biz.denngay = DateTime.ParseExact(search.Split('|')[1], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                        }
                        catch
                        {
                            biz.tungay = "";
                        }
                        biz.KhachHang = search.Split('|')[2];
                        biz.Tinh = search.Split('|')[3];
                        if (search.Split('|')[4] != "") biz.Loai = search.Split('|')[4].Substring(0, search.Split('|')[4].Length - 1);

                    }
                if (fields != null && fields != "") biz.quicksearch = string.Format(" (A.Ma LIKE N'%{0}%' OR A.Ten LIKE N'%{0}%')", fields);
                var orderClause = sortName + " " + sortDir;
                var total = 0;
                biz.Ma_Form = "FL0003";
                biz.FieldsField = "*";
                biz.OrderClause = orderClause;
                biz.Skip = _start;
                biz.Take = _length;
                IEnumerable<dynamic> listKhachHang = await biz.Execute();
                if (listKhachHang.Count() > 0)
                {
                    var obj = listKhachHang.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, listKhachHang, _metaData);
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
