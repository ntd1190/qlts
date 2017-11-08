using SongAn.QLKD.Data.Repository.MSSQL_QLKD;
using SongAn.QLKD.Entity.QLKD.Entity;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using  SongAn.QLKD.Api.QLKD.Models.Phongban;
using System.Collections.Generic;
using System.Configuration;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
namespace SongAn.QLKD.Api.QLKD.Controllers
{
    public class PhongBanController : BaseApiController
    {
        // GET: PhongBan
        public PhongBanController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetPhongBanById([FromBody]GetPhongBanByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListPhongBanByProjection([FromBody]GetListPhongBanByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertPhongBan([FromBody]InsertPhongBanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdatePhongBan([FromBody]UpdatePhongBanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeletePhongBan([FromBody]DeletePhongBanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData); ;
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteListPhongBan([FromBody]DeleteListPhongBanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}