using SongAn.QLTS.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNMAIN.Controllers
{
    [CustomAuthorize(FunctionCodes = "CN0037")]
    public class TraCuuTaiSanController : BaseController
    {
        private string FunctionCode = "CN0037";
        // GET: TaiSan
        public ActionResult Index()
        {
            return RedirectToAction("List");
        }
        public ActionResult List()
        {
            ViewBag.userInfo = LoadUserInfo(FunctionCode);
            return View();
        }
        public ActionResult Create()
        {
            ViewBag.userInfo = LoadUserInfo(FunctionCode);
            return View("Edit");
        }
    }
}