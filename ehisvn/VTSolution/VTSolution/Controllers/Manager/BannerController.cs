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
    public class BannerController : Controller
    {
        angia_ivmEntities db = null;
        Log_Backend log = new Log_Backend();
        public BannerController()
        {
            db = new angia_ivmEntities();
        }
        //
        // GET: /Banner/
      
        public ActionResult Index()
        {
            return View();
        }
      
        public ActionResult Create(int id = 0)
        {
            var model = new Banner();
            if (id != 0)
            {
                model = db.Banners.SingleOrDefault(t => t.Id == id);
            }
            return View(model);

        }
        [HttpPost]
      
        public ActionResult Create([DataSourceRequest] DataSourceRequest request, Banner model)
        {
            try
            {
                if (model != null)
                {
                    model.Isbanner = true;
                    //model.ImagePath = model.ImagePath.Substring(model.ImagePath.IndexOf("/", 7));
                    // create new
                    if (model.Id == 0)
                    {
                        db.Banners.Add(model);
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
                    log.Feature = "Banner create";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return RedirectToAction("Index", "Banner");
        }
      
        public ActionResult Banner_Read([DataSourceRequest] DataSourceRequest request)
        {
            var respond = db.Banners.Where(t => t.IsDelete == false && t.IsDistribution == false && t.IsLogo==false).ToList().OrderBy(t => t.OrderBy).Select(t => new BannerIndexModel()
            {
                Id = t.Id,
                ImagePath = t.ImagePath,
                Link = t.Link,
                OrderBy = t.OrderBy
            });
            return Json(respond.ToDataSourceResult(request));
        }
      
        public ActionResult Banner_Destroy([DataSourceRequest] DataSourceRequest request, Banner model)
        {
            try
            {
                var entity = db.Banners.SingleOrDefault(t => t.Id == model.Id);
                db.Banners.Remove(entity);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "Banner destroy";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }

      
        public ActionResult Banner_Update([DataSourceRequest] DataSourceRequest request, Banner model)
        {
            try
            {
                var entity = db.Banners.SingleOrDefault(t => t.Id == model.Id);
                entity.OrderBy = model.OrderBy;
                db.Entry(entity).State = System.Data.EntityState.Modified;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "Banner update order by";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }

    }
}