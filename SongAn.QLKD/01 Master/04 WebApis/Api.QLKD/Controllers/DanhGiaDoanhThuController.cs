

using SongAn.QLKD.Api.QLKD.Models.DanhGiaDoanhThu;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLKD.Api.QLKD.Controllers
{
    public class DanhGiaDoanhThuController : BaseApiController
    {
        public DanhGiaDoanhThuController() : base()
        {
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListDanhGiaDoanhThuByProjection([FromBody]GetListDanhGiaDoanhThuByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

    }
}
