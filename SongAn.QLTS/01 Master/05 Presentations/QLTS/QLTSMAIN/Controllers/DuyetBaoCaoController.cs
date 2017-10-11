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
    public class DuyetBaoCaoController : BaseController
    {
        // GET: DuyetBaoCao
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorize(FunctionCodes = "CN0041")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0041");

            ViewBag.userInfo = userLogin;

            return View();
        }


    }
}