using SongAn.QLTS.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace SongAn.QLTS.UI.QLTSMAIN.Controllers
{
    public class GhiGiamController : BaseController
    {
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
        public ActionResult Create()
        {
            string userLogin = LoadUserInfo("CN0023");
            ViewBag.userInfo = userLogin;
            ViewBag.isEdit = 0;
            return View("Edit");
        }
        public ActionResult Edit(int? id)
        {
            if (id == null || id == 0)
            {
                return RedirectToAction("List");
            }
            string userLogin = LoadUserInfo("CN0023");
            ViewBag.userInfo = userLogin;
            ViewBag.id = id;
            ViewBag.isEdit = 1;
            return View();
        }
    }
}