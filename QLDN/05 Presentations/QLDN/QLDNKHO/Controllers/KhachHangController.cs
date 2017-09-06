using SongAn.QLDN.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;
namespace SongAn.QLDN.UI.QLDNMAIN.Controllers
{
        [CustomAuthorize(FunctionCodes = "KHO0021")]
    public class KhachHangController : BaseController
    {
        private string FunctionCode = "KHO0021";
        // GET: KhachHang
        public ActionResult Index()
        {
            string __VIEW_NAME = "Index";
            return View(__VIEW_NAME);
        }

        public ActionResult List()
        {
            string userLogin = LoadUserInfo(FunctionCode);

            ViewBag.userInfo = userLogin;

            return View();
        }

    }
}