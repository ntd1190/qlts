using SongAn.QLTS.Api.QLTS.Models.BaoDuong;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLNS.Controllers
{
    public class BaoDuongController :BaseApiController
    {
        public BaoDuongController(): 
            base()
        {

        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListBaoDuongByProjection([FromBody]GetListBaoDuongByProjectionAction action)
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
        public async Task<IHttpActionResult> GetListBaoDuongById([FromBody]GetListBaoDuongByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListSuaChuaByBaoDuongId([FromBody]GetListSuaChuaByBaoDuongIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListBaoDuongById([FromBody]DeleteListBaoDuongByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertBaoDuong([FromBody]InsertBaoDuongAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateBaoDuongById([FromBody]UpdateBaoDuongByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
