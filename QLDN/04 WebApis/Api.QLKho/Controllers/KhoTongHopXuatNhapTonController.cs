using SongAn.QLDN.Api.QLKho.Models.KhoTongHopXuatNhapTon;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLNS.Controllers
{
    public class KhoTongHopXuatNhapTonController : BaseApiController
    {
        public KhoTongHopXuatNhapTonController() : base() { }

        [HttpGet]
        public IHttpActionResult Index(string id)
        {
            return Ok("test test ok, id = " + id);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListTheKhoXuatNhapTonByCriteria([FromBody] GetListTheKhoXuatNhapTonByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }

}
