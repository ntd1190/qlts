/*****************************************************************************
1. Create Date : 2017.03.30
2. Creator     : Tran Quoc Hung
3. Description : Cai dat filter check quyen tuy bien
4. History     : 2017.03.30(Tran Quoc Hung) - Tao moi
*****************************************************************************/
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace SongAn.QLDN.Util.Common.Identity
{
    public class CustomAuthorizeAttribute : AuthorizeAttribute
    {
        public string RolesConfigKey { get; set; }

        public string FunctionCodes { get; set; }

        protected virtual CustomPrincipal CurrentUser
        {
            get { return HttpContext.Current.User as CustomPrincipal; }
        }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            if (filterContext.HttpContext.Request.IsAuthenticated)
            {
                var authorizedRoles = ConfigurationManager.AppSettings[RolesConfigKey];

                Roles = String.IsNullOrEmpty(Roles) ? authorizedRoles : Roles;

                if (!String.IsNullOrEmpty(Roles))
                {
                    if (!CurrentUser.IsInRole(Roles))
                    {
                        filterContext.Result = new RedirectToRouteResult(new
                        RouteValueDictionary(new { controller = "Error", action = "AccessDenied" }));

                        // base.OnAuthorization(filterContext); //returns to login url
                    }
                }

                if (!String.IsNullOrEmpty(FunctionCodes))
                {
                    if (!CurrentUser.IsInFunction(FunctionCodes))
                    {
                        filterContext.Result = new RedirectToRouteResult(new
                        RouteValueDictionary(new { controller = "Error", action = "AccessDenied" }));

                        // base.OnAuthorization(filterContext); //returns to login url
                    }
                }
            }
            else
            {
                base.OnAuthorization(filterContext); //returns to login url
            }

        }
    }
}