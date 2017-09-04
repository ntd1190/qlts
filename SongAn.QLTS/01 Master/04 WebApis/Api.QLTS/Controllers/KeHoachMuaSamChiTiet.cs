using SongAn.QLTS.Api.QLTS.Models.KeHoachMuaSamChiTiet;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class KeHoachMuaSamChiTietController : BaseApiController
    {
        // GET: KeHoachMuaSamChiTiet
        public KeHoachMuaSamChiTietController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetKeHoachMuaSamChiTietById([FromBody]GetKeHoachMuaSamChiTietByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListKeHoachMuaSamChiTietByProjection([FromBody]GetListKeHoachMuaSamChiTietByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> InsertKeHoachMuaSamChiTiet([FromBody]InsertKeHoachMuaSamChiTietAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateKeHoachMuaSamChiTiet([FromBody]UpdateKeHoachMuaSamChiTietAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListKeHoachMuaSamChiTiet([FromBody]DeleteListKeHoachMuaSamChiTietAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}