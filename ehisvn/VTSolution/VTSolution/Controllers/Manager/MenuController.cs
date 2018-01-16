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
    public class MenuController : Controller
    {
        //
        // GET: /Menu/
        angia_ivmEntities db = null;
        Log_Backend log = new Log_Backend();
        public MenuController()
        {
            db = new angia_ivmEntities();
        }
        
        public ActionResult Index()
        {
            return View();
        }
        
        public ActionResult Create(int id = 0)
        {
            var model = new VTSolution.Models.Menu();
            if (id != 0)
            {
                model = db.Menus.SingleOrDefault(t => t.Id == id);
            }
            return View(model);

        }
        [HttpPost]
      
        public ActionResult Create([DataSourceRequest] DataSourceRequest request, VTSolution.Models.Menu model)
        {
            try
            {
                if (model != null)
                {
                    // create new
                    if (model.Id == 0)
                    {
                        db.Menus.Add(model);
                        db.SaveChanges();
                    }
                    else // update current
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
                    log.Feature = "menu create";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return RedirectToAction("Index", "Menu");
        }
      
        public ActionResult Menu_Read([DataSourceRequest] DataSourceRequest request)
        {
            var respond = db.Menus.ToList().Select(t => new MenuIndexModel()
            {
                Id = t.Id,
                Vi_Name=t.Vi_Name,
                Eng_Name=t.Eng_Name,
                Link=t.Link
            });
            return Json(respond.ToDataSourceResult(request));
        }
    }
}