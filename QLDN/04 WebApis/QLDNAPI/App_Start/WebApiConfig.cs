using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace QLDNAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            GlobalConfiguration.Configuration.Formatters.XmlFormatter.SupportedMediaTypes.Clear();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "{project}/{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = RouteParameter.Optional }
            );
        }
    }
}
