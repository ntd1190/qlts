/*****************************************************************************
1. Create Date  : 2017.04.27
2. Creator      : Nguyen Ngoc Tan
3. Function     : Phan quyen
4. Description  : Controller Loai nghi phep
5. History      : 2017.04.27(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using SongAn.QLKD.Api.Main.Models.PhanQuyen;
using SongAn.QLKD.Util.Common.Api;
using SongAn.QLKD.Util.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SongAn.QLKD.Api.Main.Controllers
{
    /// <summary>
    /// Controller Phan Quyen
    /// </summary>
    public class PhanQuyenController : BaseApiController
    {

        /// <summary>
        /// GetQuyenTacVuByMaChucNangAndMaVaiTro
        /// </summary>
        /// <param name="action"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IHttpActionResult> GetQuyenTacVuByMaChucNangAndMaVaiTro([FromBody]GetQuyenTacVuByMaChucNangAndMaVaiTroAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        [HttpPost]
        public async Task<IHttpActionResult> GetListChucNangByVaiTroId([FromBody]GetListChucNangByVaiTroIdAction action)
        {
            ActionResultDto result = await action.Execute(context);
            return Content(result.ReturnCode, result.ReturnData);
        }
        

    }
}
