using SongAn.QLTS.Api.QLTS.Models.KhoTaiSan;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class KhoTaiSanController : BaseApiController
    {
        // GET: KhoTaiSan
        public KhoTaiSanController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetKhoTaiSanById([FromBody]GetKhoTaiSanByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoTaiSanByProjection([FromBody]GetListKhoTaiSanByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxKhoTaiSanByProjection([FromBody]GetListcbxKhoTaiSanByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertKhoTaiSan([FromBody]InsertKhoTaiSanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateKhoTaiSan([FromBody]UpdateKhoTaiSanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListKhoTaiSan([FromBody]DeleteListKhoTaiSanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}