using SongAn.QLDN.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNMAIN.Controllers
{
    [CustomAuthorize(FunctionCodes = "CN0007")]
    public class PhieuCongTacController : BaseController
    {
        // GET: PhieuCongTac
        [AllowAnonymous]
        public ActionResult Index()
        {
            return RedirectToAction("list");
        }

        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0007");
            ViewBag.userInfo = userLogin;
            return View();
        }

        public ActionResult Create()
        {
            string userLogin = LoadUserInfo("CN0007");
            ViewBag.userInfo = userLogin;
            return View("Edit");
        }

        public ActionResult Edit(int? id)
        {
            if (id == null || id < 1)
            {
                return RedirectToAction("List");
            }
            ViewBag.id = id;
            string userLogin = LoadUserInfo("CN0007");
            ViewBag.userInfo = userLogin;
            return View();
        }

        public ActionResult Duyet(int? id)
        {
            if (id == null || id < 1)
            {
                return RedirectToAction("Duyet");
            }
            ViewBag.id = id;
            string userLogin = LoadUserInfo("CN0007");
            ViewBag.userInfo = userLogin;
            return View();
        }
    }
}