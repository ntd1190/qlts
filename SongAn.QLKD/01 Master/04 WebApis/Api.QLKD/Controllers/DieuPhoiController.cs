using SongAn.QLKD.Api.QLKD.Models.DieuPhoi;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLKD.Api.QLKD.Controllers
{
    public class DieuPhoiController : BaseApiController
    {
        public DieuPhoiController() : base()
        {
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetDieuPhoiById([FromBody]GetListDieuPhoiByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListDieuPhoiChiTietByDieuPhoiId([FromBody]GetListDieuPhoiChiTietByDieuPhoiIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }


        [HttpPost]
        public async Task<IHttpActionResult> GetListDieuPhoiByProjection([FromBody]GetListDieuPhoiByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertDieuPhoi([FromBody]InsertDieuPhoiAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateDieuPhoiById([FromBody]UpdateDieuPhoiByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteDieuPhoiById([FromBody]DeleteDieuPhoiByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
