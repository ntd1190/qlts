using SongAn.QLKD.Util.Common.Dto;
using SongAn.QLKD.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLKD.Biz.QLKD.DonHang;

namespace SongAn.QLKD.Api.QLKD.Models.DonHang
{
    public class GetListcbxDonHangByIdAction
    {
        public string Search { get; set; }
        public string UserId { get; set; }
        public string NhanVienId { get; set; }
        public string DonHangId { get; set; }
        public string SoPhieu { get; set; }
        public string FunctionCode { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListcbxDonHangByIdBiz biz = new GetListcbxDonHangByIdBiz(context);
            var result = new ActionResultDto();
            try
            {
                biz.Search = Search;
                biz.FunctionCode = FunctionCode;
                biz.NhanVienId = Protector.String(NhanVienId);
                biz.DonHangId = Protector.Int(DonHangId);
                biz.SoPhieu = Protector.String(SoPhieu);
                biz.UserId = Protector.String(UserId);

                IEnumerable<dynamic> listDonHang = await biz.Execute();
                dynamic _metaData = new System.Dynamic.ExpandoObject();
                return ActionHelper.returnActionResult(HttpStatusCode.OK, listDonHang, _metaData);
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
