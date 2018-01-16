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
    public class CommonController : Controller
    {
        angia_ivmEntities db = null;
        Log_Backend log = new Log_Backend();
        public CommonController()
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
            var model = new News();
            if (id != 0)
            {
                model = db.News.SingleOrDefault(t => t.Id == id);
            }
            return View(model);

        }
      
        public JsonResult GetProject()
        {
            var respond = db.Projects.ToList().Select(t => new ProjectIndexModel()
            {
                Id = t.Id,
                Vi_Title = t.Vi_Title
            }).ToList();
            return Json(respond, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
      
        public ActionResult Create([DataSourceRequest] DataSourceRequest request, News model)
        {
            try
            {

                if (model != null)
                {
                    if (model.DateCreate == null)
                    {
                        model.DateCreate = DateTime.Now;
                    }
                    model.DateUpdate = DateTime.Now;
                    if (model.GroupId != 2)
                    {
                        model.ProjectId = null;
                    }
                    // create new
                    if (model.Id == 0)
                    {
                        db.News.Add(model);
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
                    log.Feature = "News create";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return RedirectToAction("Index", "Common");
        }
      
        public JsonResult Common_Read([DataSourceRequest] DataSourceRequest request)
        {
            var respond = db.News.ToList().OrderBy(t=>t.OrderBy).Select(t => new CommonIndexModel()
            {
                Id = t.Id,
                ImageHome = t.ImagePath,
                Vi_Title = t.Vi_Title,
                Eng_Title = t.Eng_Title,
                DateCreate = String.Format("{0:dd/MM/yyyy}", t.DateCreate)
            });
            return Json(respond.ToDataSourceResult(request),JsonRequestBehavior.AllowGet);
        }
      
        public ActionResult Common_Destroy([DataSourceRequest] DataSourceRequest request, News model)
        {
            try
            {
                var entity = db.News.SingleOrDefault(t => t.Id == model.Id);
                db.News.Remove(entity);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "News destroy";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }

      
        public ActionResult Common_Update([DataSourceRequest] DataSourceRequest request, News model)
        {
            try
            {
                var entity = db.News.SingleOrDefault(t => t.Id == model.Id);
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
                    log.Feature = "News Update OrderBy";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }

      
        public JsonResult GetCategory()
        {
            var respond = db.Groups.ToList().Select(t => new GroupIndexModel()
            {
                Id = t.Id,
                Name = t.GroupName
            }).ToList();
            return Json(respond, JsonRequestBehavior.AllowGet);
        }
    }
}