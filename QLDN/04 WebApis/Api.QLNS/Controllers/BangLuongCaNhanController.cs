/*****************************************************************************
1. Create Date  : 2017.05.13
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/BangLuongCaNhan/
4. Description  : API Controller Bảng Lương cá nhân
5. History      : 2017.05.13(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.BangLuongCaNhan;
using SongAn.QLDN.Util.Common.Api;
using SongAn.QLDN.Util.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLDN.Api.QLNS.Controllers
{
    /// <summary>
    /// API Controller Bảng Lương cá nhân
    /// </summary>
    public class BangLuongCaNhanController : BaseApiController
    {

        /// <summary>
        /// 
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> DeleteListBangLuongCaNhan([FromBody]DeleteListBangLuongCaNhanAction action)
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
        public async Task<IHttpActionResult> GetListBangLuongCaNhanByCriteria(GetListBangLuongCaNhanByCriteriaAction action)
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
        public async Task<IHttpActionResult> CalculateBangLuongCaNhanByCriteria(CalculateBangLuongCaNhanByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListBangLuongNhanVienByCriteria(GetListBangLuongNhanVienByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
