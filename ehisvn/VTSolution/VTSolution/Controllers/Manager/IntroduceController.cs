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
    public class IntroduceController : Controller
    {
        angia_ivmEntities db = null;
        Log_Backend log = new Log_Backend();
        public IntroduceController()
        {
            db = new angia_ivmEntities();
        }
        //
        // GET: /Common/
      
        public ActionResult Index()
        {
            return View();
        }

      
        public ActionResult Create(int id = 0)
        {
            var model = new Introduce();
            if (id != 0)
            {
                model = db.Introduces.SingleOrDefault(t => t.Id == id);
            }
            return View(model);

        }
        [HttpPost]
      
        public ActionResult Create([DataSourceRequest] DataSourceRequest request, Introduce model)
        {
            try
            {
                if (model != null)
                {
                    model.DateCreate = DateTime.Now;
                    model.DateUpdate = DateTime.Now;
                    // create new
                    if (model.Id == 0)
                    {
                        db.Introduces.Add(model);
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
                    log.Feature = "Introduce create";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return RedirectToAction("Index", "Introduce");
        }
      
        public ActionResult Introduces_Read([DataSourceRequest] DataSourceRequest request)
        {
            var respond = db.Introduces.ToList().Select(t => new IntroduceIndexModel()
            {
                Id = t.Id,
                ImageHome = t.ImagePath,
                Vi_Title = t.Vi_Title,
                Eng_Title = t.Eng_Title,
                GroupName = t.GroupIntroduce.Vi_GroupName,
                IsDisable = t.IsDisable
            });
            return Json(respond.ToDataSourceResult(request));
        }
      
        public ActionResult Introduces_Destroy([DataSourceRequest] DataSourceRequest request, Introduce model)
        {
            try
            {
                var entity = db.Introduces.SingleOrDefault(t => t.Id == model.Id);
                db.Introduces.Remove(entity);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "Introduces destroy";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }

      
        public JsonResult GetCategory()
        {
            var respond = db.GroupIntroduces.ToList().Select(t => new GroupIntroduceIndexModel()
            {
                Id = t.Id,
                Name = t.Vi_GroupName
            }).ToList();
            return Json(respond, JsonRequestBehavior.AllowGet);
        }
    }
}