using SongAn.QLTS.Api.QLTS.Models.DuyetCap;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class DuyetCapController : BaseApiController
    {
        public DuyetCapController(): 
            base()
        {

        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListDuyetCapByProjection([FromBody]GetListDuyetCapByProjectionAction action)
        {
                ActionResultDto result = await action.Execute(context);
                return Content(result.ReturnCode, result.ReturnData);
        }


        [HttpPost]
        public async Task<IHttpActionResult> GetListDuyetCapChiTietByDeNghiId([FromBody]GetListDuyetCapChiTietByDeNghiIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DuyetDuyetCap([FromBody]DuyetDuyetCapAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DuyetDuyetCapChiTiet([FromBody]DuyetDuyetCapChiTietAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
