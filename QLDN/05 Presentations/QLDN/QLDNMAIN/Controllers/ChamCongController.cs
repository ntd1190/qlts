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
    public class ChamCongController : BaseController
    {
        // GET: ChamCong
        public ActionResult Index()
        {
            string __VIEW_NAME = "Index";
            return View(__VIEW_NAME);
        }

        [CustomAuthorize(FunctionCodes = "CN0025")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0025");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}