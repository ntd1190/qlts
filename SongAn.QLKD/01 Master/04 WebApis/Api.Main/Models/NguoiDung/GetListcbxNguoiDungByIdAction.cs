using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLKD.Biz.Main.NguoiDung;

namespace SongAn.QLKD.Api.Main.Models.NguoiDung
{
    public class GetListcbxNguoiDungByIdAction
    {
        public string Search { get; set; }
        public string UserId { get; set; }
        public string NhanVienId { get; set; }
        public string NguoiDungId { get; set; }
        public string FunctionCode { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListcbxNguoiDungByIdBiz biz = new GetListcbxNguoiDungByIdBiz(context);
            var result = new ActionResultDto();
            try
            {
                biz.Search = Search;
                biz.FunctionCode = FunctionCode;
                biz.NguoiDungId = Protector.Int(NguoiDungId);
                biz.UserId = Protector.String(UserId);
                biz.NhanVienId = Protector.String(NhanVienId);

                IEnumerable<dynamic> listNguoiDung = await biz.Execute();
                dynamic _metaData = new System.Dynamic.ExpandoObject();
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
