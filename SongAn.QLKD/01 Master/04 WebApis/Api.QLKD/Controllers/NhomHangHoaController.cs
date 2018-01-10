using SongAn.QLKD.Api.QLKD.Models.NhomHangHoa;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;


namespace SongAn.QLKD.Api.QLKD.Controllers
{
    public class NhomHangHoaController : BaseApiController
    {
        public NhomHangHoaController() : base()
        {
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxNhomHangHoaById([FromBody]GetListcbxNhomHangHoaByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
