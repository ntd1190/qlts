using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace VTSolution
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            MvcHandler.DisableMvcResponseHeader = true;
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
        protected void Application_AcquireRequestState(object sender, EventArgs e)
        {
            var langCookie = HttpContext.Current.Request.Cookies["lang"];
            if (langCookie != null)
            {
                var ci = new CultureInfo(langCookie.Value);
                //Checking first if there is no value in session 
                //and set default language 
                //this can happen for first user's request
                if (ci == null)
                {
                    //Sets default culture to english invariant
                    string langName = "vi-VN";

                    //Try to get values from Accept lang HTTP header
                    if (HttpContext.Current.Request.UserLanguages != null && HttpContext.Current.Request.UserLanguages.Length != 0)
                    {
                        //Gets accepted list 
                        langName = HttpContext.Current.Request.UserLanguages[0].Substring(0, 2);
                    }

                    langCookie = new HttpCookie("lang", langName)
                    {
                        HttpOnly = true
                    };


                    HttpContext.Current.Response.AppendCookie(langCookie);
                }

                //Finally setting culture for each request
                Thread.CurrentThread.CurrentUICulture = ci;
                Thread.CurrentThread.CurrentCulture = ci;

                //The line below creates issue when using default culture values for other
                //cultures for ex: NumericSepratore.
                //Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(ci.Name);
            }
        }
        protected void Application_BeginRequest(object sender, EventArgs ev)
        {
            //string FromHomeURL = "http://www.ehis.vn";
            //string ToHomeURL = "http://ehis.vn";

            //if (HttpContext.Current.Request.Url.ToString().ToLower().Contains(FromHomeURL))
            //{
            //    HttpContext.Current.Response.Status = "301 Moved Permanently";
            //    HttpContext.Current.Response.AddHeader("Location",
            //    Request.Url.ToString().ToLower().Replace(FromHomeURL, ToHomeURL));
            //}
        }
    }
}
