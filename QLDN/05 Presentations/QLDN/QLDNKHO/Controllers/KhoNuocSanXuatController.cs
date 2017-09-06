using SongAn.QLDN.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    public class KhoNuocSanXuatController : BaseController
    {
        // GET: KhoNuocSanXuat
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorize(FunctionCodes = "KHO0012")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("KHO0012");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}