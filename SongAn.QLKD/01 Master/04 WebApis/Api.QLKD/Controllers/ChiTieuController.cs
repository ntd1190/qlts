using SongAn.QLKD.Api.QLKD.Models.ChiTieu;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLKD.Api.QLKD.Controllers
{
    public class ChiTieuController : BaseApiController
    {
        public ChiTieuController() : base()
        {
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetChiTieuById([FromBody]GetListChiTieuByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListChiTieuChiTietByChiTieuId([FromBody]GetListChiTieuChiTietByChiTieuIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }


        [HttpPost]
        public async Task<IHttpActionResult> GetListChiTieuByProjection([FromBody]GetListChiTieuByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertChiTieu([FromBody]InsertChiTieuAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateChiTieuById([FromBody]UpdateChiTieuByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteChiTieuById([FromBody]DeleteChiTieuByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
