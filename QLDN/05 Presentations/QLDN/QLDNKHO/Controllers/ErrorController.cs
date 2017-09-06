using SongAn.QLDN.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    public class ErrorController : BaseController
    {
        // GET: Error
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AccessDenied()
        {
            return View();
        }
    }
}