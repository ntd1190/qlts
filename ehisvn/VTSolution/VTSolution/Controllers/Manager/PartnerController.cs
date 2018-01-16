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
    public class PartnerController : Controller
    {
        angia_ivmEntities db = null;
        Log_Backend log = new Log_Backend();
        public PartnerController()
        {
            db = new angia_ivmEntities();
        }
        //
        // GET: /Partner/
      
        public ActionResult Index()
        {
            return View();
        }
      
        public ActionResult Create(int id = 0)
        {
            var model = new Partner();
            if (id != 0)
            {
                model = db.Partners.SingleOrDefault(t => t.Id == id);
            }
            return View(model);

        }
        [HttpPost]
      
        public ActionResult Create([DataSourceRequest] DataSourceRequest request, Partner model)
        {
            try
            {
                if (model != null)
                {
                
                    //model.ImagePath = model.ImagePath.Substring(model.ImagePath.IndexOf("/", 7));
                    // create new
                    if (model.Id == 0)
                    {
                        db.Partners.Add(model);
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
                    log.Feature = "Partner create";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return RedirectToAction("Index", "Partner");
        }
      
        public ActionResult Partner_Read([DataSourceRequest] DataSourceRequest request)
        {
            var respond = db.Partners.Select(t => new BannerIndexModel()
            {
                Id = t.Id,
                ImagePath = t.ImagePath,
                Name = t.Vi_Name
            });
            return Json(respond.ToDataSourceResult(request));
        }
      
        public ActionResult Partner_Destroy([DataSourceRequest] DataSourceRequest request, Partner model)
        {
            try
            {
                var entity = db.Partners.SingleOrDefault(t => t.Id == model.Id);
                db.Partners.Remove(entity);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "Partner destroy";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }

      
        public ActionResult Partner_Update([DataSourceRequest] DataSourceRequest request, Partner model)
        {
            try
            {
                var entity = db.Partners.SingleOrDefault(t => t.Id == model.Id);
                db.Entry(entity).State = System.Data.EntityState.Modified;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "Partner update order by";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }
      
        public JsonResult GetCategory()
        {
            var respond = db.GroupPartners.ToList().Select(t => new GroupIndexModel()
            {
                Id = t.Id,
                Name = t.Name
            }).ToList();
            return Json(respond, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCategory1()
        {
            var respond = db.GroupRecruitments.ToList().Select(t => new GroupIndexModel()
            {
                Id = t.Id,
                Name = t.Name
            }).ToList();
            return Json(respond, JsonRequestBehavior.AllowGet);
        }
    }
}