using SongAn.QLKD.Api.QLKD.Models.NhomKinhDoanh;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLKD.Controllers
{
    public class NhomKinhDoanhController : BaseApiController
    {
        // GET: NhomKinhDoanh
        public NhomKinhDoanhController(): 
            base()
        {

        }

        [HttpPost]
        public async Task<IHttpActionResult> GetNhomKinhDoanhById([FromBody]GetNhomKinhDoanhByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListNhomKinhDoanhByProjection([FromBody]GetListNhomKinhDoanhByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxNhomKinhDoanhByProjection([FromBody]GetListcbxNhomKinhDoanhByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertNhomKinhDoanh([FromBody]InsertNhomKinhDoanhAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateNhomKinhDoanh([FromBody]UpdateNhomKinhDoanhAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListNhomKinhDoanh([FromBody]DeleteListNhomKinhDoanhAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}