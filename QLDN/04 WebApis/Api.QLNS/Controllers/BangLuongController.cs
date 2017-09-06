/*****************************************************************************
1. Create Date  : 2017.05.08
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/BangLuong/
4. Description  : API Controller Bảng Lương
5. History      : 2017.05.08(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.BangLuong;
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
    /// API Controller Bảng Lương
    /// </summary>
    public class BangLuongController : BaseApiController
    {

        /// <summary>
        /// GetBangLuongById
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> GetBangLuongById([FromBody]GetBangLuongByIdAction action)
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
        public async Task<IHttpActionResult> InsertBangLuong([FromBody]InsertBangLuongAction action)
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
        public async Task<IHttpActionResult> UpdateBangLuong([FromBody]UpdateBangLuongAction action)
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
        public async Task<IHttpActionResult> DeleteListBangLuong([FromBody]DeleteListBangLuongAction action)
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
        public async Task<IHttpActionResult> UpdateXoaListBangLuong([FromBody]UpdateXoaListBangLuongAction action)
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
        public async Task<IHttpActionResult> GetListBangLuongByCriteria(GetListBangLuongByCriteriaAction action)
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
        public async Task<IHttpActionResult> UpdateTrangThaiBangLuong(UpdateTrangThaiBangLuongAction action)
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
        public async Task<IHttpActionResult> CountNhanVienCanTinhLuong(CountNhanVienCanTinhLuongAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }




    }
}
