/*****************************************************************************
1. Create Date  : 2017.04.15
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/LoaiNghiPhep/
4. Description  : Controller Loai nghi phep
5. History      : 2017.04.15(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using SongAn.QLDN.Api.QLNS.Models.LoaiNghiPhep;
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
    /// Controller Loai nghi phep
    /// </summary>
    public class LoaiNghiPhepController : BaseApiController
    {

        /// <summary>
        /// GetLoaiNghiPhepById
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> GetLoaiNghiPhepById([FromBody]GetLoaiNghiPhepByIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> GetLoaiNghiPhepByMaLoaiNghiPhep([FromBody]GetLoaiNghiPhepByMaLoaiNghiPhepAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        /// <summary>
        /// InsertLoaiNghiPhep
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> InsertLoaiNghiPhep([FromBody]InsertLoaiNghiPhepAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        /// <summary>
        /// UpdateLoaiNghiPhep
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> UpdateLoaiNghiPhep([FromBody]UpdateLoaiNghiPhepAction action)
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
        public async Task<IHttpActionResult> DeleteListLoaiNghiPhep([FromBody]DeleteListLoaiNghiPhepAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }

        /// <summary>
        /// GetAll
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> GetAllLoaiNghiPhep([FromBody]GetAllLoaiNghiPhepAction action)
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
        public async Task<IHttpActionResult> GetListLoaiNghiPhepByCriteria(GetListLoaiNghiPhepByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }



    }
}
