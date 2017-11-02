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
    public class BaoCaoCongKhaiController : BaseController
    {
        // GET: BaoCaoCongKhai
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorize(FunctionCodes = "CN0053")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0053");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}