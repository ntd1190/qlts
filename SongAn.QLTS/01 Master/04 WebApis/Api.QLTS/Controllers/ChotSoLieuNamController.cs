using SongAn.QLTS.Api.QLTS.Models.ChotSoLieuNam;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class ChotSoLieuNamController : BaseApiController
    {
        public ChotSoLieuNamController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> ChotSoLieuNam([FromBody]ChotSoLieuNamAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
