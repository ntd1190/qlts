/*****************************************************************************
1. Create Date : 2017.04.13
2. Creator     : Nguyen Thanh Binh
3. Description : API nhân viên
4. History     : 2017.04.13(Nguyen Thanh Binh) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.NhanVien;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLNS.Controllers
{
    public class NhanVienController : BaseApiController
    {
        public NhanVienController() : base()
        {
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetNhanVienById([FromBody] GetNhanVienByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> InsertNhanVien([FromBody] InsertNhanVienAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateNhanVien([FromBody] UpdateNhanVienAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> DeleteListNhanVien([FromBody] DeleteListNhanVienAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListNhanVien([FromBody] UpdateXoaListNhanVienAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        #region GetList
        /// <summary>
        /// quich search
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        /// <remarks>
        /// -> GetListNhanVienByFilterAction
        /// -> GetListNhanVienByCriteriaBiz
        /// -> GetListNhanVienByCriteriaDac
        /// -> sp_NhanVien_GetListNhanVienByCriteria
        /// </remarks>
        [HttpPost]
        public async Task<IHttpActionResult> getListNhanVienByQuickSearch([FromBody] getListNhanVienByQuickSearchAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        /// <summary>
        /// API tổng quát full option
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        /// <remarks>
        /// -> GetListNhanVienByCriteriaAction
        /// -> GetListNhanVienByCriteriaBiz
        /// -> GetListNhanVienByCriteriaDac
        /// -> sp_NhanVien_GetListNhanVienByCriteria
        /// </remarks>
        [HttpPost]
        public async Task<IHttpActionResult> GetListNhanVienByCriteria([FromBody] GetListNhanVienByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListNhanVienByCriteriaList([FromBody] GetListNhanVienByCriteriaListAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        #endregion

        #region Thông tin nhân viên
        [HttpPost]
        public async Task<IHttpActionResult> InsertThongTinNhanVien([FromBody] InsertThongTinNhanVienAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateThongTinNhanVien([FromBody] UpdateThongTinNhanVienAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetThongTinNhanVienByMa([FromBody] GetThongTinNhanVienByMaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetThongTinNhanVienById([FromBody] GetThongTinNhanVienByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #endregion
    }
}
