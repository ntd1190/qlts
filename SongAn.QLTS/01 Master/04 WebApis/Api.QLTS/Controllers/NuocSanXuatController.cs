using SongAn.QLTS.Api.QLTS.Models.NuocSanXuat;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class NuocSanXuatController : BaseApiController
    {
        // GET: NuocSanXuat
        public NuocSanXuatController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetNuocSanXuatById([FromBody]GetNuocSanXuatByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListNuocSanXuatByProjection([FromBody]GetListNuocSanXuatByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxNuocSanXuatByProjection([FromBody]GetListcbxNuocSanXuatByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertNuocSanXuat([FromBody]InsertNuocSanXuatAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateNuocSanXuat([FromBody]UpdateNuocSanXuatAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListNuocSanXuat([FromBody]DeleteListNuocSanXuatAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}