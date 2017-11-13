using SongAn.QLKD.Api.QLKD.Models.QuanHuyen;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLKD.Api.QLKD.Controllers
{
    public class QuanHuyenController : BaseApiController
    {
        public QuanHuyenController() : base()
        {
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxQuanHuyenById([FromBody]GetListcbxQuanHuyenByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
