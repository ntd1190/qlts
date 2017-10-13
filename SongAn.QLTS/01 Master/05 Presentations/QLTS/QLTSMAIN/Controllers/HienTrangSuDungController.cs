using SongAn.QLTS.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLTS.UI.QLTSMAIN.Controllers
{
    public class HienTrangSuDungController : BaseController
    {
        private string FunctionCode = "CN0012";

        [CustomAuthorize(FunctionCodes = "CN0012")]
        public ActionResult Index()
        {
            string __VIEW_NAME = "Index";
            return View(__VIEW_NAME);
        }

        [CustomAuthorize(FunctionCodes = "CN0012")]
        public ActionResult List()
        {
            ViewBag.userInfo = LoadUserInfo(FunctionCode);
            return View();
        }
        [AllowAnonymous]
        public ActionResult showView(string viewName, string type)
        {
            ViewBag.userInfo = LoadUserInfo(FunctionCode);

            type = string.IsNullOrEmpty(type) ? "Html" : type;
            ViewData[type] = true;
            return PartialView(viewName);
        }
    }
}