using SongAn.QLKD.Api.QLKD.Models.NhomKhachHang;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLKD.Api.QLKD.Controllers
{
    public class NhomKhachHangController : BaseApiController
    {
        public NhomKhachHangController() : base()
        {
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxNhomKhachHangById([FromBody]GetListcbxNhomKhachHangByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
