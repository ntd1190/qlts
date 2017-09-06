using SongAn.QLDN.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    [CustomAuthorize(FunctionCodes = "KHO0014")]
    public class KhoTheKhoController : BaseController
    {
        // GET: KhoNhomHangHoa
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("KHO0014");
            ViewBag.id = 0;
            ViewBag.userInfo = userLogin;
            return View();
        }
        public ActionResult Chitiet(int? id, string dt)
        {
            if (id == null || id == 0)
            {
                return RedirectToAction("List");
            }
            if(dt == null || dt == "")
            {
                return RedirectToAction("List");
            }
            string userLogin = LoadUserInfo("KHO0014");
            ViewBag.userInfo = userLogin;
            ViewBag.id = id;
            ViewBag.dt = dt;
            return View("List");
        }

        public ActionResult ChitietXT(int? id, string dtF, string dt)
        {
            if (id == null || id == 0)
            {
                return RedirectToAction("List");
            }
            if (dt == null || dt == "")
            {
                return RedirectToAction("List");
            }
            if (dtF == null || dtF == "")
            {
                return RedirectToAction("List");
            }
            string userLogin = LoadUserInfo("KHO0014");
            ViewBag.userInfo = userLogin;
            ViewBag.id = id;
            ViewBag.dt = dt;
            ViewBag.dtFrom = dtF;
            return View("List");
        }
    }
}