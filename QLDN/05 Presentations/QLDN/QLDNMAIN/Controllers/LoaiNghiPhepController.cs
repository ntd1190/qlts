using SongAn.QLDN.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNMAIN.Controllers
{
    public class LoaiNghiPhepController : BaseController
    {
        

        // GET: 
        public ActionResult Index()
        {
            return RedirectToAction("List", "LoaiNghiPhep");
        }

        [CustomAuthorize(FunctionCodes = "CN0008")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0008");

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