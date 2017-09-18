using SongAn.QLTS.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLTS.UI.QLTSMAIN.Controllers
{
    public class PhuongThucController : BaseController
    {
        public ActionResult Index()
        {
            return RedirectToAction("List");
        }

        public ActionResult List()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult showView(string viewName, string type)
        {
            type = string.IsNullOrEmpty(type) ? "Html" : type;
            ViewData[type] = true;
            return PartialView(viewName);
        }

    }
}