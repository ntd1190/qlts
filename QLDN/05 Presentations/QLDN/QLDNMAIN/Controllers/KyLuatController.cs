﻿using SongAn.QLDN.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace SongAn.QLDN.UI.QLDNMAIN.Controllers
{
    public class KyLuatController : BaseController
    {
        // GET: KhenThuong
        public ActionResult Index()
        {
            string __VIEW_NAME = "Index";
            return View(__VIEW_NAME);
        }

        [CustomAuthorize(FunctionCodes = "CN0017")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0017");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}