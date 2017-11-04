using SongAn.QLDN.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    public class KhoTonKhoController : BaseController
    {
        public ActionResult Index()
        {
            return RedirectToAction("List", "KhoTonKho");
        }

        [CustomAuthorize(FunctionCodes = "KHO0022")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("KHO0022");

            ViewBag.userInfo = userLogin;

            return View();
        }

        public ActionResult Edit(int? id)
        {
            if (id == null || id == 0)
            {
                return RedirectToAction("List");
            }
            string userLogin = LoadUserInfo("KHO0022");
            ViewBag.userInfo = userLogin;
            ViewBag.id = id;
            return View();
        }
    }
}