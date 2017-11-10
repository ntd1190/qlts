using SongAn.QLKD.Biz.QLKD.NhanVien;
using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SongAn.QLKD.Api.QLKD.Models.NhanVien
{
    public class GetListNhanVienByProjectionAction
    {
        public string draw { get; set; }
        public string start { get; set; }
        public string length { get; set; }
        public string search { get; set; }
        public string sortName { get; set; }
        public string sortDir { get; set; }
        public string NhanVienId { get; set; }
        public string UserId { get; set; }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListNhanVienByCriteraBiz biz = new GetListNhanVienByCriteraBiz(context);
            var result = new ActionResultDto();
            try
            {
                var _draw = Protector.Int(draw);
                var _start = Protector.Int(start);
                var _length = Protector.Int(length);
                _length = _length < 1 ? 10 : _length;
                var total = 0;
                biz.UserId = UserId;
                biz.NhanVienId = NhanVienId;
                biz.Skip = _start;
                biz.Take = _length;
                IEnumerable<dynamic> listNhanVien = await biz.Execute();
                if (listNhanVien.Count() > 0)
                {
                    var obj = listNhanVien.FirstOrDefault();

                    total = Protector.Int(obj.MAXCNT);
                }

                dynamic _metaData = new System.Dynamic.ExpandoObject();
                _metaData.draw = _draw;
                _metaData.total = total;

                return ActionHelper.returnActionResult(HttpStatusCode.OK, listNhanVien, _metaData);
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
