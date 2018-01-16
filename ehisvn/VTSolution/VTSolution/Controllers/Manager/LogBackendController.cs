using Kendo.Mvc.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VTSolution.Models;
using Kendo.Mvc.Extensions;

using VTSolution.ViewModel.Manager;

namespace VTSolution.Controllers.Manager
{
    [Authorize]
    public class LogBackendController : Controller
    {
        angia_ivmEntities db = null;
        Log_Backend log = new Log_Backend();
        public LogBackendController()
        {
            db = new angia_ivmEntities();
        }
        //
        // GET: /LogBackend/
      
        public ActionResult Index()
        {
            return View();
        }
      
        public ActionResult Delete()
        {
            try
            {
                var entity = db.Log_Backend.ToList();
                foreach (var item in entity)
                {
                    db.Log_Backend.Remove(item);
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "logbackend delete";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return RedirectToAction("Index", "LogBackend");
        }
      
        public ActionResult Log_Read([DataSourceRequest] DataSourceRequest request)
        {
            var respond = db.Log_Backend.ToList().OrderByDescending(t=>t.DateCreate).Select(t => new LogIndexModel()
            {
                Id = t.Id,
                Feature = t.Feature,
                Error = t.ErrorLog,
                Datecreate = t.DateCreate
            });
            return Json(respond.ToDataSourceResult(request));
        }
    }
}