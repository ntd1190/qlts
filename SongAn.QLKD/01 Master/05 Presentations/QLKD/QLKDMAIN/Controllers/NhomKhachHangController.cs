﻿using SongAn.QLKD.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace SongAn.QLKD.UI.QLKDMAIN.Controllers
{
    public class NhomKhachHangController : BaseController
    {
        // GET: NhomKhachHang
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorize(FunctionCodes = "KD0001")]
        public ActionResult showView(string viewName, string type)
        {
            type = string.IsNullOrEmpty(type) ? "Html" : type;
            ViewData[type] = true;
            string userLogin = LoadUserInfo("KD0001");
            ViewBag.userInfo = userLogin;
            return PartialView(viewName);
        }

        [AllowAnonymous]
        public ActionResult showCombobox(string viewName, string type)
        {
            ViewBag.userInfo = LoadUserInfo("KD0001");

            type = string.IsNullOrEmpty(type) ? "Html" : type;
            ViewData[type] = true;
            return PartialView(viewName);
        }
    }
}