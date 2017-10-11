using SongAn.QLTS.Api.QLTS.Models.DuyetBaoCao;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class DuyetBaoCaoController : BaseApiController
    {
        public DuyetBaoCaoController(): 
            base()
        {

        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListDuyetBaoCaoByProjection([FromBody]GetListDuyetBaoCaoByProjectionAction action)
        {
                ActionResultDto result = await action.Execute(context);
                return Content(result.ReturnCode, result.ReturnData);
        }


        [HttpPost]
        public async Task<IHttpActionResult> GetListDuyetBaoCaoChiTietById([FromBody]GetListDuyetBaoCaoChiTietByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DuyetDuyetBaoCao([FromBody]DuyetDuyetBaoCaoAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DuyetDuyetBaoCaoChiTiet([FromBody]DuyetDuyetBaoCaoChiTietAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
