using SongAn.QLTS.Api.QLTS.Models.Home;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class HomeController : BaseApiController
    {
        public HomeController() : base() { }

        [HttpPost]
        public async Task<IHttpActionResult> ThongKeTaiSan([FromBody]ThongKeTaiSanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListThongBao([FromBody]GetListThongBaoAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
