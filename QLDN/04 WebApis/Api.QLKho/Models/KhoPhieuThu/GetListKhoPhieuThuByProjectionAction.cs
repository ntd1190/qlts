using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using SongAn.QLDN.Biz.QLKho.KhoPhieuThu;
using System.Linq;
using System.Globalization;

namespace SongAn.QLDN.Api.QLKho.Models.KhoPhieuThu
{
    public class GetListKhoPhieuThuByProjectionAction
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
            GetListKhoPhieuThuByCriteriaBiz biz = new GetListKhoPhieuThuByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                var _draw = Protector.Int(draw);
                var _start = Protector.Int(start);
                var _length = Protector.Int(length);

                /* =========================
                 * fixed input
                 * ========================= */
                sortName = string.IsNullOrEmpty(sortName) ? "PhieuThuId" : sortName;
                sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
                _length = _length < 1 ? 10 : _length;
                fields = string.IsNullOrEmpty(fields) ? "*" : fields;
                if (search != null && search != "")
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
                    biz.DonVi = search.Split('|')[2];
                    if (search.Split('|')[3] != "") biz.HinhThuc = search.Split('|')[3].Substring(0, search.Split('|')[3].Length - 1);
                    biz.NguoiNop = search.Split('|')[4];
                }
                var orderClause = sortName + " " + sortDir;
                var total = 0;
                biz.SearchString = searchstring;
                biz.LoginId = LoginId;
                biz.FieldsField = fields;
                biz.OrderClause = orderClause;
                biz.Skip = _start;
                biz.Take = _length;
                IEnumerable<dynamic> listPhieuThu = await biz.Execute();
                if (listPhieuThu.Count() > 0)
                {
                    var obj = listPhieuThu.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, listPhieuThu, _metaData);
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
    
