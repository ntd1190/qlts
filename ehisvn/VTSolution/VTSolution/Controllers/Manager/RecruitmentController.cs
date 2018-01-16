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
    public class RecruitmentController : Controller
    {
        angia_ivmEntities db = null;
        Log_Backend log = new Log_Backend();
        public RecruitmentController()
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
            var model = new  Recruitment();
            if (id != 0)
            {
                model = db. Recruitments.SingleOrDefault(t => t.Id == id);
            }
            return View(model);

        }
        [HttpPost]
      
        public ActionResult Create([DataSourceRequest] DataSourceRequest request,  Recruitment model)
        {
            try
            {

                if (model != null)
                {
                    
                    // create new
                    if (model.Id == 0)
                    {
                        db. Recruitments.Add(model);
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
                    log.Feature = " Recruitment create";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return RedirectToAction("Index", "Recruitment");
        }
      
        public JsonResult Recruitment_Read([DataSourceRequest] DataSourceRequest request)
        {
            var respond = db. Recruitments.ToList().Select(t => new RecruitmentIndexModel()
            {
                Id = t.Id,
                Name=t.Name,
                DateEnd=t.DateEnd.ToString()
              
            });
            return Json(respond.ToDataSourceResult(request),JsonRequestBehavior.AllowGet);
        }
      
        public ActionResult Recruitment_Destroy([DataSourceRequest] DataSourceRequest request,  Recruitment model)
        {
            try
            {
                var entity = db. Recruitments.SingleOrDefault(t => t.Id == model.Id);
                db. Recruitments.Remove(entity);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = " Recruitment destroy";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }
      
        public JsonResult GetCategory()
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