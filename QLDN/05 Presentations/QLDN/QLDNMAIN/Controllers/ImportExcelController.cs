using SongAn.QLDN.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNMAIN.Controllers
{
    public class ImportExcelController : BaseController
    {
        // GET: ImportExcelController
        public ActionResult Index()
        {
            string __VIEW_NAME = "Index";
            return View(__VIEW_NAME);
        }

        [CustomAuthorize(FunctionCodes = "CN0023")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0023");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}