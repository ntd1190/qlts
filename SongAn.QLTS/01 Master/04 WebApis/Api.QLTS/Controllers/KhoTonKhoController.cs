using SongAn.QLTS.Api.QLTS.Models.KhoTonKho;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class KhoTonKhoController : BaseApiController
    {
        // GET: KhoTonKho
        public KhoTonKhoController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoTonKhoChiTietByProjection([FromBody]GetListKhoTonKhoChiTietByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoTonKhoByProjection([FromBody]GetListKhoTonKhoByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertKhoTonKho([FromBody]InsertKhoTonKhoAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateKhoTonKho([FromBody]UpdateKhoTonKhoAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListKhoTonKho([FromBody]DeleteListKhoTonKhoAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteKhoTonKho([FromBody]DeleteKhoTonKhoAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetKhoTonKhoChiTietById([FromBody]GetKhoTonKhoChiTietByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}