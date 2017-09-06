using SongAn.QLDN.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    public class KhoNhomHangHoaController : BaseController
    {
        // GET: KhoNhomHangHoa
        public ActionResult Index()
        {
            return View();
        }

        [CustomAuthorize(FunctionCodes = "KHO0011")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("KHO0011");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}