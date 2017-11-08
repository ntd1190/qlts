using SongAn.QLKD.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLKD.UI.QLKDMAIN.Controllers
{
    [CustomAuthorize(FunctionCodes = "CN0001")]
    public class NhanVienController : BaseController
    {
        // GET: NhanVien
        [AllowAnonymous]
        public ActionResult Index()
        {
            return RedirectToAction("list");
        }

        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0001");
            ViewBag.userInfo = userLogin;
            return View();
        }

        public ActionResult Create()
        {
            string userLogin = LoadUserInfo("CN0001");
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

            string userLogin = LoadUserInfo("CN0001");
            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}