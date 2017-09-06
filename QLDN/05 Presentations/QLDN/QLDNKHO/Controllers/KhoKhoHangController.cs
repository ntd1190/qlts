using SongAn.QLDN.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    [CustomAuthorize(FunctionCodes = "KHO0003")]
    public class KhoKhoHangController : BaseController
    {
        // GET: KhoNhomHangHoa
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult List()
        {
            string userLogin = LoadUserInfo("KHO0003");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}