using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using  SongAn.QLDN.Api.QLKho.Models.KhoCongNoNCC;
using System.Collections.Generic;
using System.Configuration;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers
{
    public class KhoCongNoNCCController : BaseApiController
    {
        // GET: KhoCongNoNCC
        public KhoCongNoNCCController(): 
            base()
        {

        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoCongNoNCCByProjection([FromBody]GetListKhoCongNoNCCByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoCongNoNCCChiTietByProjection([FromBody]GetListKhoCongNoNCCChiTietByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}