/*****************************************************************************
1. Create Date : 2017.05.17
2. Creator     : Nguyen Thanh Binh
3. Description : API quá trình công tác
4. History     : 2017.05.17(Nguyen Thanh Binh) - tạo mới
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.PhieuCongTac;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLNS.Controllers
{
    public class QuaTrinhCongTacController : BaseApiController
    {
        public QuaTrinhCongTacController() : base() { }

        #region CRUD
        [HttpPost]
        public async Task<IHttpActionResult> InsertQuaTrinhCongTac([FromBody] InsertQuaTrinhCongTacAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateQuaTrinhCongTac([FromBody] UpdateQuaTrinhCongTacAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteQuaTrinhCongTac([FromBody] DeleteQuaTrinhCongTacAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetQuaTrinhCongTacById([FromBody] GetQuaTrinhCongTacByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #endregion

        #region LIST
        [HttpPost]
        public async Task<IHttpActionResult> GetListQuaTrinhCongTacByNhanVienId([FromBody] GetListQuaTrinhCongTacByNhanVienIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #endregion
    }
}
