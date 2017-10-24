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
    public class BaoCaoNhapXuatTonController : BaseController
    {
        // GET: BaoCaoNhapXuatTon
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorize(FunctionCodes = "CN0047")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0047");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}