using SongAn.QLDN.Api.QLKho.Models.KhoKhoHang;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers
{
    public class KhoKhoHangController : BaseApiController
    {
        // GET: KhoLoaiHangHoa
        public KhoKhoHangController() : base() { }

        public async Task<IHttpActionResult> InsertKhoKhoHang([FromBody]InsertKhoKhoHangAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateKhoKhoHang([FromBody]UpdateKhoKhoHangAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteKhoKhoHang([FromBody]DeleteKhoKhoHangAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListKhoKhoHang([FromBody]UpdateXoaListKhoKhoHangAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetKhoKhoHangById([FromBody]GetKhoKhoHangByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoKhoHangByCriteria([FromBody]GetListKhoKhoHangByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        #region Popup
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoKhoHangPopupByCriteria([FromBody]GetListKhoKhoHangPopupByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #endregion
    }
}