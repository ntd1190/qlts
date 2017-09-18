using SongAn.QLTS.Api.QLTS.Models.BienBanKiemKe;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class BienBanKiemKeController : BaseApiController
    {
        public BienBanKiemKeController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListBienBanKiemKeByProjection([FromBody]GetListBienBanKiemKeByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListBienBanKiemKeById([FromBody]GetListBienBanKiemKeByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListBienBanKiemKeChiTietByKiemKeId([FromBody]GetListBienBanKiemKeChiTietByKiemKeIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListBanKiemKeByKiemKeId([FromBody]GetListBanKiemKeByKiemKeIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertBienBanKiemKe([FromBody]InsertBienBanKiemKeAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateBienBanKiemKeById([FromBody]UpdateBienBanKiemKeByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListBienBanKiemKeById([FromBody]DeleteListBienBanKiemKeByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

    }
}
