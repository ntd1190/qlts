/*****************************************************************************
1. Create Date : 2017.09.12
2. Creator     : NGUYỄN THANH BÌNH
3. Description : ThayDoiThongTinKeKhai
4. History     : 2017.09.12 (NGUYỄN THANH BÌNH) - tạo mới
*****************************************************************************/
using SongAn.QLTS.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNMAIN.Controllers
{
    [CustomAuthorize(FunctionCodes = "CN0027")]
    public class ThayDoiThongTinKeKhaiController : BaseController
    {
        private string FunctionCode = "CN0027";
        // GET: TaiSan
        public ActionResult Index()
        {
            return RedirectToAction("List");
        }
        public ActionResult List()
        {
            ViewBag.userInfo = LoadUserInfo(FunctionCode);
            return View();
        }
        public ActionResult Create()
        {
            ViewBag.userInfo = LoadUserInfo(FunctionCode);
            ViewBag.isEdit = 0;
            return View();
        }
        public ActionResult Edit(int? id)
        {
            if (id == null || id == 0)
            {
                return RedirectToAction("List");
            }
            ViewBag.userInfo = LoadUserInfo(FunctionCode);
            ViewBag.id = id;
            ViewBag.isEdit = 1;
            return View();
        }
    }
}