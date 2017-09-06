/*****************************************************************************
1. Create Date : 2017.03.30
2. Creator     : Tran Quoc Hung
3. Description : Test Controller
4. History     : 2017.03.30(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.NguoiDung;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.Main.Controllers
{
    public class NguoiDungController : BaseApiController
    {
        // Test Controller
        [HttpGet]
        public IHttpActionResult Index(string id)
        {
            return Ok("test test ok, id = "+ id);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListNguoiDungByProjection([FromBody] GetListNguoiDungByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetNguoiDungById([FromBody]GetNguoiDungByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertNguoiDung([FromBody]InsertNguoiDungAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateNguoiDung([FromBody]UpdateNguoiDungAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListNguoiDung([FromBody]DeleteListNguoiDungAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

    }
}
