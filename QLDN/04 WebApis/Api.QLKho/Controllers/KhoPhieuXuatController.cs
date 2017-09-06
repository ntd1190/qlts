/*****************************************************************************
1. Create Date  : 2017.06.09
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : Api.QLKHO/KHOPhieuXuat/
4. Description  : API PHIẾU NHẬP KHO
5. History      : 2017.06.09 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLKho.Models.KhoPhieuXuat;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers
{
    public class KhoPhieuXuatController : BaseApiController
    {
        public KhoPhieuXuatController() : base() { }

        #region phiếu nhập
        public async Task<IHttpActionResult> InsertKhoPhieuXuat([FromBody]InsertKhoPhieuXuatAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateKhoPhieuXuat([FromBody]UpdateKhoPhieuXuatAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateSauKhiLuuSoCaiByChiTietPhieuXuatId([FromBody]UpdateKhoPhieuXuatSauKhiLuuSoCaiAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        //[HttpPost]
        //public async Task<IHttpActionResult> DeleteKhoPhieuXuatKkho([FromBody]DeleteKhoPhieuXuatKkhoAction action)
        //{
        //    ActionResultDto result = await action.Execute(context);
        //    return Content(result.ReturnCode, result.ReturnData);
        //}
        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListKhoPhieuXuat([FromBody]UpdateXoaListKhoPhieuXuatAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        //[HttpPost]
        //public async Task<IHttpActionResult> GetKhoPhieuXuatKkhoById([FromBody]GetKhoPhieuXuatKkhoByIdAction action)
        //{
        //    ActionResultDto result = await action.Execute(context);
        //    return Content(result.ReturnCode, result.ReturnData);
        //}
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoPhieuXuatByCriteria([FromBody]GetListKhoPhieuXuatByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoPhieuXuatById([FromBody]GetListKhoPhieuXuatByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #endregion

        #region Chi tiết
        [HttpPost]
        public async Task<IHttpActionResult> GetListChiTietByPhieuXuatId([FromBody]GetListChiTietByPhieuXuatIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteListChiTietByPhieuXuatId([FromBody]DeleteListChiTietByPhieuXuatIdAction action)
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
        [HttpPost]
        public async Task<IHttpActionResult> UpdateInsertKhoPhieuSeries([FromBody]UpdateInsertKhoPhieuSeriesAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoPhieuSeriesBySoPhieu([FromBody]GetListKhoPhieuSeriesBySoPhieuAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}