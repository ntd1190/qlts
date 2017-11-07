using Newtonsoft.Json;
using SongAn.QLTS.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLTS.UI.QLTSMAIN.Controllers
{
    public class HomeController : BaseController
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            ViewBag.userInfo = LoadUserInfo("");
            return View();
        }
    }
}