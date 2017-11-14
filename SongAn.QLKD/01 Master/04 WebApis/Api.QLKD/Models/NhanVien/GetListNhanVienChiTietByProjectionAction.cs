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
    public class GetListNhanVienChiTietByProjectionAction
    {

        public string NhanVienId { get; set; }

        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListNhanVienChiTietByCriteraBiz biz = new GetListNhanVienChiTietByCriteraBiz(context);
            var result = new ActionResultDto();
            try
            {
                biz.NhanVienId = NhanVienId;
                IEnumerable<dynamic> listNhanVien = await biz.Execute();
                dynamic _metaData = new System.Dynamic.ExpandoObject();
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
