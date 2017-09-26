using SongAn.QLTS.Api.QLTS.Models.SuDung;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class SuDungController : BaseApiController
    {
        public SuDungController(): 
            base()
        {

        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListSuDungByProjection([FromBody]GetListSuDungByProjectionAction action)
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
        public async Task<IHttpActionResult> GetListSuDungById([FromBody]GetListSuDungByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListSuDungChiTietBySuDungId([FromBody]GetListSuDungChiTietBySuDungIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListSuDungById([FromBody]DeleteListSuDungByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertSuDung([FromBody]InsertSuDungAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateSuDungById([FromBody]UpdateSuDungByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
