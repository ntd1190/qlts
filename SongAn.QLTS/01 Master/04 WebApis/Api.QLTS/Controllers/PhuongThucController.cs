using SongAn.QLTS.Api.QLTS.Models.PhuongThuc;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class PhuongThucController : BaseApiController
    {
        // GET: PhongBan
        public PhuongThucController(): 
            base()
        {

        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxPhuongThucByCriteria([FromBody]GetListcbxPhuongThucByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}