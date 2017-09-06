using SongAn.QLDN.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNMAIN.Controllers
{
    [CustomAuthorize(FunctionCodes = "KHO0019")]
    public class KhoPhieuBaoHanhController : BaseController
    {
        private string FunctionCode = "KHO0019";
        // GET: ChiNhanh
        public ActionResult Index()
        {
            return RedirectToAction("List");
        }

        public ActionResult List()
        {
            string userLogin = LoadUserInfo(FunctionCode);

            ViewBag.userInfo = userLogin;
            return View();
        }
        public ActionResult Create()
        {
            string userLogin = LoadUserInfo(FunctionCode);
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
            string userLogin = LoadUserInfo(FunctionCode);
            ViewBag.userInfo = userLogin;
            ViewBag.id = id;
            ViewBag.isEdit = 1;
            return View();
        }
    }
}