using SongAn.QLKD.Api.QLKD.Models.LoaiHangHoa;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;


namespace SongAn.QLKD.Api.QLKD.Controllers
{
    public class LoaiHangHoaController : BaseApiController
    {
        public LoaiHangHoaController() : base()
        {
    }

    [HttpPost]
    public async Task<IHttpActionResult> GetListcbxLoaiHangHoaById([FromBody]GetListcbxLoaiHangHoaByIdAction action)
    {
        ActionResultDto result = await action.Execute(context);
        return Content(result.ReturnCode, result.ReturnData);
    }
}
}
