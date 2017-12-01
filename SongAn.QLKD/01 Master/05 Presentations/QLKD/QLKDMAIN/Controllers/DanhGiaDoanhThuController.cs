using SongAn.QLKD.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace SongAn.QLKD.UI.QLKDMAIN.Controllers
{
    public class DanhGiaDoanhThuController : BaseController
    {
        // GET: DanhGiaDoanhThu
        public ActionResult Index()
        {
            return View();
        }
        [CustomAuthorize(FunctionCodes = "KD0015")]
        public ActionResult showView(string viewName, string type)
        {
            type = string.IsNullOrEmpty(type) ? "Html" : type;
            ViewData[type] = true;
            string userLogin = LoadUserInfo("KD0015");
            ViewBag.userInfo = userLogin;
            return PartialView(viewName);
        }
    }
}