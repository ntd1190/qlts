using SongAn.QLDN.Api.QLNS.Models.PheDuyet;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;


namespace SongAn.QLDN.Api.QLNS.Controllers
{
   public class PheDuyetController : BaseApiController
    {
        public PheDuyetController() : base()
        {
        }
        [HttpGet]
        public IHttpActionResult Index(string id)
        {
            return Ok("test test ok, id = " + id);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListPheDuyetByProjection([FromBody] GetListPheDuyetByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdatePheDuyetByProjection([FromBody] UpdatePheDuyetByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
