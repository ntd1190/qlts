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
    public class NguoiDungController : BaseController
    {
        // GET: NguoiDung
        public ActionResult Index()
        {
            string __VIEW_NAME = "Index";
            return View(__VIEW_NAME);
        }
        [CustomAuthorize(FunctionCodes = "CN0024")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0024");
            ViewBag.userInfo = userLogin;
            return View();
        }

        [CustomAuthorize(FunctionCodes = "CN0024")]
        public ActionResult showView(string viewName, string type)
        {
            type = string.IsNullOrEmpty(type) ? "Html" : type;
            ViewData[type] = true;
            string userLogin = LoadUserInfo("CN0024");
            ViewBag.userInfo = userLogin;
            return PartialView(viewName);
        }

        [AllowAnonymous]
        public ActionResult showCombobox(string viewName, string type)
        {
            type = string.IsNullOrEmpty(type) ? "Html" : type;
            ViewData[type] = true;
            return PartialView(viewName);
        }
    }
}