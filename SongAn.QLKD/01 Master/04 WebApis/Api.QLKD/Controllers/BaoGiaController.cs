using SongAn.QLKD.Api.QLKD.Models.BaoGia;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLKD.Api.QLKD.Controllers
{
    public class BaoGiaController : BaseApiController
    {
        public BaoGiaController() : base()
        {
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetBaoGiaById([FromBody]GetListBaoGiaByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListBaoGiaChiTietByBaoGiaId([FromBody]GetListBaoGiaChiTietByBaoGiaIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }


        [HttpPost]
        public async Task<IHttpActionResult> GetListBaoGiaByProjection([FromBody]GetListBaoGiaByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertBaoGia([FromBody]InsertBaoGiaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateBaoGiaById([FromBody]UpdateBaoGiaByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteBaoGiaById([FromBody]DeleteBaoGiaByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
