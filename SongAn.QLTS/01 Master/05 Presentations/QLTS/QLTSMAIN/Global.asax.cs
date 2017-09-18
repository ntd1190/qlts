using Newtonsoft.Json;
using SongAn.QLTS.Util.Common.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;

namespace QLTSMAIN
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }

        protected void Application_PostAuthenticateRequest(Object sender, EventArgs e)
        {
            HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
            if (authCookie != null)
            {

                FormsAuthenticationTicket authTicket = FormsAuthentication.Decrypt(authCookie.Value);

                CustomPrincipalSerializeModel serializeModel = JsonConvert.DeserializeObject<CustomPrincipalSerializeModel>(authTicket.UserData);
                CustomPrincipal newUser = new CustomPrincipal(authTicket.Name);

                newUser.UserId = serializeModel.UserId;
                newUser.Name = serializeModel.Name;
                newUser.CoSoId = serializeModel.CoSoId;
                newUser.NhanVienId = serializeModel.NhanVienId;
                newUser.Email = serializeModel.Email;
                newUser.Roles = serializeModel.Roles;
                newUser.ApiToken = serializeModel.ApiToken;
                newUser.FunctionCodes = serializeModel.FunctionCodes;

                HttpContext.Current.User = newUser;
            }

        }
    
    }
}
