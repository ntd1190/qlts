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
    public class AboutUsController : Controller
    {
        angia_ivmEntities db = null;
        Log_Backend log = new Log_Backend();
        public AboutUsController()
        {
            db = new angia_ivmEntities();
        }
      
        public ActionResult Index()
        {
            return View();
        }
      
        public ActionResult Create(int id = 0)
        {
            var model = new AboutU();
            if (id != 0)
            {
                model = db.AboutUs.SingleOrDefault(t => t.Id == id);
            }
            return View(model);

        }
        [HttpPost]
      
        public ActionResult Create([DataSourceRequest] DataSourceRequest request, AboutU model)
        {
            try
            {
                if (model != null)
                {
                    // update
                    if (model.Id != 0)
                    {
                        db.Entry(model).State = System.Data.EntityState.Modified;
                        db.SaveChanges();
                    }

                }
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "AboutUs update";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return RedirectToAction("Index", "AboutUs");
        }
      
        public ActionResult AboutUs_Read([DataSourceRequest] DataSourceRequest request)
        {
            var respond = db.AboutUs.ToList().Select(t => new AboutUsIndexModel()
            {
                Id = t.Id,
                Vi_Name = t.Vi_Company,
                Email = t.Email,
                HotLine = t.HotLine,
                Fax = t.Fax
            });
            return Json(respond.ToDataSourceResult(request));
        }
    }
}