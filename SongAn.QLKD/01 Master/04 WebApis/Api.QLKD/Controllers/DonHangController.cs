using SongAn.QLKD.Api.QLKD.Models.DonHang;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLKD.Api.QLKD.Controllers
{
    public class DonHangController : BaseApiController
    {
        public DonHangController() : base()
        {
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetDonHangById([FromBody]GetListDonHangByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListDonHangChiTietByDonHangId([FromBody]GetListDonHangChiTietByDonHangIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }


        [HttpPost]
        public async Task<IHttpActionResult> GetListDonHangByProjection([FromBody]GetListDonHangByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertDonHang([FromBody]InsertDonHangAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateDonHangById([FromBody]UpdateDonHangByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteDonHangById([FromBody]DeleteDonHangByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
