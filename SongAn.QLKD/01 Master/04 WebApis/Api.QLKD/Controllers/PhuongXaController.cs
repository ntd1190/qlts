using SongAn.QLKD.Api.QLKD.Models.PhuongXa;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLKD.Api.QLKD.Controllers
{
    public class PhuongXaController : BaseApiController
    {
        public PhuongXaController() : base()
        {
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxPhuongXaById([FromBody]GetListcbxPhuongXaByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
