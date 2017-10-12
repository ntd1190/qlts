using SongAn.QLTS.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNMAIN.Controllers
{
    public class BaoCaoKeKhaiController : BaseController
    {
        private string FunctionCode = "CN0042";
        [CustomAuthorize(FunctionCodes = "CN0042")]
        public ActionResult Index(int? id)
        {
            ViewBag.userInfo = LoadUserInfo(FunctionCode);
            return View();
        }

    }
}