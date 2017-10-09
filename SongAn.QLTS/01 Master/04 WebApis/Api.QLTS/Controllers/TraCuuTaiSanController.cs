using SongAn.QLTS.Api.QLTS.Models.TraCuuTaiSan;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class TraCuuTaiSanController : BaseApiController
    {
        public TraCuuTaiSanController() : base() { }

        [HttpPost]
        public async Task<IHttpActionResult> GetListMenuCoSoByNhanVienId([FromBody]GetListMenuCoSoByNhanVienIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListTaiSanByCriteria([FromBody]GetListTaiSanByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
         [HttpPost]
        public async Task<IHttpActionResult> LuocSu([FromBody]LuocSuAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
   }
}
