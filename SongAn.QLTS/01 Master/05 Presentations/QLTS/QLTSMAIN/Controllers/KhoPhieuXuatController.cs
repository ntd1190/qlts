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
    public class KhoPhieuXuatController : BaseController
    {
        private string FunctionCode = "CN0046";
        public ActionResult Index()
        {
            return RedirectToAction("List");
        }
        [CustomAuthorize(FunctionCodes = "CN0046")]
        public ActionResult List()
        {
            ViewBag.userInfo = LoadUserInfo(FunctionCode);
            return View();
        }
        [CustomAuthorize(FunctionCodes = "CN0046")]
        public ActionResult Edit(int? id)
        {
            if (id == null)
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