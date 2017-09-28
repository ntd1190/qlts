﻿using SongAn.QLTS.Api.QLTS.Models.DanhGia;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.QLTS.Controllers
{
    public class DanhGiaController : BaseApiController
    {
        // GET: DuAn
        public DanhGiaController() : base() { }
        [HttpPost]
        public async Task<IHttpActionResult> GetListDanhGiaByCriteria([FromBody]GetListDanhGiaByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> InsertDanhGia([FromBody]InsertDanhGiaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListNguyenGiaByDanhGia([FromBody]GetListNguyenGiaByDanhGiaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> UpdateDanhGia([FromBody]UpdateDanhGiaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> DeleteDanhGia([FromBody]DeleteDanhGiaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}