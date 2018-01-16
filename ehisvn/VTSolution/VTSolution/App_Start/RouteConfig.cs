using Canonicalize;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace VTSolution
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            RouteTable.Routes.AppendTrailingSlash = true;
            // Ensure that all URL's are lower-case.
            RouteTable.Routes.LowercaseUrls = true;
            routes.MapRoute(
                name: "bieumau",
                url: "Bieu-Mau-Song-An",
                   defaults: new { controller = "Home", action = "BieuMau" },
                 namespaces: new string[] { "VTSolution.Controllers" }
              );
            routes.MapRoute(
                name: "dieukhoan",
                url: "Dieu-Khoan-Su-Dung",
                   defaults: new { controller = "Home", action = "DieuKhoan" },
                 namespaces: new string[] { "VTSolution.Controllers" }
              );
            routes.MapRoute(
             name: "Redirect",
             url: "Redirect",
                defaults: new { controller = "Home", action = "GoRedirect" },
              namespaces: new string[] { "VTSolution.Controllers" }
           );
            RouteTable.Routes.LowercaseUrls = true;
            routes.MapRoute(
                name: "huongnghiep",
                url: "Huong-Nghiep",
                   defaults: new { controller = "Home", action = "HuongNghiep" },
                 namespaces: new string[] { "VTSolution.Controllers" }
              );
            routes.MapRoute(
            name: "lienhe",
            url: "Lien-He-Song-An",
               defaults: new { controller = "Home", action = "Contact" },
             namespaces: new string[] { "VTSolution.Controllers" }
          );
            routes.MapRoute(
           name: "tuyendung",
           url: "Tuyen-Dung-Song-An",
              defaults: new { controller = "ViewProduct", action = "Recruited" },
            namespaces: new string[] { "VTSolution.Controllers" }
         );
            routes.MapRoute(
         name: "hotro",
         url: "Ho-Tro-Song-An",
            defaults: new { controller = "Support", action = "Home" },
          namespaces: new string[] { "VTSolution.Controllers" }
       );

            routes.MapRoute(
         name: "khacbiet",
         url: "Khac-Biet-Song-An",
            defaults: new { controller = "Home", action = "Diffrent" },
          namespaces: new string[] { "VTSolution.Controllers" }
       );

            //routes.MapRoute(
            //    name: "trangchu",
            //    url: "Song-An/Trang-Chu",
            //       defaults: new { controller = "Home", action = "Index" },
            //     namespaces: new string[] { "VTSolution.Controllers" }
            //  );
            routes.MapRoute(
              name: "gioithieu",
              url: "Gioi-Thieu-Ve-Song-An-{id}",
                 defaults: new { controller = "Home", action = "Introduce", id = UrlParameter.Optional },
               namespaces: new string[] { "VTSolution.Controllers" }
            );
            routes.MapRoute(
            name: "languge",
            url: "ngon-ngu-{lang}",
               defaults: new { controller = "Home", action = "ChangeLanguage" },
             namespaces: new string[] { "VTSolution.Controllers" }
          );
            routes.MapRoute(
            name: "sanpham",
            url: "Phan-Mem-Quan-Ly-Benh-Vien",
               defaults: new { controller = "Home", action = "Products" },
             namespaces: new string[] { "VTSolution.Controllers" }
          );
            routes.MapRoute(
          name: "hinhanh",
          url: "Hinh-Anh-Ve-Song-An",
             defaults: new { controller = "ViewProduct", action = "Album" },
           namespaces: new string[] { "VTSolution.Controllers" }
        );
            routes.MapRoute(
        name: "hinhanhdetail",
        url: "Hinh-Anh-Ve-Song-An-{id}",
           defaults: new { controller = "ViewProduct", action = "Album1", id = UrlParameter.Optional },
         namespaces: new string[] { "VTSolution.Controllers" }
      );
            routes.MapRoute(
             name: "duan",
             url: "Du-An-Cua-Song-An",
                defaults: new { controller = "ViewProduct", action = "ProductIndex" },
              namespaces: new string[] { "VTSolution.Controllers" }
           );

            routes.MapRoute(
          name: "khachhang",
          url: "Khach-Hang-Song-An",
             defaults: new { controller = "ViewProduct", action = "Customers" },
           namespaces: new string[] { "VTSolution.Controllers" }
        );
            routes.MapRoute(
           name: "tintuc",
           url: "Song-An-Tin-Tuc-Su-Kien",
              defaults: new { controller = "Home", action = "News" },
            namespaces: new string[] { "VTSolution.Controllers" }
         );
            routes.MapRoute(
         name: "tintucchitiet",
         url: "song-an-tin-tuc-su-kien-{title}-{id}",
            defaults: new { controller = "ViewNews", action = "NewsDetail" },
          namespaces: new string[] { "VTSolution.Controllers" }
       );

            routes.MapRoute(
         name: "tuyendungsongan",
         url: "tuyen-dung-{title}-{id}",
            defaults: new { controller = "Water", action = "RecruitmentDetail" },
          namespaces: new string[] { "VTSolution.Controllers" }
       );
            routes.MapRoute(
            name: "duanchitiet",
            url: "{titleduan}",
               defaults: new { controller = "ViewProduct", action = "ProductDetail" },
             namespaces: new string[] { "VTSolution.Controllers" }
          );
            //tren default
            routes.MapRoute(
                name: "Default",
                url: "{lang}/{controller}/{action}/{id}",
                defaults: new { lang = "vi-VN", controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            //foreach (var r in from Route r in routes where !(r.RouteHandler is SingleCultureMvcRouteHandler) select r)
            //{

            //    r.RouteHandler = new MultiCultureMvcRouteHandler();
            //    r.Url = "{culture}/" + r.Url;
            //    //Adding default culture 
            //    if (r.Defaults == null)
            //    {
            //        r.Defaults = new RouteValueDictionary();
            //    }
            //    r.Defaults.Add("culture", Culture.vi.ToString());

            //    //Adding constraint for culture param
            //    if (r.Constraints == null)
            //    {
            //        r.Constraints = new RouteValueDictionary();
            //    }
            //    r.Constraints.Add("culture", new CultureConstraint(Culture.en.ToString(),
            //                                                       Culture.vi.ToString()));

            //}
        }

    }
}
