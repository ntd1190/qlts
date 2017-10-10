using SongAn.QLTS.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace SongAn.QLDN.UI.QLDNMAIN.Controllers
{
    public class ChotSoLieuNamController : BaseController
    {
        // GET: ChotSoLieuNam
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorize(FunctionCodes = "CN0040")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0040");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}