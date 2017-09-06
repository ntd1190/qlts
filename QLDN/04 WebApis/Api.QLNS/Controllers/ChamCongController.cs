using SongAn.QLDN.Api.QLNS.Models.ChamCong;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;


namespace SongAn.QLDN.Api.QLNS.Controllers
{
   public class ChamCongController : BaseApiController
    {
        public ChamCongController() : base()
        {
        }
        [HttpGet]
        public IHttpActionResult Index(string id)
        {
            return Ok("test test ok, id = " + id);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListChamCongByProjection([FromBody] GetListChamCongByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
