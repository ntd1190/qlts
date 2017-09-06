using SongAn.QLDN.Api.QLNS.Models.TamUng;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;


namespace SongAn.QLDN.Api.QLNS.Controllers
{
    public class TamUngController : BaseApiController
    {
        public TamUngController() : base()
        {
        }
        [HttpGet]
        public IHttpActionResult Index(string id)
        {
            return Ok("test test ok, id = " + id);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListTamUngByProjection([FromBody] GetListTamUngByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetTamUngById([FromBody]GetTamUngByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertTamUng([FromBody]InsertTamUngAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateTamUng([FromBody]UpdateTamUngAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListTamUng([FromBody]DeleteListTamUngAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListTamUng([FromBody] UpdateXoaListTamUngAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
