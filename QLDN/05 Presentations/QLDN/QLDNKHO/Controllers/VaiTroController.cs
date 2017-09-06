using SongAn.QLDN.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNMAIN.Controllers
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

            return View();
        }
    }
}