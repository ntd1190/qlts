
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;
using SongAn.QLKD.Util.Common.Identity;

namespace SongAn.QLKD.UI.QLKDMAIN.Controllers
{
    public class PhanQuyenController : BaseController
    {
        // GET: PhanQuyen
        public ActionResult Index()
        {
            string __VIEW_NAME = "Index";
            return View(__VIEW_NAME);
        }

        [CustomAuthorize(FunctionCodes = "CN0018")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0018");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}