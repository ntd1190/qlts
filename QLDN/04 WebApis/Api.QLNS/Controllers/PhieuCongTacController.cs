/*****************************************************************************
1. Create Date : 2017.05.04
2. Creator     : Nguyen Thanh Binh
3. Description : API nhân viên
4. History     : 2017.05.04(Nguyen Thanh Binh) - cài đặt GetListPhieuCongTacByCriteria
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.PhieuCongTac;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLNS.Controllers
{
    public class PhieuCongTacController : BaseApiController
    {
        public PhieuCongTacController() : base() { }

        #region Phiếu công tác
        [HttpPost]
        public async Task<IHttpActionResult> InsertPhieuCongTac([FromBody] InsertPhieuCongTacAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdatePhieuCongTac([FromBody] UpdatePhieuCongTacAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListPhieuCongTac([FromBody] UpdateXoaListPhieuCongTacAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetPhieuCongTacById([FromBody] GetPhieuCongTacByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListPhieuCongTacByCriteria([FromBody] GetListPhieuCongTacByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #endregion

        #region Chi tiết phiếu công tác
        [HttpPost]
        public async Task<IHttpActionResult> GetListChiTietByPhieuCongTacId([FromBody] GetListChiTietByPhieuCongTacIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> InsertChiTiet([FromBody] InsertChiTietAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateChiTiet([FromBody] UpdateChiTietAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListChiTiet([FromBody] UpdateXoaListChiTietAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetChiTietById([FromBody] GetChiTietByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        #endregion
    }
}
