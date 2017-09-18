using Newtonsoft.Json;
using SongAn.QLTS.UI.QLTSMAIN.Providers;
using SongAn.QLTS.UI.QLTSMAIN.ViewModels;
using SongAn.QLTS.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace SongAn.QLTS.UI.QLTSMAIN.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Index()
        {
            var model = new LoginViewModel();
            return View(model);
        }

        [HttpPost]
        public async Task<ActionResult> Index(LoginViewModel model, string returnUrl = "")
        {
            if (ModelState.IsValid)
            {
                string tokenuri = ConfigurationManager.AppSettings["issuer"] + ConfigurationManager.AppSettings["endpoint"];
                string clientid = ConfigurationManager.AppSettings["audience"];

                JwtProvider jwtProvider = JwtProvider.Create(tokenuri);

                string token = await jwtProvider.GetTokenAsync(model.Username, model.Password, clientid, "");

                IdentityUser user = null;

                string errorMessage = "Có lỗi xảy ra trong quá trình đăng nhập, xin liên hệ ban quản trị!";


                if (token != null)
                {
                    dynamic objToken = JsonConvert.DeserializeObject(token);
                    if (objToken.error == null)
                    {
                        //decode payload
                        dynamic payload = jwtProvider.DecodePayload(token);

                        string apitoken = objToken.access_token;

                        user = new IdentityUser();

                        user.UserId = payload.unique_name;
                        user.Email = payload.email;
                        user.Name = payload.name;
                        user.NhanVienId = payload.nhanvienid;
                        user.CoSoId = payload.CoSoId;
                        user.Roles = payload.role.ToObject<string[]>();
                        user.ApiToken = apitoken;
                        user.FunctionCodes = payload.functioncode.ToObject<string[]>();
                    }
                    else
                    {
                        errorMessage = objToken.error_description;
                    }
                }

                if (user != null)
                {
                    CustomPrincipalSerializeModel serializeModel = new CustomPrincipalSerializeModel();
                    serializeModel.UserId = user.UserId;
                    serializeModel.Name = user.Name;
                    serializeModel.CoSoId = user.CoSoId;
                    serializeModel.NhanVienId = user.NhanVienId;
                    serializeModel.Email = user.Email;
                    serializeModel.Roles = user.Roles;
                    serializeModel.ApiToken = "";
                    serializeModel.FunctionCodes = user.FunctionCodes;

                    var FormsAuthenticationExpireTimeSpan = 30.0;

                    double.TryParse(ConfigurationManager.AppSettings["FormsAuthenticationExpireTimeSpan"], out FormsAuthenticationExpireTimeSpan);

                    string userData = JsonConvert.SerializeObject(serializeModel);
                    FormsAuthenticationTicket authTicket = new FormsAuthenticationTicket(
                    1,
                    user.Email,
                    DateTime.Now,
                    DateTime.Now.AddMinutes(FormsAuthenticationExpireTimeSpan),
                    false, //pass here true, if you want to implement remember me functionality
                    userData);

                    string encTicket = FormsAuthentication.Encrypt(authTicket);
                    HttpCookie faCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
                    Response.Cookies.Add(faCookie);

                    ViewBag.userInfo = userData;
                    ViewBag.returnUrl = returnUrl;

                    if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
                    {
                        return Redirect(returnUrl);
                    }
                    else
                    {
                        return RedirectToAction("Index", "Home");
                    }
                }

                ModelState.AddModelError("", errorMessage);
            }

            return View(model);
        }

        [AllowAnonymous]
        public ActionResult LogOut()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Index", "Account", null);
        }
    }
}
