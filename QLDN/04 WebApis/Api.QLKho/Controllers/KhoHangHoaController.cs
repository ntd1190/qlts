using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using  SongAn.QLDN.Api.QLKho.Models.KhoHangHoa;
using System.Collections.Generic;
using System.Configuration;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers
{
    public class KhoHangHoaController : BaseApiController
    {
        // GET: KhoHangHoa
        public KhoHangHoaController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetKhoHangHoaById([FromBody]GetKhoHangHoaByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoHangHoaByProjection([FromBody]GetListKhoHangHoaByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertKhoHangHoa([FromBody]InsertKhoHangHoaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateKhoHangHoa([FromBody]UpdateKhoHangHoaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteKhoHangHoa([FromBody]DeleteKhoHangHoaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData); ;
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteListKhoHangHoa([FromBody]DeleteListKhoHangHoaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoHangHoaBySearchString([FromBody]GetListKhoHangHoaBySearchStringAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListKhoHangHoa([FromBody]UpdateXoaListKhoHangHoaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListKhoHangHoaV2([FromBody]UpdateXoaListKhoHangHoaV2Action action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetThongTinKhoHangHoaByMa([FromBody]GetThongTinKhoHangHoaByMaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        
    }
}