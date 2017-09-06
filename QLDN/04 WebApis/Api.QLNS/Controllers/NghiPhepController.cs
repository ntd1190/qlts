/*****************************************************************************
1. Create Date  : 2017.04.15
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/NghiPhep/
4. Description  : Controller nghi phep
5. History      : 2017.04.15(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.NghiPhep;
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
    /// Controller nghi phep
    /// </summary>
    public class NghiPhepController : BaseApiController
    {

        /// <summary>
        /// GetNghiPhepById
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> GetNghiPhepById([FromBody]GetNghiPhepByIdAction action)
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
        public async Task<IHttpActionResult> InsertNghiPhep([FromBody]InsertNghiPhepAction action)
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
        public async Task<IHttpActionResult> UpdateNghiPhep([FromBody]UpdateNghiPhepAction action)
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
        public async Task<IHttpActionResult> DeleteListNghiPhep([FromBody]DeleteListNghiPhepAction action)
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
        public async Task<IHttpActionResult> UpdateXoaListNghiPhep([FromBody]UpdateXoaListNghiPhepAction action)
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
        public async Task<IHttpActionResult> GetListNghiPhepByCriteria(GetListNghiPhepByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }




    }
}
