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
    public class DeNghiTrangCapController : BaseController
    {
        // GET: DeNghiTrangCap
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorize(FunctionCodes = "CN0019")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0019");

            ViewBag.userInfo = userLogin;

            return View();
        }

        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return RedirectToAction("List");
            }
            string userLogin = LoadUserInfo("CN0019");
            ViewBag.userInfo = userLogin;
            ViewBag.id = id;
            return View();
        }
    }
}