using SongAn.QLTS.Api.QLTS.Models.HopDong;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class HopDongController : BaseApiController
    {
        // GET: HopDong
        public HopDongController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetHopDongById([FromBody]GetListHopDongByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        //[HttpPost]
        //public async Task<IHttpActionResult> GetListcbxHopDongByProjection([FromBody]GetListcbxHopDongByProjectionAction action)
        //{
        //    ActionResultDto result = await action.Execute(context);
        //    return Content(result.ReturnCode, result.ReturnData);
        //}
        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxHopDongById([FromBody]GetListcbxHopDongByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListHopDongByProjection([FromBody]GetListHopDongByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertHopDong([FromBody]InsertHopDongAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateHopDong([FromBody]UpdateHopDongByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListHopDong([FromBody]DeleteListHopDongByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
