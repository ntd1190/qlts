using SongAn.QLKD.Util.Common.Identity;
using System.Web.Mvc;

namespace SongAn.QLKD.UI.QLKDMAIN.Controllers
{
    public class HopDongController : BaseController
    {
        [CustomAuthorize(FunctionCodes = "KD0010")]
        public ActionResult showView(string viewName, string type)
        {
            ViewBag.userInfo = LoadUserInfo("KD0010");

            type = string.IsNullOrEmpty(type) ? "Html" : type;
            ViewData[type] = true;
            return PartialView(viewName);
        }

        [AllowAnonymous]
        public ActionResult showCombobox(string viewName, string type)
        {
            ViewBag.userInfo = LoadUserInfo("KD0010");

            type = string.IsNullOrEmpty(type) ? "Html" : type;
            ViewData[type] = true;
            return PartialView(viewName);
        }
    }
}