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
    public class LoaiTaiSanController : BaseController
    {
        private string FunctionCode = "CN0007";
        public ActionResult Index()
        {
            string __VIEW_NAME = "Index";
            return View(__VIEW_NAME);
        }

        [CustomAuthorize(FunctionCodes = "CN0007")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0007");

            ViewBag.userInfo = userLogin;

            return View();
        }
        [AllowAnonymous]
        public ActionResult showView(string viewName, string type)
        {
            ViewBag.userInfo = LoadUserInfo(FunctionCode);

            type = string.IsNullOrEmpty(type) ? "Html" : type;
            ViewData[type] = true;
            return PartialView(viewName);
        }
    }
}