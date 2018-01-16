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
    public class ProjectController : Controller
    {
        //
        // GET: /Project/
        angia_ivmEntities db = null;
        Log_Backend log = new Log_Backend();
        public ProjectController()
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
            var model = new Project();
            if (id != 0)
            {
                model = db.Projects.SingleOrDefault(t => t.Id == id);
            }
            return View(model);

        }
        [HttpPost]

        public ActionResult Create([DataSourceRequest] DataSourceRequest request, Project model)
        {
            try
            {
                var images = !string.IsNullOrEmpty(Request.Form["imagepath1"]) ? Request.Form["imagepath1"] : null;

                if (model != null)
                {
                    model.SeVi = Util.GenerateUrl(model.Vi_Title ?? "");
                    model.SeEn = Util.GenerateUrl(model.Eng_Title ?? "");
                    model.SeJa = Util.GenerateUrl(model.Ja_Title ?? "");
                    if (model.DateCreate == null)
                    {
                        model.DateCreate = DateTime.Now;
                    }
                    model.DateUpdate = DateTime.Now;
                    // create new
                    if (model.Id == 0)
                    {
                        db.Projects.Add(model);
                        db.SaveChanges();
                        //add detail image
                        if (images != null)
                        {
                            foreach (var item in images.Split(','))
                            {
                                ProjectImage pro = new ProjectImage();
                                pro.IdProject = model.Id;
                                pro.ImagePath = item.ToString();
                                db.ProjectImages.Add(pro);
                                db.SaveChanges();
                            }
                        }
                        //add vi tri 

                    }
                    else // update current
                    {
                        db.Entry(model).State = System.Data.EntityState.Modified;
                        db.SaveChanges();
                        if (images != null)
                        {
                            foreach (var item in db.ProjectImages.Where(t => t.IdProject == model.Id).ToList())
                            {

                                db.ProjectImages.Remove(item);
                                db.SaveChanges();
                            }
                            foreach (var item in images.Split(','))
                            {
                                ProjectImage pro = new ProjectImage();
                                pro.IdProject = model.Id;
                                pro.ImagePath = item.ToString();
                                db.ProjectImages.Add(pro);
                                db.SaveChanges();
                            }
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "Projects create";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return RedirectToAction("Index", "Project");
        }

        public ActionResult Project_Read([DataSourceRequest] DataSourceRequest request)
        {
            var respond = db.Projects.ToList().OrderBy(t => t.OrderBy).Select(t => new ProjectIndexModel()
            {
                Id = t.Id,
                ImageHome = t.ImagePath,
                Vi_Title = t.Vi_Title,
                Eng_Title = t.Eng_Title,
                OrderBy = t.OrderBy
            });
            return Json(respond.ToDataSourceResult(request));
        }

        public ActionResult Project_Destroy([DataSourceRequest] DataSourceRequest request, Project model)
        {
            try
            {
                var entity = db.Projects.SingleOrDefault(t => t.Id == model.Id);
                db.Projects.Remove(entity);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "Projects destroy";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }

        public ActionResult Prodject_Update([DataSourceRequest] DataSourceRequest request, Project model)
        {
            try
            {
                var entity = db.Projects.SingleOrDefault(t => t.Id == model.Id);
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
                    log.Feature = "Projects update orderby";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }
    }
}