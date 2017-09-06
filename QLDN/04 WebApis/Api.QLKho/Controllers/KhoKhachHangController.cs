using SongAn.QLDN.Api.QLKho.Models.KhoKhachHang;
using SongAn.QLDN.Api.QLNS.Models.KhoKhachHang;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLNS.Controllers
{
    public class KhoKhachHangController : BaseApiController
    {
        public KhoKhachHangController() : base()
        {
        }
        [HttpGet]
        public IHttpActionResult Index(string id)
        {
            return Ok("test test ok, id = " + id);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoKhachHangByProjection([FromBody] GetListKhoKhachHangByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetKhoKhachHangById([FromBody]GetKhoKhachHangByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertKhoKhachHang([FromBody]InsertKhoKhachHangAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateKhoKhachHang([FromBody]UpdateKhoKhachHangAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListKhoKhachHang([FromBody]DeleteListKhoKhachHangAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListKhoKhachHang([FromBody]UpdateXoaListKhoKhachHangAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
