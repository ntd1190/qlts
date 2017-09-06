using SongAn.QLDN.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    [CustomAuthorize(FunctionCodes = "KHO0018")]
    public class KhoDuyetPhieuController : BaseController
    {
        // GET: KhoDuyetPhieuKho
        public ActionResult Index()
        {
            return RedirectToAction("List");
        }

        public ActionResult List()
        {
            string userLogin = LoadUserInfo("KHO0018");
            ViewBag.userInfo = userLogin;
            return View();
        }
       
    }
}