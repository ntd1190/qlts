using SongAn.QLTS.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace SongAn.QLTS.UI.QLTSMAIN.Controllers
{
    public class HopDongController : BaseController
    {
        // GET: HopDong
        public ActionResult Index()
        {
            return View();
        }
        [CustomAuthorize(FunctionCodes = "CN0051")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0051");

            ViewBag.userInfo = userLogin;

            return View();
        }

        [AllowAnonymous]
        public ActionResult showView(string viewName, string type)
        {
            ViewBag.userInfo = LoadUserInfo("CN0051");

            type = string.IsNullOrEmpty(type) ? "Html" : type;
            ViewData[type] = true;
            return PartialView(viewName);
        }
    }
}