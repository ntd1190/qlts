using SongAn.QLDN.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNMAIN.Controllers
{
    [CustomAuthorize(FunctionCodes = "CN0028")]
    public class ChiNhanhController : BaseController
    {
        // GET: ChiNhanh
        public ActionResult Index()
        {
            return RedirectToAction("List");
        }

        public ActionResult List()
        {
            string userLogin = LoadUserInfo("CN0028");

            ViewBag.userInfo = userLogin;

            return View();
        }
    }
}