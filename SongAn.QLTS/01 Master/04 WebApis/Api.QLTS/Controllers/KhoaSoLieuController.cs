using SongAn.QLTS.Api.QLTS.Models.KhoaSoLieu;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class KhoaSoLieuController : BaseApiController
    {
        // GET: KhoaSoLieu
        public KhoaSoLieuController(): 
            base()
        {

        }
        [HttpPost]
        public async Task<IHttpActionResult> CheckKhoaSoLieu([FromBody]CheckKhoaSoLieuAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}