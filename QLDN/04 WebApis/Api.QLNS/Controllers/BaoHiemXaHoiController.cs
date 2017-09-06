/*****************************************************************************
1. Create Date : 2017.04.13
2. Creator     : Nguyen Thanh Binh
3. Description : API nhân viên
4. History     : 2017.04.13(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.BaoHiemXaHoi;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLNS.Controllers
{
    public class BaoHiemXaHoiController : BaseApiController
    {
        public BaoHiemXaHoiController() : base() { }

        #region CRUD

        [HttpPost]
        public async Task<IHttpActionResult> UpdateBaoHiemXaHoi([FromBody] UpdateBaoHiemXaHoiAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetBaoHiemXaHoiByNhanVienId([FromBody] GetBaoHiemXaHoiByNhanVienIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        #endregion

        #region List
        #endregion
    }
}
