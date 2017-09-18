using SongAn.QLTS.Api.QLTS.Models.GhiGiam;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class GhiGiamController : BaseApiController
    {
        // GET: GhiGiam
        public GhiGiamController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetGhiGiamById([FromBody]GetGhiGiamByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListGhiGiamChiTietByGhiGiamId([FromBody]GetGhiGiamChiTietByGhiGiamIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListGhiGiamByProjection([FromBody]GetListGhiGiamByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertGhiGiam([FromBody]InsertGhiGiamAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateGhiGiam([FromBody]UpdateGhiGiamAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListGhiGiamById([FromBody]DeleteListGhiGiamAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}