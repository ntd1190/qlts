using SongAn.QLTS.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLTS.UI.QLTSMAIN.Controllers
{
    public class LoaiXeController : BaseController
    {

        public ActionResult Index()
        {
            string __VIEW_NAME = "Index";
            return View(__VIEW_NAME);
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