using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Util.Common.Helper;
using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using SongAn.QLDN.Biz.QLKho.KhoNuocSanXuat;
using System.Linq;

namespace  SongAn.QLDN.Api.QLKho.Models.KhoNuocSanXuat
{
    public class GetListKhoNuocSanXuatByProjectionAction
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
            GetListKhoNuocSanXuatByCriteriaBiz biz = new GetListKhoNuocSanXuatByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                var _draw = Protector.Int(draw);
                var _start = Protector.Int(start);
                var _length = Protector.Int(length);

                /* =========================
                 * fixed input
                 * ========================= */
                sortName = string.IsNullOrEmpty(sortName) ? "KhoNuocSanXuatId" : sortName;
                sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
                _length = _length < 1 ? 10 : _length;
                fields = string.IsNullOrEmpty(fields) ? "KhoNuocSanXuatId,TenKhoNuocSanXuat,MaKhoNuocSanXuat,GhiChu,NgayTao,NguoiTao,CtrVersion" : fields;

                var whereClause = string.Format("MaNuoc LIKE N'%{0}%' OR TenNuoc LIKE N'%{0}%'", search);
                var orderClause = sortName + " " + sortDir;
                var total = 0;

                biz.FieldsField = fields;
                biz.WhereClause = whereClause;
                biz.OrderClause = orderClause;
                biz.Skip = _start;
                biz.Take = _length;

                KhoNuocSanXuatRepository repo = new KhoNuocSanXuatRepository(context);
                IEnumerable<dynamic> listKhoNuocSanXuat = await biz.Execute();
                if (listKhoNuocSanXuat.Count() > 0)
                {
                    var obj = listKhoNuocSanXuat.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK,listKhoNuocSanXuat, _metaData);
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
