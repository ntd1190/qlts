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
    public class NghiPhepController : BaseController
    {
        // GET: NhanVien
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorize(FunctionCodes = "CN0006")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0006");

            ViewBag.userInfo = userLogin;

            return View();
        }

        //[CustomAuthorize(FunctionCodes = "CN0006")]
        public ActionResult Edit()
        {
            return View();
        }
    }
}