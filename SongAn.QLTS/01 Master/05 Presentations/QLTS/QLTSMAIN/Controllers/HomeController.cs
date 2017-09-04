using Newtonsoft.Json;
using SongAn.QLTS.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLTS.UI.QLTSMAIN.Controllers
{
    public class HomeController : BaseController
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            ViewBag.isLoggedIn = false;

            ViewBag.UserInfo = "User Not Login!";
            if (User != null)
            {
                ViewBag.UserInfo =
                    "UserId: " + User.UserId + "<br/>" +
                    "Ho Ten: " + User.Name + "<br/>" +
                    "CoSoId: " + User.CoSoId + "<br/>" +
                    "NhanVienId: " + User.NhanVienId + "<br/>" +
                    "Email: " + User.Email + "<br/>" +
                    "Roles: " + String.Join(" ", User.Roles) + "<br/>" +
                    "Function Codes: " + String.Join(" ", User.FunctionCodes) + "<br/>" +
                    "Api Token: " + User.ApiToken + "<br/>";

                ViewBag.isLoggedIn = true;
            }
            return View();
            //return RedirectToAction("list", "nhanvien");
        }
    }
}