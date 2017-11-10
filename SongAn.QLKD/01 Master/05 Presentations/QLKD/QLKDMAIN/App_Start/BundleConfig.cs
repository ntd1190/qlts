using System.Web;
using System.Web.Optimization;

namespace SongAn.QLKD.UI.QLKDMAIN
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
                 bundles.Add(new ScriptBundle("~/bundles/javascript").Include(
                        "~/lib/modernizr/modernizr-*",
                        "~/lib/moment/moment.min.js",
                        "~/lib/moment/vi.js",
                     
                        "~/lib/jquery/jquery-{version}.js",
                        "~/lib/jquery-ui/jquery-ui.min.js",
                        "~/lib/jQuery-Mask-Plugin-master/jquery.mask.min.js",
                        "~/lib/timepicki/jquery.datetimepicker.full.min.js",
                        "~/lib/bootstrap/js/bootstrap.js",

                        "~/lib/angular/angular.js",
                        "~/lib/angular/angular-sanitize.min.js",
                        "~/lib/angular/angular-filter.js",
                        "~/lib/angular-ui/angular-ui-router.min.js",
                        "~/lib/angular-smart-table/smart-table.min.js",
                        "~/lib/Select/Select.js"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/CustomAngular").IncludeDirectory(
                         "~/Scripts/angular/", "*.js", true
                         ));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.


            bundles.Add(new StyleBundle("~/bundles/css").Include(
                        "~/lib/bootstrap/css/bootstrap.css",
                        "~/lib/font-awesome/css/font-awesome.min.css",
                        "~/lib/timepicki/jquery.datetimepicker.min.css",
                        "~/lib/sb-admin/css/sb-admin-2.min.css",
                        "~/lib/Select/Select.css"
                        ));

            bundles.Add(new StyleBundle("~/bundles/css/site").Include(
                        "~/Content/Site.css"
                        ));
        }
    }
}