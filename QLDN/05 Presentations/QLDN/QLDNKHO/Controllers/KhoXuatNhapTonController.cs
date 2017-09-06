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
    public class KhoXuatNhapTonController : BaseController
    {
        // GET: KhoXuatNhapTon
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorize(FunctionCodes = "KHO0015")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("KHO0015");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}