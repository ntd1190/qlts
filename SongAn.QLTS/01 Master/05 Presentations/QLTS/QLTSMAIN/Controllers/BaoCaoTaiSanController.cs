using SongAn.QLTS.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNMAIN.Controllers
{
    public class BaoCaoTaiSanController : BaseController
    {
        private string FunctionCode = "CN0052";
        public ActionResult Index(int? id)
        {
            return RedirectToAction("List");
        }
        [CustomAuthorize(FunctionCodes = "CN0052")]
        public ActionResult List(int? id)
        {
            ViewBag.userInfo = LoadUserInfo(FunctionCode);
            return View();
        }
    }
}