using SongAn.QLKD.Entity.QLKD.Entity;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using SongAn.QLKD.Data.Repository.MSSQL_QLKD;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using SongAn.QLKD.Biz.QLKD.PhongBan;
using System.Linq;

namespace  SongAn.QLKD.Api.QLKD.Models.Phongban
{
    public class GetListPhongBanByProjectionAction
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
            GetListPhongBanByCriteriaBiz biz = new GetListPhongBanByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                var _draw = Protector.Int(draw);
                var _start = Protector.Int(start);
                var _length = Protector.Int(length);

                /* =========================
                 * fixed input
                 * ========================= */
                sortName = string.IsNullOrEmpty(sortName) ? "PhongBanId" : sortName;
                sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
                _length = _length < 1 ? 10 : _length;
                fields = string.IsNullOrEmpty(fields) ? "PhongBanId,TenPhongBan,MaPhongBan,GhiChu,NgayTao,NguoiTao,CtrVersion" : fields;

                var whereClause = string.Format("MaPhongBan LIKE N'%{0}%' OR TenPhongBan LIKE N'%{0}%'", search);
                var orderClause = sortName + " " + sortDir;
                var total = 0;

                biz.FieldsField = fields;
                biz.WhereClause = whereClause;
                biz.OrderClause = orderClause;
                biz.Skip = _start;
                biz.Take = _length;

                PhongBanRepository repo = new PhongBanRepository(context);
                IEnumerable<dynamic> listPhongBan = await biz.Execute();
                if (listPhongBan.Count() > 0)
                {
                    var obj = listPhongBan.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK,listPhongBan, _metaData);
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
