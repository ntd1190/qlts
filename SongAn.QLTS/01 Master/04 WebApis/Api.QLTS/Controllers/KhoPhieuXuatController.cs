using SongAn.QLTS.Api.QLTS.Models.KhoPhieuXuat;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class KhoPhieuXuatController : BaseApiController
    {
        public KhoPhieuXuatController() : base() { }

        [HttpPost]
        public async Task<IHttpActionResult> InsertKhoPhieuXuat([FromBody]InsertKhoPhieuXuatAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateKhoPhieuXuat([FromBody]UpdateKhoPhieuXuatAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteKhoPhieuXuat([FromBody]DeleteKhoPhieuXuatAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoPhieuXuatByCriteria([FromBody]GetListKhoPhieuXuatByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetKhoPhieuXuatById([FromBody]GetKhoPhieuXuatByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetKhoPhieuXuatChiTietById([FromBody]GetKhoPhieuXuatChiTietByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
