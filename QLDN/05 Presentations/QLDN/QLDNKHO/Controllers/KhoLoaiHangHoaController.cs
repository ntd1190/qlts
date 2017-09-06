using SongAn.QLDN.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    [CustomAuthorize(FunctionCodes = "KHO0001")]
    public class KhoLoaiHangHoaController : BaseController
    {
        // GET: KhoNhomHangHoa
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult List()
        {
            string userLogin = LoadUserInfo("KHO0001");

            ViewBag.userInfo = userLogin;

            return View();
        }

        public ActionResult Edit()
        {
            string userLogin = LoadUserInfo("KHO0001");

            ViewBag.userInfo = userLogin;

            return View();
        }

    }
}