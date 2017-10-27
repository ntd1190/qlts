using SongAn.QLTS.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace SongAn.QLTS.UI.QLTSMAIN.Controllers
{
    public class KhoTonKhoController : BaseController
    {
        public ActionResult Index()
        {
            string __VIEW_NAME = "Index";
            return View(__VIEW_NAME);
        }

        [CustomAuthorize(FunctionCodes = "CN0045")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0045");

            ViewBag.userInfo = userLogin;

            return View();
        }
        public ActionResult Edit(string id)
        {
            if (id == null)
            {
                return RedirectToAction("List");
            }
            string userLogin = LoadUserInfo("CN0045");
            ViewBag.userInfo = userLogin;
            ViewBag.id = id;
            ViewBag.isEdit = 1;
            return View();
        }
    }
}