/*****************************************************************************
1. Create Date  : 2017.05.08
2. Creator      : Tran Quoc Hung
3. Function     : QLDNMAIN/BangLuong/
4. Description  : MVC Controller Bảng Lương
5. History      : 2017.05.08(Tran Quoc Hung) - Tao moi
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
    /// MVC Controller Bảng Lương
    /// </summary>
    public class BangLuongController : BaseController
    {
        // GET: 
        public ActionResult Index()
        {
            return RedirectToAction("List", "BangLuong");
        }

        [CustomAuthorize(FunctionCodes = "CN0012")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0012");

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