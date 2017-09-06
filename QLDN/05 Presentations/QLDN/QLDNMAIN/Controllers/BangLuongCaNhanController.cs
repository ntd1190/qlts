/*****************************************************************************
1. Create Date  : 2017.05.13
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/BangLuongCaNhan/
4. Description  : MVC Controller Bảng Lương cá nhân
5. History      : 2017.05.13 (Tran Quoc Hung) - Tao moi
*****************************************************************************/
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
    /// <summary>
    /// MVC Controller Bảng Lương cá nhân
    /// </summary>
    public class BangLuongCaNhanController : BaseController
    {
        // GET: 
        public ActionResult Index()
        {
            return RedirectToAction("List", "BangLuongCaNhan");
        }

        [CustomAuthorize(FunctionCodes = "CN0019")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0019");

            ViewBag.userInfo = userLogin;

            return View();
        }

        [CustomAuthorize(FunctionCodes = "CN0019")]
        public ActionResult ReportTheoBangLuong()
        {
            string userLogin = LoadUserInfo("CN0019");

            ViewBag.userInfo = userLogin;

            return View();
        }

        [CustomAuthorize(FunctionCodes = "CN0019")]
        public ActionResult ReportTheoCaNhan()
        {
            string userLogin = LoadUserInfo("CN0019");

            ViewBag.userInfo = userLogin;

            return View();
        }
        public ActionResult ChiTiet(int? id)
        {
            ViewBag.id = id;
            string userLogin = LoadUserInfo("CN0019");
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