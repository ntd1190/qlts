using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using SongAn.QLDN.Api.QLKho.Models.KhoKiemKe;
using System.Collections.Generic;
using System.Configuration;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers 
{
    public class KhoKiemKeController : BaseApiController
    {
        // GET: KhoPhieuThu
        public KhoKiemKeController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetKhoKiemKeById([FromBody]GetKhoKiemKeByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoKiemKeByProjection([FromBody]GetListKhoKiemKeByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertKhoKiemKe([FromBody]InsertKhoKiemKeAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateKhoKiemKe([FromBody]UpdateKhoKiemKeAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteKhoKiemKe([FromBody]DeleteKhoKiemKeAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData); ;
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteListKhoKiemKe([FromBody]DeleteListKhoKiemKeAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListKhoKiemKe([FromBody]UpdateXoaListKiemKeAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
