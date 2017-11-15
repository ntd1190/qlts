using Newtonsoft.Json;
using SongAn.QLKD.Util.Common.Helper;
using SongAn.QLKD.Util.Common.Identity;
using System.IO;
using System.Net;
using System.Web.Mvc;

namespace SongAn.QLKD.UI.QLKDMAIN.Controllers
{
    public class UploadController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string Files()
        {
            dynamic result = new System.Dynamic.ExpandoObject();
            var httpRequest = HttpContext.Request;

            var dir = httpRequest.Form["path"];
            var path = Path.Combine(HttpContext.Server.MapPath("~/Content/Upload/"), dir);
            var fileName = httpRequest.Form["fileName"];
            var filePath = Path.Combine(path, fileName);

            // TODO kiểm tra thư mục, tạo thư mục nếu chưa có
            if (Directory.Exists(path) == false)
            {
                Directory.CreateDirectory(path);
            }


            if (httpRequest.Files.Count > 0)
            {
                var postedFile = httpRequest.Files[0];
                postedFile.SaveAs(filePath);

                result.data = fileName;
                return JsonConvert.SerializeObject(result);
            }
            else
            {
                return JsonConvert.SerializeObject(ActionHelper.returnActionError(HttpStatusCode.BadRequest, "error"));
            }
        }

    }
}