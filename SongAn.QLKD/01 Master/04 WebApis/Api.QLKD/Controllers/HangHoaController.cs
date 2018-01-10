using SongAn.QLKD.Api.QLKD.Models.HangHoa;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLKD.Api.QLKD.Controllers
{
    public class HangHoaController : BaseApiController
    {
        public HangHoaController() : base()
        {
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetHangHoaById([FromBody]GetHangHoaByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListHangHoaByProjection([FromBody]GetListHangHoaByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxHangHoaById([FromBody]GetListcbxHangHoaByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
