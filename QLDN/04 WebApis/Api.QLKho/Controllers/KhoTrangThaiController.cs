/*****************************************************************************
1. Create Date  : 2017.07.28
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : 
4. Description  : DANH SÁCH TRẠNG THÁI
5. History      : 2017.07.28 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLKho.Models.KhoTrangThai;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers
{
    public class KhoTrangThaiController : BaseApiController
    {
        public KhoTrangThaiController() : base() { }

        [HttpPost]
        public async Task<IHttpActionResult> GetListTrangThaiPopupByChucNang([FromBody]GetListTrangThaiPopupByChucNangAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}