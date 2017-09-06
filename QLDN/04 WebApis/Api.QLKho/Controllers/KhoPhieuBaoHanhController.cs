/*****************************************************************************
1. Create Date  : 2017.07.27
2. Creator      : NGUYỄN THANH BÌNH
3. Function     : Api.QLKHO/KHOPHIEUBAOHANH/
4. Description  : API PHIẾU BẢO HÀNH
5. History      : 2017.07.27 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLKho.Models.KhoPhieuBaoHanh;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers
{
    public class KhoPhieuBaoHanhController : BaseApiController
    {
        public KhoPhieuBaoHanhController() : base() { }

        [HttpPost]
        public async Task<IHttpActionResult> InsertKhoPhieuBaoHanh([FromBody]InsertKhoPhieuBaoHanhAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoPhieuBaoHanhById([FromBody]GetListKhoPhieuBaoHanhByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateKhoPhieuBaoHanh([FromBody]UpdateKhoPhieuBaoHanhAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListPhieuBaoHanh([FromBody]UpdateXoaListPhieuBaoHanhAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoPhieuBaoHanhByCriteria([FromBody]GetListKhoPhieuBaoHanhByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #region Chi tiết
        [HttpPost]
        public async Task<IHttpActionResult> InsertChiTiet([FromBody]InsertChiTietAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetChiTietById([FromBody]GetChiTietByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateChiTiet([FromBody]UpdateChiTietAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteChiTiet([FromBody]DeleteChiTietAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListChiTietByPhieuBaoHanhId([FromBody]GetListChiTietByPhieuBaoHanhIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetThongTinBySeries([FromBody]GetThongTinBySeriesAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetThongTinByDienThoai([FromBody]GetThongTinByDienThoaiAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #endregion
    }
}