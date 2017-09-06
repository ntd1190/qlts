/*****************************************************************************
1. Create Date : 2017.05.22
2. Creator     : Nguyen Thanh Binh
3. Description : API quản lý hợp đồng
4. History     : 2017.05.22(Nguyen Thanh Binh) - tạo mới
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.PhieuCongTac;
using SongAn.QLDN.Api.QLNS.Models.QuanLyHopDong;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLNS.Controllers
{
    public class QuanLyHopDongController : BaseApiController
    {
        public QuanLyHopDongController() : base() { }

        #region CRUD
        [HttpPost]
        public async Task<IHttpActionResult> InsertQuanLyHopDong([FromBody] InsertQuanLyHopDongAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateQuanLyHopDong([FromBody] UpdateQuanLyHopDongAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaQuanLyHopDong([FromBody] UpdateXoaQuanLyHopDongAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListQuanLyHopDongById([FromBody] GetListQuanLyHopDongByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        #endregion

        #region LIST
        [HttpPost]
        public async Task<IHttpActionResult> GetListQuanLyHopDongByNhanVienId([FromBody] GetListQuanLyHopDongByNhanVienIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #endregion
    }
}
