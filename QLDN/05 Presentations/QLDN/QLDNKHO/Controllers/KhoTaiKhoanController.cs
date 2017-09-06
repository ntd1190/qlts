using SongAn.QLDN.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    public class KhoTaiKhoanController : BaseController
    {
        // GET: KhoTaiKhoan
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorize(FunctionCodes = "KHO0006")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("KHO0006");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}