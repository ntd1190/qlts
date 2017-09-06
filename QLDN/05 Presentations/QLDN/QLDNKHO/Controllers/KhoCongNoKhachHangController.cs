using SongAn.QLDN.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    [CustomAuthorize(FunctionCodes = "KHO0017")]
    public class KhoCongNoKhachHangController : BaseController
    {
        // GET: KhoNhomHangHoa
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult List()
        {
            string userLogin = LoadUserInfo("KHO0017");

            ViewBag.userInfo = userLogin;

            return View();
        }
        public ActionResult ChiTiet(int? id)
        {
            ViewBag.id = id;
            string userLogin = LoadUserInfo("KHO0017");
            ViewBag.userInfo = userLogin;
            return View();
        }
    }
}