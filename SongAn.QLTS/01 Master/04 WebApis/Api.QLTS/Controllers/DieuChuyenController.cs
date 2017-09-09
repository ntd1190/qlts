using SongAn.QLTS.Api.QLTS.Models.DieuChuyen;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLNS.Controllers
{
    public class DieuChuyenController : BaseApiController
    {
        public DieuChuyenController(): 
            base()
        {

        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListDieuChuyenByProjection([FromBody]GetListDieuChuyenByProjectionAction action)
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
        public async Task<IHttpActionResult> GetListDieuChuyenByDieuChuyenId([FromBody]GetListDieuChuyenByDieuChuyenIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListDieuChuyenChiTietByDieuChuyenId([FromBody]GetListDieuChuyenChiTietByDieuChuyenIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertDieuChuyen([FromBody]InsertDieuChuyenAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateDieuChuyenByDieuChuyenId([FromBody]UpdateDieuChuyenByDieuChuyenIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListDieuChuyenById([FromBody]DeleteListDieuChuyenByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
