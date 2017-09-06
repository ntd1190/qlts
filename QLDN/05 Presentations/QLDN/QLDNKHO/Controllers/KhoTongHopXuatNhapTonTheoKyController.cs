using SongAn.QLDN.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace SongAn.QLDN.UI.QLDNKHO.Controllers
{
    public class KhoTongHopXuatNhapTonTheoKyController : BaseController
    {
        // GET: KhoTongHopXuatNhapTonTheoKy
        public ActionResult Index()
        {
            return RedirectToAction("List", "KhoTongHopXuatNhapTonTheoKy");
        }

        [CustomAuthorize(FunctionCodes = "KHO0015")]
        public ActionResult List()
        {
            string userLogin = LoadUserInfo("KHO0015");

            ViewBag.userInfo = userLogin;

            return View();
        }

        public ActionResult Edit(int? id, int? type)
        {
            if (id == null || id == 0)
            {
                return RedirectToAction("List");
            }
            string userLogin = LoadUserInfo("KHO0015");
            ViewBag.userInfo = userLogin;
            ViewBag.id = id;
            ViewBag.type = type;
            ViewBag.isEdit = 1;
            return View();
        }

        public ActionResult EditDetail(string id)
        {
            int? idHangHoa = 0;
            int idKy = 0;

            string[] rs = id.Split(Convert.ToChar("_"));
            idHangHoa = Convert.ToInt32(rs[0]);
            idKy = Convert.ToInt32(rs[1]);

            if (idHangHoa == null || idHangHoa == 0)
            {
                return RedirectToAction("List");
            }
            string userLogin = LoadUserInfo("KHO0015");
            ViewBag.userInfo = userLogin;
            ViewBag.id = idHangHoa;
            ViewBag.idKy = idKy;
            return View();
        }
    }
}