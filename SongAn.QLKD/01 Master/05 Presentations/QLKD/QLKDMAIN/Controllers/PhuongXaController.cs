using SongAn.QLKD.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace SongAn.QLKD.UI.QLKDMAIN.Controllers
{
    public class PhuongXaController : BaseController
    {
        // GET: PhuongXa
        public ActionResult Index()
        {
            return View();
        }
        [AllowAnonymous]
        public ActionResult showCombobox(string viewName, string type)
        {
            //ViewBag.userInfo = LoadUserInfo("KD0001");

            type = string.IsNullOrEmpty(type) ? "Html" : type;
            ViewData[type] = true;
            return PartialView(viewName);
        }
    }
}