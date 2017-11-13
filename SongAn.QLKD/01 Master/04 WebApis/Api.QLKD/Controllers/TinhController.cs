using SongAn.QLKD.Api.QLKD.Models.Tinh;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLKD.Api.QLKD.Controllers
{
    public class TinhController : BaseApiController
    {
        public TinhController() : base()
        {
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxTinhById([FromBody]GetListcbxTinhByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
