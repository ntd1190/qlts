using SongAn.QLDN.Api.QLKho.Models.KhoXuatNhapTon;
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
    public class KhoXuatNhapTonController  :BaseApiController
    {
        [HttpPost]
        public async Task<IHttpActionResult> GetListXuatNhapTon([FromBody]GetListXuatNhapTonByCriteriaAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
    }
}
