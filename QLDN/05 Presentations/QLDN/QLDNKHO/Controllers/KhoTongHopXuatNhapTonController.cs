using SongAn.QLDN.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    [CustomAuthorize(FunctionCodes = "KHO0015")]
    public class KhoTongHopXuatNhapTonController : BaseController
    {
        // GET: KhoTongHopXuatNhapTon
        [AllowAnonymous]
        public ActionResult Index()
        {
            return RedirectToAction("List");
        }

        public ActionResult List()
        {
            string userLogin = LoadUserInfo("KHO0015");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}