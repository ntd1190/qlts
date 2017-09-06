using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SongAn.QLDN.Util.Common.Identity;


namespace SongAn.QLDN.UI.QLDNMAIN.Controllers
{
    public class ChucVuController : BaseController
    {


        // GET: 
        public ActionResult Index()
        {
            return RedirectToAction("List", "ChucVu");
        }

        [CustomAuthorize(FunctionCodes = "CN0022")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0022");

            ViewBag.userInfo = userLogin;

            return View();
        }

        //[CustomAuthorize(FunctionCodes = "CN0006")]
        public ActionResult Edit()
        {
            return View();
        }
    }
}