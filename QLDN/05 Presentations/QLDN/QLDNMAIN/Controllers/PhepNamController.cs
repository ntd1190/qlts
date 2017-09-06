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
    public class PhepNamController : BaseController
    {
        public ActionResult Index()
        {
            string __VIEW_NAME = "Index";
            return View(__VIEW_NAME);
        }

        [CustomAuthorize(FunctionCodes = "CN0029")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0029");

            ViewBag.userInfo = userLogin;

            return View();
        }

        public ActionResult Edit(int? id, string nbd, string nkt)
        {
            if (id == null || id == 0)
            {
                return RedirectToAction("List");
            }
            string userLogin = LoadUserInfo("CN0029");
            ViewBag.userInfo = userLogin;
            ViewBag.id = id;
            ViewBag.nbd = nbd;
            ViewBag.nkt = nkt;

            return View();
        }
    }
}