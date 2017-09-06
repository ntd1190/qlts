using SongAn.QLDN.Api.QLKho.Models.KhoImportExcelDauKy;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers
{
    public class KhoImportExcelDauKyController : BaseApiController
    {
        public KhoImportExcelDauKyController() : base()
        {
        }

        [HttpGet]
        public IHttpActionResult Index(string id)
        {
            return Ok("ote, id = " + id);
        }
        [HttpPost]
        public async Task<IHttpActionResult> ImportExcelDauKy([FromBody] ImportExcelDauKyAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
