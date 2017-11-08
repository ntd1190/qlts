/*****************************************************************************
1. Create Date : 2017.08.05
2. Creator     : Nguyen Ngoc Tan
3. Description : Lop nen cho controller chua thong tin user co ban
4. History     : 2017.08.05(Nguyen Ngoc Tan) - Tao moi
*****************************************************************************/
using SongAn.QLKD.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Configuration;

namespace SongAn.QLKD.Util.Common.Identity
{
    public class BaseController : Controller
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (HttpContext.User.Identity.IsAuthenticated == false)
            {
                filterContext.Result = RedirectToAction("Index", "Account");
                return;
            }
            User = (CustomPrincipal)HttpContext.User;
            base.OnActionExecuting(filterContext);
        }
        protected virtual new CustomPrincipal User { get; set; }

        protected string LoadUserInfo(string MaChucNang)
        {
            string returnString = "";
            if (User != null)
            {
                string ConfigUri = ConfigurationManager.AppSettings["issuer"] + ConfigurationManager.AppSettings["configapi"];
                string config = GetConfig(MaChucNang, User.Roles.FirstOrDefault(), User.UserId.ToString(), ConfigUri);


                string dsquyen = "";

                if (!string.IsNullOrEmpty(config))
                {
                    dynamic objConfig = JsonConvert.DeserializeObject(config);

                    dsquyen = objConfig.data.DSQuyenTacVu;
                }

                returnString = JsonConvert.SerializeObject(new
                {
                    ApiToken = User.ApiToken,
                    UserId = User.UserId,
                    Email = User.Email,
                    Name = User.Name,
                    NhanVienId = User.NhanVienId,
                    DsQuyenTacVu = dsquyen
                });
            }

            return returnString;
        }

        public string GetConfig(string MaChucNang, string MaVaiTro, string UserId, string ConfigUri)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(ConfigUri);
                client.DefaultRequestHeaders.Accept
                    .Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var content = new FormUrlEncodedContent(new[]
                {
                        new KeyValuePair<string, string>("MACHUCNANG", MaChucNang),
                        new KeyValuePair<string, string>("MAVAITRO", MaVaiTro),
                        new KeyValuePair<string, string>("USERID", UserId),
                    });
                var response = Task.Run(() => client.PostAsync(string.Empty, content)).Result;
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    return Task.Run(() => response.Content.ReadAsStringAsync()).Result;
                }
                else
                {
                    //return null if unauthenticated
                    return null;
                }
            }
        }
    }
}