using SongAn.QLDN.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    public class KhoImportDauKyController : BaseController
    {
        // GET: ImportExcelDauKy
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorize(FunctionCodes = "KHO0020")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("KHO0020");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}