using SongAn.QLDN.Api.QLNS.Models.LichSuBanThan;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLNS.Controllers
{
    public class LichSuBanThanController : BaseApiController
    {

        public LichSuBanThanController() : base() { }

        public async Task<IHttpActionResult> InsertLichSuBanThan([FromBody]InsertLichSuBanThanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData); 
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateLichSuBanThan([FromBody]UpdateLichSuBanThanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteLichSuBanThan([FromBody]DeleteLichSuBanThanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListLichSuBanThanById([FromBody]GetListLichSuBanThanByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListLichSuBanThanByCriteria([FromBody]GetListLichSuBanThanByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
