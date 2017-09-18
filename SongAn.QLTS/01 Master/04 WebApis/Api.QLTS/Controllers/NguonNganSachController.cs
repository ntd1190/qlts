using SongAn.QLTS.Api.QLTS.Models.NguonNganSach;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class NguonNganSachController : BaseApiController
    {
        // GET: NguonNganSach
        public NguonNganSachController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetNguonNganSachById([FromBody]GetNguonNganSachByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListNguonNganSachByProjection([FromBody]GetListNguonNganSachByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxNguonNganSachByProjection([FromBody]GetListcbxNguonNganSachByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertNguonNganSach([FromBody]InsertNguonNganSachAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateNguonNganSach([FromBody]UpdateNguonNganSachAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListNguonNganSach([FromBody]DeleteListNguonNganSachAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}