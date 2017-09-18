using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.NguonNganSach;
using SongAn.QLTS.Data.Repository.QLTS;

namespace  SongAn.QLTS.Api.QLTS.Models.NguonNganSach
{
    public class GetListNguonNganSachByProjectionAction
    {
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string search { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string CoSoId { get; set; }
        public string NhanVienId { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListNguonNganSachByCriteriaBiz biz = new GetListNguonNganSachByCriteriaBiz(context);
            var result = new ActionResultDto();
            try
            {
                var _draw = Protector.Int(draw);
                var _start = Protector.Int(start);
                var _length = Protector.Int(length);

                /* =========================
                 * fixed input
                 * ========================= */
                sortName = string.IsNullOrEmpty(sortName) ? "NguonNganSachId" : sortName;
                sortDir = string.IsNullOrEmpty(sortDir) ? "asc" : sortDir;
                _length = _length < 1 ? 10 : _length;
                var orderClause = sortName + " " + sortDir;
                var total = 0;
                biz.Search = search;
                biz.OrderClause = orderClause;
                biz.Skip = _start;
                biz.Take = _length;
                biz.CoSoId = CoSoId;
                biz.NhanVienId = NhanVienId;
                NguonNganSachRepository repo = new NguonNganSachRepository(context);
                IEnumerable<dynamic> listNguonNganSach = await biz.Execute();
                if (listNguonNganSach.Count() > 0)
                {
                    var obj = listNguonNganSach.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK,listNguonNganSach, _metaData);
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
