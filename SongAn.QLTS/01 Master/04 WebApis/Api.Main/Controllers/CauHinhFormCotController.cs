﻿using SongAn.QLTS.Api.Main.Models.CauHinhFormCot;
using SongAn.QLTS.Util.Common.Api;
using SongAn.QLTS.Util.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLTS.Api.Main.Controllers
{
    public class CauHinhFormCotController : BaseApiController
    {
        public CauHinhFormCotController() : base() { }

        [HttpGet]
        public IHttpActionResult Index()
        {
            return Content(HttpStatusCode.OK, "OK");
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetListCauHinhCotByCriteria([FromBody] GetListCauHinhCotByCriteriaAction action)
        {

            var result = await action.Execute(context);

            return Content(result.ReturnCode, result.ReturnData);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateListCauHinhCot([FromBody] UpdateListCauHinhCotAction action)
        {

            var result = await action.Execute(context);

            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
