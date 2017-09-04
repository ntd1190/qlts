using SongAn.QLTS.Api.QLTS.Models.NhaCungCap;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class NhaCungCapController : BaseApiController
    {
        // GET: NhaCungCap
        public NhaCungCapController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetNhaCungCapById([FromBody]GetNhaCungCapByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListNhaCungCapByProjection([FromBody]GetListNhaCungCapByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertNhaCungCap([FromBody]InsertNhaCungCapAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateNhaCungCap([FromBody]UpdateNhaCungCapAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListNhaCungCap([FromBody]DeleteListNhaCungCapAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}