using SongAn.QLTS.Api.QLTS.Models.ChotSoLieuThang;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class ChotSoLieuThangController : BaseApiController
    {
        public ChotSoLieuThangController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> ChotSoLieuThang([FromBody]ChotSoLieuThangAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
