using SongAn.QLTS.Api.QLTS.Models.LoaiXe;
using SongAn.QLTS.Api.QLTS.Models.NhaCungCap;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class LoaiXeController : BaseApiController
    {
        // GET: NhaCungCap
        public LoaiXeController() : base() { }
        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxLoaiXeByCriteria([FromBody]GetListcbxLoaiXeByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetLoaiXeById([FromBody]GetLoaiXeByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}