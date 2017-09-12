using SongAn.QLTS.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNMAIN.Controllers
{
    [CustomAuthorize(FunctionCodes = "CN0027")]
    public class ThayDoiThongTinTaiSanController : BaseController
    {
        private string FunctionCode = "CN0027";
        // GET: TaiSan
        public ActionResult Index()
        {
            return RedirectToAction("List", "TaiSan");
        }

        public ActionResult Edit(int? id)
        {
            if (id == null || id == 0)
            {
                return RedirectToAction("List", "TaiSan");
            }
            ViewBag.userInfo = LoadUserInfo(FunctionCode);
            ViewBag.id = id;
            ViewBag.isEdit = 1;
            return View();
        }
    }
}