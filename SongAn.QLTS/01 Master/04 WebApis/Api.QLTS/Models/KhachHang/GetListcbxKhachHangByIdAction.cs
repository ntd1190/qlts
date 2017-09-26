using SongAn.QLTS.Util.Common.Dto;
using SongAn.QLTS.Util.Common.Helper;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using System.Linq;
using SongAn.QLTS.Biz.QLTS.KhachHang;
using SongAn.QLTS.Data.Repository.QLTS;

namespace SongAn.QLTS.Api.QLTS.Models.KhachHang
{
    public class GetListcbxKhachHangByIdAction
    {
        public string Search { get; set; }
        public string CoSoId { get; set; }
        public string NhanVienId { get; set; }
        public string KhachHangId { get; set; }
        public async Task<ActionResultDto> Execute(ContextDto context)
        {
            GetListcbxKhachHangByIdBiz biz = new GetListcbxKhachHangByIdBiz(context);
            var result = new ActionResultDto();
            try
            {
                biz.Search = Search;
                biz.CoSoId = CoSoId;
                biz.NhanVienId = NhanVienId;
                biz.KhachHangId = Protector.Int(KhachHangId);

                IEnumerable<dynamic> listKhachHang = await biz.Execute();
                dynamic _metaData = new System.Dynamic.ExpandoObject();
                return ActionHelper.returnActionResult(HttpStatusCode.OK, listKhachHang, _metaData);
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
