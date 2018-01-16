
//using VTSolution.Helper;
using VTSolution.Models;
using System;
using System.Linq;
using System.Web;
using System.Web.Security;
using VTSolution;

namespace VTSolution.App_Start
{
    public class WebContext
    {
        public static WebContext Current
        {
            get
            {

                return ThreadSafe.Instance;
            }
            set
            {

                ThreadSafe.Instance = value;
            }
        }
        private class ThreadSafe
        {
            static ThreadSafe() { }
            internal static WebContext Instance = new WebContext();
        }

        //public Account Admin
        //{
        //    get
        //    {
        //        if (HttpContext.Current.Session[DataKeys.S_AUSER] != null)
        //        {
        //            return HttpContext.Current.Session[DataKeys.S_AUSER] as Account;
        //        }
        //        else
        //        {
        //            if (HttpContext.Current.User.Identity.Name == null) return null;
        //            using (var db = new EscortEntities())
        //            {
        //                var username = HttpContext.Current.User.Identity.Name;
        //                var user =
        //                    db.Accounts.SingleOrDefault(
        //                        t =>
        //                            t.Username == username);
        //                HttpContext.Current.Session[DataKeys.S_AUSER] = user;
        //                return HttpContext.Current.Session[DataKeys.S_AUSER] as Account;

        //            }
        //        }
        //    }
        //    set
        //    {
        //        HttpContext.Current.Session[DataKeys.S_AUSER] = value;

        //    }
        //}
    }
}