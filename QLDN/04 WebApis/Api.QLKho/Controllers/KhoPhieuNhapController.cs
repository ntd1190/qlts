/*****************************************************************************
1. Create Date  : 2017.06.09
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : Api.QLKHO/KHOPHIEUNHAP/
4. Description  : API PHIẾU NHẬP KHO
5. History      : 2017.06.09 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLKho.Models.KhoPhieuNhap;
using SongAn.QLDN.Api.QLKho.Models.KhoPhieuNhapV2;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers
{
    public class KhoPhieuNhapController : BaseApiController
    {
        public KhoPhieuNhapController() : base() { }

        #region phiếu nhập
        public async Task<IHttpActionResult> InsertKhoPhieuNhap([FromBody]InsertKhoPhieuNhapAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateKhoPhieuNhap([FromBody]UpdateKhoPhieuNhapAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        //[HttpPost]
        //public async Task<IHttpActionResult> DeleteKhoPhieuNhapKkho([FromBody]DeleteKhoPhieuNhapKkhoAction action)
        //{
        //    ActionResultDto result = await action.Execute(context);
        //    return Content(result.ReturnCode, result.ReturnData);
        //}
        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListKhoPhieuNhap([FromBody]UpdateXoaListKhoPhieuNhapAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        //[HttpPost]
        //public async Task<IHttpActionResult> GetKhoPhieuNhapKkhoById([FromBody]GetKhoPhieuNhapKkhoByIdAction action)
        //{
        //    ActionResultDto result = await action.Execute(context);
        //    return Content(result.ReturnCode, result.ReturnData);
        //}
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoPhieuNhapByCriteria([FromBody]GetListKhoPhieuNhapByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoPhieuNhapById([FromBody]GetListKhoPhieuNhapByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #endregion

        #region Chi tiết
        [HttpPost]
        public async Task<IHttpActionResult> GetListChiTietByPhieuNhapId([FromBody]GetListChiTietByPhieuNhapIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteListChiTietByPhieuNhapId([FromBody]DeleteListChiTietByPhieuNhapIdAction action)
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
        public async Task<IHttpActionResult> InsertKhoPhieuNhapSeries([FromBody]InsertKhoPhieuNhapSeriesAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoPhieuNhapSeriesBySoPhieu([FromBody]GetListKhoPhieuNhapSeriesBySoPhieuAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        
    }
}