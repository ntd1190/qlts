/*****************************************************************************
1. Create Date  : 2017.07.17
2. Creator      : NGUYEN THANH BINH
3. Function     : QLDNMAIN/CHINHANH/LIST
4. Description  : API CHI NHÁNH
5. History      : 2017.07.17 (NGUYEN THANH BINH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.ChiNhanh;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLNS.Controllers
{
    public class ChiNhanhController : BaseApiController
    {
        // GET: KhoLoaiHangHoa
        public ChiNhanhController() : base() { }

        public async Task<IHttpActionResult> InsertChiNhanh([FromBody]InsertChiNhanhAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateChiNhanh([FromBody]UpdateChiNhanhAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListChiNhanh([FromBody]UpdateXoaListChiNhanhAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetChiNhanhById([FromBody]GetChiNhanhByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListChiNhanhByCriteria([FromBody]GetListChiNhanhByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        #region Popup
        [HttpPost]
        public async Task<IHttpActionResult> GetListChiNhanhPopupByCriteria([FromBody]GetListChiNhanhPopupByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #endregion
    }
}