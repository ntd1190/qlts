using SongAn.QLDN.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    [CustomAuthorize(FunctionCodes = "KHO0004")]
    public class KhoPhieuNhapController : BaseController
    {
        // GET: KhoPhieuNhapKho
        public ActionResult Index()
        {
            return RedirectToAction("List");
        }

        public ActionResult List()
        {
            string userLogin = LoadUserInfo("KHO0004");
            ViewBag.userInfo = userLogin;
            return View();
        }
        public ActionResult Create()
        {
            string userLogin = LoadUserInfo("KHO0004");
            ViewBag.userInfo = userLogin;
            ViewBag.isEdit = 0;
            return View("Edit");
        }
        public ActionResult Edit(int? id)
        {
            if (id == null || id == 0)
            {
                return RedirectToAction("List");
            }
            string userLogin = LoadUserInfo("KHO0004");
            ViewBag.userInfo = userLogin;
            ViewBag.id = id;
            ViewBag.isEdit = 1;
            return View();
        }
    }
}