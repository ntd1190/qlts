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
    public class DuyetMuaController : BaseController
    {
        // GET: DuyetMua
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorize(FunctionCodes = "CN0030")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0030");

            ViewBag.userInfo = userLogin;

            return View();
        }


    }
}