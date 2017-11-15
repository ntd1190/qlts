using SongAn.QLKD.Api.QLKD.Models.NhomKhachHang;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLKD.Api.QLKD.Controllers
{
    public class NhomKhachHangController : BaseApiController
    {
        public NhomKhachHangController() : base()
        {
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxNhomKhachHangById([FromBody]GetListcbxNhomKhachHangByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListNhomKhachHangById([FromBody]GetListNhomKhachHangByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }


        [HttpPost]
        public async Task<IHttpActionResult> GetListNhomKhachHangByProjection([FromBody]GetListNhomKhachHangByProjectionAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertNhomKhachHang([FromBody]InsertNhomKhachHangAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateNhomKhachHangById([FromBody]UpdateNhomKhachHangByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteNhomKhachHangById([FromBody]DeleteNhomKhachHangByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
