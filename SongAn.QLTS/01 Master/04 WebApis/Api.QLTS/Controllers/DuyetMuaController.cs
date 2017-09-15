using SongAn.QLTS.Api.QLTS.Models.DuyetMua;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class DuyetMuaController : BaseApiController
    {
        public DuyetMuaController(): 
            base()
        {

        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListDuyetMuaByProjection([FromBody]GetListDuyetMuaByProjectionAction action)
        {
                ActionResultDto result = await action.Execute(context);
                return Content(result.ReturnCode, result.ReturnData);
        }


        [HttpPost]
        public async Task<IHttpActionResult> GetDuyetMuaChiTietByMuaSamId([FromBody]GetDuyetMuaChiTietByMuaSamIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DuyetDuyetMua([FromBody]DuyetDuyetMuaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
