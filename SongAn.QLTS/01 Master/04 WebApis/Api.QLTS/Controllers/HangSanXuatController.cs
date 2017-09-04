using SongAn.QLTS.Api.QLTS.Models.HangSanXuat;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class HangSanXuatController : BaseApiController
    {
        // GET: HangSanXuat
        public HangSanXuatController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetHangSanXuatById([FromBody]GetHangSanXuatByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListHangSanXuatByProjection([FromBody]GetListHangSanXuatByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxHangSanXuatByProjection([FromBody]GetListcbxHangSanXuatByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertHangSanXuat([FromBody]InsertHangSanXuatAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateHangSanXuat([FromBody]UpdateHangSanXuatAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListHangSanXuat([FromBody]DeleteListHangSanXuatAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}