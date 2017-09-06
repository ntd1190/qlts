using SongAn.QLDN.Biz.QLNS.NguoiDung;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_MAIN;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLDN.Api.QLNS.Models.NguoiDung
{
    public class GetListNguoiDungByProjectionAction
    {
        public string LoginId { get; set; }
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string search { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string fields { get; set; }


        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListNguoiDungByCriteraBiz biz = new GetListNguoiDungByCriteraBiz(context);
            var result = new ActionResultDto();
            try
            {
                var _draw = Protector.Int(draw);
                var _start = Protector.Int(start);
                var _length = Protector.Int(length);

                /* =========================
                 * fixed input
                 * ========================= */
                sortName = string.IsNullOrEmpty(sortName) ? "NguoiDungId" : sortName;
                sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
                _length = _length < 1 ? 10 : _length;
                fields = string.IsNullOrEmpty(fields) ? "*" : fields;
                if (search != null && search != "")
                    if (search.Split('|').Length > 1)
                    {
                        try
                        {
                            if (search.Split('|')[0] != "" && search.Split('|')[0] != "__/__/____") biz.TuNgay = DateTime.ParseExact(search.Split('|')[0], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                        }
                        catch
                        {
                            biz.TuNgay = "";
                        }
                        try
                        {
                            if (search.Split('|')[1] != "" && search.Split('|')[1] != "__/__/____") biz.DenNgay = DateTime.ParseExact(search.Split('|')[1], "dd/MM/yyyy", CultureInfo.GetCultureInfo("fr-FR")).ToString("yyyy-MM-dd");
                        }
                        catch
                        {
                            biz.DenNgay = "";
                        }
                        biz.VaiTroId = search.Split('|')[2];
                        biz.NhanVien = search.Split('|')[3];

                    }
                var orderClause = sortName + " " + sortDir;
                var total = 0;
                biz.LoginId = LoginId;
                biz.FieldsField = fields;
                biz.OrderClause = orderClause;
                biz.Skip = _start;
                biz.Take = _length;
                IEnumerable<dynamic> listNguoiDung = await biz.Execute();
                if (listNguoiDung.Count() > 0)
                {
                    var obj = listNguoiDung.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, listNguoiDung, _metaData);
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
