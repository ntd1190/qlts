using SongAn.QLTS.Api.QLTS.Models.GiayBaoHong;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class GiayBaoHongController : BaseApiController
    {
        public GiayBaoHongController(): 
            base()
        {

        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListGiayBaoHongByProjection([FromBody]GetListGiayBaoHongByProjectionAction action)
        {
            try
            {
                ActionResultDto result = await action.Execute(context);
                return Content(result.ReturnCode, result.ReturnData);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListGiayBaoHongById([FromBody]GetListGiayBaoHongByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListGiayBaoHongChiTietByBaoHongId([FromBody]GetListGiayBaoHongChiTietByBaoHongIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListGiayBaoHongById([FromBody]DeleteListGiayBaoHongByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertGiayBaoHong([FromBody]InsertGiayBaoHongAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateGiayBaoHongById([FromBody]UpdateGiayBaoHongByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        //[HttpPost]
        //public async Task<IHttpActionResult> GetTongHopGiayBaoHongByDeNghiId([FromBody]GetTongHopGiayBaoHongByDeNghiIdAction action)
        //{
        //    ActionResultDto result = await action.Execute(context);
        //    return Content(result.ReturnCode, result.ReturnData);
        //}
    }
}
