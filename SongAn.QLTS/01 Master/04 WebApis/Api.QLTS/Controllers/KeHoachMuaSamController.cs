using SongAn.QLTS.Api.QLTS.Models.KeHoachMuaSam;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class KeHoachMuaSamController : BaseApiController
    {
        // GET: KeHoachMuaSam
        public KeHoachMuaSamController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetKeHoachMuaSamById([FromBody]GetKeHoachMuaSamByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetKeHoachMuaSamChiTietByMuaSamId([FromBody]GetKeHoachMuaSamChiTietByMuaSamIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKeHoachMuaSamByProjection([FromBody]GetListKeHoachMuaSamByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertKeHoachMuaSam([FromBody]InsertKeHoachMuaSamAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateKeHoachMuaSam([FromBody]UpdateKeHoachMuaSamAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListKeHoachMuaSam([FromBody]DeleteListKeHoachMuaSamAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}