using SongAn.QLDN.Api.QLKho.Models.KhoHangSanXuat;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers
{
    public class KhoHangSanXuatController : BaseApiController
    {
        // GET: KhoLoaiHangHoa
        public KhoHangSanXuatController() : base() { }

        public async Task<IHttpActionResult> InsertKhoHangSanXuat([FromBody]InsertKhoHangSanXuatAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateKhoHangSanXuat([FromBody]UpdateKhoHangSanXuatAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteHangSanXuat([FromBody]DeleteKhoHangSanXuatAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListKhoHangSanXuat([FromBody]UpdateXoaListKhoHangSanXuatAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetKhoHangSanXuatById([FromBody]GetKhoHangSanXuatByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoHangSanXuatByCriteria([FromBody]GetListKhoHangSanXuatByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}