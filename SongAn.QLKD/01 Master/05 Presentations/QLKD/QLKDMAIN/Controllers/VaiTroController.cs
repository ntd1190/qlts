using SongAn.QLKD.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLKD.UI.QLKDMAIN.Controllers
{
    public class VaiTroController : BaseController
    {
        // GET: VaiTro
        public ActionResult Index()
        {
            string __VIEW_NAME = "Index";
            return View(__VIEW_NAME);
        }

        [CustomAuthorize(FunctionCodes = "CN0005")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0005");

            ViewBag.userInfo = userLogin;

            string __VIEW_NAME = "List";
            return View(__VIEW_NAME);
        }

        [CustomAuthorize(FunctionCodes = "CN0005")]
        public ActionResult showView(string viewName, string type)
        {
            type = string.IsNullOrEmpty(type) ? "Html" : type;
            ViewData[type] = true;
            string userLogin = LoadUserInfo("CN0005");
            ViewBag.userInfo = userLogin;
            return PartialView(viewName);
        }
    }
}