using SongAn.QLTS.Api.QLTS.Models.GhiTang;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLNS.Controllers
{
    public class GhiTangController : BaseApiController
    {
        public GhiTangController(): 
            base()
        {

        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListGhiTangByProjection([FromBody]GetListGhiTangByProjectionAction action)
        {
            try
            {
                ActionResultDto result = await action.Execute(context);
                return Content(result.ReturnCode, result.ReturnData);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListGhiTangChiTietByGhiTangId([FromBody]GetListGhiTangChiTietByGhiTangIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
