using SongAn.QLKD.Api.QLKD.Models.NhanVien;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLKD.Api.QLKD.Controllers
{
    public class NhanVienController : BaseApiController
    {
        public NhanVienController() : base()
        {
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListNhanVienByProjection([FromBody] GetListNhanVienByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxNhanVienByPhongBanId([FromBody]GetListcbxNhanVienByPhongBanIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListNhanVienChiTietByProjection([FromBody] GetListNhanVienChiTietByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
