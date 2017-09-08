using SongAn.QLTS.Api.QLTS.Models.HienTrangSuDung;
using SongAn.QLTS.Api.QLTS.Models.NhaCungCap;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class HienTrangSuDungController : BaseApiController
    {
        // GET: NhaCungCap
        public HienTrangSuDungController() : base() { }
        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxHienTrangSuDungByCriteria([FromBody]GetListcbxHienTrangSuDungByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetHienTrangSuDungById([FromBody]GetHienTrangSuDungByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}