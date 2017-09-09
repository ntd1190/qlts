/*****************************************************************************
1. Create Date : 2017.08.31
2. Creator     : NGUYỄN THANH BÌNH
3. Description : 
4. History     : 2017.08.31(NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using SongAn.QLTS.Api.QLTS.Models.NhomTaiSan;
using SongAn.QLTS.Api.QLTS.Models.TaiSan;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class TaiSanController : BaseApiController
    {
        // GET: NhomTaiSan
        public TaiSanController() : base() { }

        #region Tài sản
        [HttpPost]
        public async Task<IHttpActionResult> InsertTaiSan([FromBody]InsertTaiSanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateTaiSan([FromBody]UpdateTaiSanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetTaiSanById([FromBody]GetTaiSanByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListNguyenGiaByTaiSanId([FromBody]GetListNguyenGiaByTaiSanIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListTaiSanByCriteria([FromBody]GetListTaiSanByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteListTaiSan([FromBody]DeleteListTaiSanAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxTaiSanByCriteria([FromBody]GetListcbxTaiSanByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListcbxTaiSanSuDungByCriteria([FromBody]GetListcbxTaiSanSuDungByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetTaiSanByMa([FromBody]GetTaiSanByMaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #endregion

        #region Thông tin công khai
        [HttpPost]
        public async Task<IHttpActionResult> GetThongTinCongKhaiById([FromBody]GetThongTinCongKhaiByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #endregion

        #region Thông tin kê khai
        [HttpPost]
        public async Task<IHttpActionResult> GetThongTinKeKhaiDatById([FromBody]GetThongTinKeKhaiDatByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetThongTinKeKhaiOtoById([FromBody]GetThongTinKeKhaiOtoByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #endregion
    }
}