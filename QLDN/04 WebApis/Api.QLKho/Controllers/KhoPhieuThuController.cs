using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using  SongAn.QLDN.Api.QLKho.Models.KhoPhieuThu;
using System.Collections.Generic;
using System.Configuration;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers
{
    public class KhoPhieuThuController : BaseApiController
    {
        // GET: KhoPhieuThu
        public KhoPhieuThuController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetKhoPhieuThuById([FromBody]GetKhoPhieuThuByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoPhieuThuByProjection([FromBody]GetListKhoPhieuThuByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertKhoPhieuThu([FromBody]InsertKhoPhieuThuAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateKhoPhieuThu([FromBody]UpdateKhoPhieuThuAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteKhoPhieuThu([FromBody]DeleteKhoPhieuThuAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData); ;
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteListKhoPhieuThu([FromBody]DeleteListKhoPhieuThuAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListKhoPhieuThu([FromBody]UpdateXoaListKhoPhieuThuAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        
    }
}