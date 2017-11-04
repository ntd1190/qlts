using SongAn.QLDN.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    [CustomAuthorize(FunctionCodes = "KHO0023")]
    public class KhoKiemKeController : BaseController
    {
        // GET: KhoKiemKe
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult List()
        {
            string userLogin = LoadUserInfo("KHO0023");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}