using SongAn.QLDN.Api.QLKho.Models.KhoImportDauKy;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers
{
    public class KhoImportDauKyController : BaseApiController
    {
        public KhoImportDauKyController() : base()
        {
        }

        [HttpGet]
        public IHttpActionResult Index(string id)
        {
            return Ok("ote, id = " + id);
        }
        [HttpPost]
        public async Task<IHttpActionResult> ImportDauKy([FromBody] ImportDauKyAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
