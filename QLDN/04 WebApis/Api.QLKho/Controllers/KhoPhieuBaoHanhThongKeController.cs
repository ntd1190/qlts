using SongAn.QLDN.Api.QLNS.Models.KhoPhieuBaoHanhThongKe;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers
{
    public class KhoPhieuBaoHanhThongKeController : BaseApiController
    {        public KhoPhieuBaoHanhThongKeController() : base()
        {
        }
        [HttpGet]
        public IHttpActionResult Index(string id)
        {
            return Ok("ote , id = " + id);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoPhieuBaoHanhThongKeByProjection ([FromBody] GetListKhoPhieuBaoHanhThongKeByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

      
    }
}
