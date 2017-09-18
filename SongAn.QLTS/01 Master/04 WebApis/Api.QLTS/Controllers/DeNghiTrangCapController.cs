using SongAn.QLTS.Api.QLTS.Models.DeNghiTrangCap;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class DeNghiTrangCapController : BaseApiController
    {
        public DeNghiTrangCapController(): 
            base()
        {

        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListDeNghiTrangCapByProjection([FromBody]GetListDeNghiTrangCapByProjectionAction action)
        {
            try
            {
                ActionResultDto result = await action.Execute(context);
                return Content(result.ReturnCode, result.ReturnData);
            }
            catch(Exception e)
            {
                return null;
            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListDeNghiTrangCapByDeNghiId([FromBody]GetListDeNghiTrangCapByDeNghiIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListDeNghiTrangCapChiTietByDeNghiId([FromBody]GetListDeNghiTrangCapChiTietByDeNghiIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListDeNghiMuaSamById([FromBody]DeleteListDeNghiMuaSamByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertDeNghiTrangCap([FromBody]InsertDeNghiTrangCapAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateDeNghiTrangCap([FromBody]UpdateDeNghiTrangCapByDeNghiIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

    }
}
