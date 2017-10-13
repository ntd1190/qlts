using SongAn.QLTS.Api.QLTS.Models.ThongBao;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.Main.Controllers
{
    public class ThongBaoController : BaseApiController
    {
        [HttpPost]
        public async Task<IHttpActionResult> GetListThongBao([FromBody] GetListThongBaoByCoSoIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateThongBaoById([FromBody] UpdateThongBaoByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
