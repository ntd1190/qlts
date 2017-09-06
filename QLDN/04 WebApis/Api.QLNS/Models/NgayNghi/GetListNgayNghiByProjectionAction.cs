using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using SongAn.QLDN.Biz.QLNS.NgayNghi;
using System.Linq;

namespace  SongAn.QLDN.Api.QLNS.Models.NgayNghi
{
    public class GetListNgayNghiByProjectionAction
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
            GetListNgayNghiByCriteriaBiz biz = new GetListNgayNghiByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                var _draw = Protector.Int(draw);
                var _start = Protector.Int(start);
                var _length = Protector.Int(length);

                /* =========================
                 * fixed input
                 * ========================= */
                sortName = string.IsNullOrEmpty(sortName) ? "Ngay" : sortName;
                sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
                _length = _length < 1 ? 10 : _length;

                var whereClause = string.Format("CONVERT(VARCHAR(10),a.Ngay,103) LIKE N'%{0}%' OR MoTa LIKE N'%{0}%'", search);
                var orderClause = sortName + " " + sortDir;
                var total = 0;

                biz.FieldsField = fields;
                biz.WhereClause = whereClause;
                biz.OrderClause = orderClause;
                biz.Skip = _start;
                biz.Take = _length;

                NgayNghiRepository repo = new NgayNghiRepository(context);
                IEnumerable<dynamic> listNgayNghi = await biz.Execute();
                if (listNgayNghi.Count() > 0)
                {
                    var obj = listNgayNghi.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK,listNgayNghi, _metaData);
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
