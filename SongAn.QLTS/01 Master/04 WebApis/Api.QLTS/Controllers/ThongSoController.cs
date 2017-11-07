using SongAn.QLTS.Api.QLTS.Models.ThongSo;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class ThongSoController : BaseApiController
    {
        // GET: ThongSo
        public ThongSoController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListThongSoByProjection([FromBody]GetListThongSoByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoaSoLieuByProjection([FromBody]GetListKhoaSoLieuByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoaSoLieuThangByProjection([FromBody]GetListKhoaSoLieuThangByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateThongSo([FromBody]UpdateThongSoAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}