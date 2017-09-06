using SongAn.QLDN.Api.QLNS.Models.PhepNam;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLNS.Controllers
{
    public class PhepNamController : BaseApiController
    {
        public PhepNamController() : base()
        {
        }
        [HttpGet]
        public IHttpActionResult Index(string id)
        {
            return Ok("ote , id = " + id);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListPhepNamByProjection([FromBody] GetListPhepNamByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListPhepNamByNhanVienId([FromBody]GetListPhepNamByNhanVienIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
