using SongAn.QLDN.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    public class KhoImportExcelDauKyController : BaseController
    {
        // GET: ImportExcelDauKy
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorize(FunctionCodes = "KHO0020")]
        public ActionResult List(int? id)
        {
            if (id == 0 || id == null)
            {
                return RedirectToAction("List", "KhoTongHopXuatNhapTonTheoKy");
            }
            string userLogin = LoadUserInfo("KHO0020");

            ViewBag.userInfo = userLogin;
            ViewBag.id = id;

            return View();
        }
    }
}