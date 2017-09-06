/*****************************************************************************
1. Create Date  : 2017.06.09
2. Creator      : NGUYỄN NGỌC TÂN
3. Function     : Api.QLKHO/KHOPHIEUCHUYEN/
4. Description  : API PHIẾU NHẬP KHO
5. History      : 2017.06.09 (NGUYỄN NGỌC TÂN) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLKho.Models.KhoPhieuChuyen;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers
{
    public class KhoPhieuChuyenController : BaseApiController
    {
        public KhoPhieuChuyenController() : base() { }

        #region phiếu nhập
        public async Task<IHttpActionResult> InsertKhoPhieuChuyen([FromBody]InsertKhoPhieuChuyenAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateKhoPhieuChuyen([FromBody]UpdateKhoPhieuChuyenAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListKhoPhieuChuyen([FromBody]UpdateXoaListKhoPhieuChuyenAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoPhieuChuyenByCriteria([FromBody]GetListKhoPhieuChuyenByCriteriaAction action)

        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoPhieuChuyenById([FromBody]GetKhoPhieuChuyenByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #endregion

        #region Chi tiết
        [HttpPost]
        public async Task<IHttpActionResult> GetListChiTietByPhieuChuyenId([FromBody]GetListChiTietByPhieuChuyenIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteListChiTietByPhieuChuyenId([FromBody]DeleteListChiTietByPhieuChuyenIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #endregion
        #region lưu sổ cái
        [HttpPost]
        public async Task<IHttpActionResult> LuuSoCai([FromBody]LuuSoCaiAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #endregion
    }
}