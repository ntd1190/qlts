using SongAn.QLTS.Api.QLTS.Models.NhomTaiSan;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class NhomTaiSanController : BaseApiController
    {
        // GET: NhomTaiSan
        public NhomTaiSanController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetNhomTaiSanById([FromBody]GetNhomTaiSanByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListNhomTaiSanByProjection([FromBody]GetListNhomTaiSanByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxNhomTaiSanByProjection([FromBody]GetListcbxNhomTaiSanByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertNhomTaiSan([FromBody]InsertNhomTaiSanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateNhomTaiSan([FromBody]UpdateNhomTaiSanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListNhomTaiSan([FromBody]DeleteListNhomTaiSanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}