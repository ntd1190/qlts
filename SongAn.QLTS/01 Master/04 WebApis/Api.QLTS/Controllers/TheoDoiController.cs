using SongAn.QLTS.Api.QLTS.Models.TheoDoi;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLNS.Controllers
{
    public class TheoDoiController : BaseApiController
    {
        public TheoDoiController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListTheoDoiByProjection([FromBody]GetListTheoDoiByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> InsertTheoDoi([FromBody]InsertTheoDoiAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
