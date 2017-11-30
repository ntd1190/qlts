

using SongAn.QLKD.Api.QLKD.Models.BaoCaoDoanhThu;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLKD.Api.QLKD.Controllers
{
    public class BaoCaoDoanhThuController : BaseApiController
    {
        public BaoCaoDoanhThuController() : base()
        {
        }
        
        [HttpPost]
        public async Task<IHttpActionResult> GetListBaoCaoDoanhThuByProjection([FromBody]GetListBaoCaoDoanhThuByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        
    }
}
