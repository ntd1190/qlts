using SongAn.QLTS.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNMAIN.Controllers
{
    public class TaiSanController : BaseController
    {
        private string FunctionCode = "CN0022";
        // GET: TaiSan
        [CustomAuthorize(FunctionCodes = "CN0022")]
        public ActionResult Index()
        {
            return RedirectToAction("List");
        }
        [CustomAuthorize(FunctionCodes = "CN0022")]
        public ActionResult List()
        {
            ViewBag.userInfo = LoadUserInfo(FunctionCode);
            return View();
        }
        [CustomAuthorize(FunctionCodes = "CN0022")]
        public ActionResult Create()
        {
            ViewBag.userInfo = LoadUserInfo(FunctionCode);
            return View("Edit");
        }

        [CustomAuthorize(FunctionCodes = "CN0022")]
        public ActionResult Edit(int? id)
        {
            if (id == null || id == 0)
            {
                return RedirectToAction("List");
            }
            ViewBag.userInfo = LoadUserInfo(FunctionCode);
            ViewBag.id = id;
            ViewBag.isEdit = 1;
            return View();
        }

        [AllowAnonymous]
        public ActionResult showView(string viewName, string type)
        {
            type = string.IsNullOrEmpty(type) ? "Html" : type;
            ViewData[type] = true;
            return PartialView(viewName);
        }
    }
}