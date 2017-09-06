using SongAn.QLDN.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace SongAn.QLDN.UI.QLDNMAIN.Controllers
{
    public class CongViecController : BaseController
    {
        // GET: CongViec
        public ActionResult Index()
        {
            string __VIEW_NAME = "Index";
            return View(__VIEW_NAME);
        }

        [CustomAuthorize(FunctionCodes = "CN0021")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0021");

            ViewBag.userInfo = userLogin;

            return View();
        }
        [CustomAuthorize(FunctionCodes = "CN0021")]
        public ActionResult BaoCao()
        {
            string userLogin = LoadUserInfo("CN0021");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}