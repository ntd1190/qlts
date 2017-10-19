using SongAn.QLTS.Api.QLTS.Models.KhoPhieuNhap;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class KhoPhieuNhapController : BaseApiController
    {
        public KhoPhieuNhapController(): 
            base()
        {

        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoPhieuNhapByProjection([FromBody]GetListKhoPhieuNhapByProjectionAction action)
        {
            try
            {
                ActionResultDto result = await action.Execute(context);
                return Content(result.ReturnCode, result.ReturnData);
            }
            catch (Exception e)
            {
                return null;
            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoPhieuNhapById([FromBody]GetListKhoPhieuNhapByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoPhieuNhapChiTietById([FromBody]GetListKhoPhieuNhapChiTietByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListKhoPhieuNhapById([FromBody]DeleteListKhoPhieuNhapByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertKhoPhieuNhap([FromBody]InsertKhoPhieuNhapAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateKhoPhieuNhapById([FromBody]UpdateKhoPhieuNhapByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
