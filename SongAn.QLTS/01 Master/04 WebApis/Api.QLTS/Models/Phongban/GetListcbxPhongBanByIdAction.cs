using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.PhongBan;
using SongAn.QLTS.Data.Repository.QLTS;

namespace SongAn.QLTS.Api.QLTS.Models.Phongban
{
    public class GetListcbxPhongBanByIdAction
    {
        public string Search { get; set; }
        public string CoSoId { get; set; }
        public string NhanVienId { get; set; }
        public string PhongBanId { get; set; }
        public string FunctionCode { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListcbxPhongBanByIdBiz biz = new GetListcbxPhongBanByIdBiz(context);
            var result = new ActionResultDto();
            try
            {
                biz.Search = Search;
                biz.CoSoId = CoSoId;
                biz.NhanVienId = NhanVienId;
                biz.PhongBanId = Protector.Int(PhongBanId);
                biz.FunctionCode = Protector.String(FunctionCode);
                
                IEnumerable<dynamic> listPhongBan = await biz.Execute();
                dynamic _metaData = new System.Dynamic.ExpandoObject();
                return ActionHelper.returnActionResult(HttpStatusCode.OK, listPhongBan, _metaData);
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
