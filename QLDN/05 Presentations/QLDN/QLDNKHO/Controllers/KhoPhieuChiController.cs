using SongAn.QLDN.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    [CustomAuthorize(FunctionCodes = "KHO0008")]
    public class KhoPhieuChiController : BaseController
    {
        // GET: KhoNhomPhieuChi
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult List()
        {
            string userLogin = LoadUserInfo("KHO0008");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}