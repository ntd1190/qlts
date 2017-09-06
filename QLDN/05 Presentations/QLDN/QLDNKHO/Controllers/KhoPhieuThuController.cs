using SongAn.QLDN.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    [CustomAuthorize(FunctionCodes = "KHO0007")]
    public class KhoPhieuThuController : BaseController
    {
        // GET: KhoNhomPhieuThu
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult List()
        {
            string userLogin = LoadUserInfo("KHO0007");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}