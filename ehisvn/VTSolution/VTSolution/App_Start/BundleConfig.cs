using System.Web;
using System.Web.Optimization;

namespace VTSolution
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/plugins/js/Script_ver01.js",
                      "~/plugins/js/myapp.min.js",
                      "~/Scripts/toastr.js",
                       "~/plugins/js/viewportchecker.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                       "~/Content/style.css",
                        "~/Content/setting.css",
                         "~/Content/Site.css",
                         "~/Content/toastr.css",
                          "~/plugins/css/style.css",
                      "~/plugins/css/stylemin.css",
                      "~/plugins/css/animate.css",
                      "~/plugin/css/bootstrap/css/owl.carousel.css",
                      "~/plugins/css/ultimate.min.css",
                      "~/Content/site.css"));
        }
    }
}
