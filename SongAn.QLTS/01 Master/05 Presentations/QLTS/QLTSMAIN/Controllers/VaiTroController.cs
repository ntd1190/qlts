using SongAn.QLTS.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLTS.UI.QLTSMAIN.Controllers
{
    public class VaiTroController : BaseController
    {
        // GET: VaiTro
        public ActionResult Index()
        {
            string __VIEW_NAME = "Index";
            return View(__VIEW_NAME);
        }

        [CustomAuthorize(FunctionCodes = "CN0003")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0003");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}