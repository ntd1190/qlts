using SongAn.QLDN.Api.QLKho.Models.KhoTongHopXuatNhapTonTheoKy;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLKho.Controllers
{
    public class KhoTongHopXuatNhapTonTheoKyController : BaseApiController
    {
        ///// <summary>
        ///// GetBangLuongById
        ///// </summary>
        ///// <param name="action"></param>
        ///// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> GetKyById([FromBody]GetTongHopXuatNhapTonTheoKyByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="action"></param>
        ///// <returns></returns>
       [HttpPost]
        public async Task<IHttpActionResult> InsertKy([FromBody]InsertTongHopXuatNhapTonTheoKyAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="action"></param>
        ///// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> UpdateKy([FromBody]UpdateTongHopXuatNhapTonTheoKyAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> getListChiTietByKyId([FromBody]GetListChiTietByKyIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> getListChiTietTheKhobyItem([FromBody]GetListChiTietTheKhobyItemAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        
        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="action"></param>
        ///// <returns></returns>
        //[HttpPost]
        //public async Task<IHttpActionResult> DeleteListBangLuong([FromBody]DeleteListBangLuongAction action)
        //{
        //    ActionResultDto result = await action.Execute(context);
        //    return Content(result.ReturnCode, result.ReturnData);
        //}

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="action"></param>
        ///// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> UpdateXoaListKy([FromBody]UpdateXoaTongHopXuatNhapTonTheoKyAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> GetListTongHopXuatNhapTonTheoKyByCriteria(GetListTongHopXuatNhapTonTheoKyByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        #region Popup
        [HttpPost]
        public async Task<IHttpActionResult> GetListKhoKyPopupByCriteria([FromBody]GetListKhoKyPopupByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        #endregion

    }
}
