/*****************************************************************************
1. Create Date : 2017.04.13
2. Creator     : Nguyen Thanh Binh
3. Description : API nhân viên
4. History     : 2017.04.13(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.LuongPhuCap;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLNS.Controllers
{
    public class LuongPhuCapController : BaseApiController
    {
        public LuongPhuCapController() : base()
        {
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertLuongPhuCap([FromBody] InsertLuongPhuCapAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateLuongPhuCap([FromBody] UpdateLuongPhuCapAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetLuongPhuCapByNhanVienId([FromBody] GetLuongPhuCapByNhanVienIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
