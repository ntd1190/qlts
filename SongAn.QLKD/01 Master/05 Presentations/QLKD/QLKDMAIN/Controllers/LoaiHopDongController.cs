using SongAn.QLKD.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace SongAn.QLKD.UI.QLKDMAIN.Controllers
{
    public class LoaiHopDongController : BaseController
    {
        [CustomAuthorize(FunctionCodes = "KD0006")]
        public ActionResult showView(string viewName, string type)
        {
            ViewBag.userInfo = LoadUserInfo("KD0006");

            type = string.IsNullOrEmpty(type) ? "Html" : type;
            ViewData[type] = true;
            return PartialView(viewName);
        }

        [AllowAnonymous]
        public ActionResult showCombobox(string viewName, string type)
        {
            ViewBag.userInfo = LoadUserInfo("KD0006");

            type = string.IsNullOrEmpty(type) ? "Html" : type;
            ViewData[type] = true;
            return PartialView(viewName);
        }
    }
}