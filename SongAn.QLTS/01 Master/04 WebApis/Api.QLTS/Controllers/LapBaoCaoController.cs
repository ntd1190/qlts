using SongAn.QLTS.Api.QLTS.Models.LapBaoCao;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class LapBaoCaoController : BaseApiController
    {
        // GET: LapBaoCao
        public LapBaoCaoController(): 
            base()
        {

        }
        
        [HttpPost]
        public async Task<IHttpActionResult> GetLapBaoCaoById([FromBody]GetLapBaoCaoByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetLapBaoCaoChiTietById([FromBody]GetLapBaoCaoChiTietByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListLapBaoCaoByProjection([FromBody]GetListLapBaoCaoByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertLapBaoCao([FromBody]InsertLapBaoCaoAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateLapBaoCao([FromBody]UpdateLapBaoCaoAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListLapBaoCao([FromBody]DeleteListLapBaoCaoAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListDMBaoCao([FromBody]GetListDMBaoCaoAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}