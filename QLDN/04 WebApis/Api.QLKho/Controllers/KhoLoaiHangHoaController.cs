using SongAn.QLDN.Api.QLKho.Models.KhoLoaiHangHoa;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers
{
    public class KhoLoaiHangHoaController : BaseApiController
    {
        // GET: KhoLoaiHangHoa
        public KhoLoaiHangHoaController() : base() { }

        [HttpPost]
        public async Task<IHttpActionResult> GetKhoLoaiHangHoaById([FromBody]GetKhoLoaiHangHoaByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoLoaiHangHoaByProjection([FromBody]GetListKhoLoaiHangHoaByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertKhoLoaiHangHoa([FromBody]InsertKhoLoaiHangHoaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateKhoLoaiHangHoa([FromBody]UpdateKhoLoaiHangHoaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteKhoLoaiHangHoa([FromBody]DeleteKhoLoaiHangHoaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData); ;
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListKhoLoaiHangHoa([FromBody]UpdateXoaListKhoLoaiHangHoaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}