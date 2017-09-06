using SongAn.QLDN.Data.Repository.MSSQL_QLDN_QLNS;
using SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using  SongAn.QLDN.Api.QLKho.Models.KhoNhomHangHoa;
using System.Collections.Generic;
using System.Configuration;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers
{
    public class KhoNhomHangHoaController : BaseApiController
    {
        // GET: KhoNhomHangHoa
        public KhoNhomHangHoaController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetKhoNhomHangHoaById([FromBody]GetKhoNhomHangHoaByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoNhomHangHoaByProjection([FromBody]GetListKhoNhomHangHoaByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertKhoNhomHangHoa([FromBody]InsertKhoNhomHangHoaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateKhoNhomHangHoa([FromBody]UpdateKhoNhomHangHoaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteKhoNhomHangHoa([FromBody]DeleteKhoNhomHangHoaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData); ;
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteListKhoNhomHangHoa([FromBody]DeleteListKhoNhomHangHoaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListKhoNhomHangHoa([FromBody]UpdateXoaListKhoNhomHangHoaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}