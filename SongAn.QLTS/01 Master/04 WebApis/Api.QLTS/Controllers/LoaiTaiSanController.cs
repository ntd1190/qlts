using SongAn.QLTS.Api.QLTS.Models.LoaiTaiSan;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class LoaiTaiSanController : BaseApiController
    {
        // GET: LoaiTaiSan
        public LoaiTaiSanController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetLoaiTaiSanById([FromBody]GetLoaiTaiSanByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListLoaiTaiSanByProjection([FromBody]GetListLoaiTaiSanByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxLoaiTaiSanByProjection([FromBody]GetListcbxLoaiTaiSanByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> InsertLoaiTaiSan([FromBody]InsertLoaiTaiSanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateLoaiTaiSan([FromBody]UpdateLoaiTaiSanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListLoaiTaiSan([FromBody]DeleteListLoaiTaiSanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}