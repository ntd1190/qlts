using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VTSolution.Models;
using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;
using VTSolution.ViewModel.Manager;
namespace VTSolution.Controllers.Manager
{
    [Authorize]
    public class GroupStaffController : Controller
    {

        angia_ivmEntities db = null;
        Log_Backend log = new Log_Backend();
        public GroupStaffController()
        {
            db = new angia_ivmEntities();
        }
        //
        // GET: /GroupStaff/
      
        public ActionResult Index()
        {
            return View();
        }
      
        public ActionResult Create(int id = 0)
        {
            var model = new GroupStaff();
            if (id != 0)
            {
                model = db.GroupStaffs.SingleOrDefault(t => t.Id == id);
            }
            return View(model);

        }
        [HttpPost]
      
        public ActionResult Create([DataSourceRequest] DataSourceRequest request, GroupStaff model)
        {
            try
            {
                if (model != null)
                {
                    // create new
                    if (model.Id == 0)
                    {
                        db.GroupStaffs.Add(model);
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
                    log.Feature = "GroupStaff create";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return RedirectToAction("Index", "GroupStaff");
        }
      
        public ActionResult GroupStaff_Read([DataSourceRequest] DataSourceRequest request)
        {
            var respond = db.GroupStaffs.ToList().Select(t => new GroupStaffIndexModel()
            {
                Id = t.Id,
                Vi_Name = t.Vi_Name,
                Eng_Name = t.Eng_Name,
            });
            return Json(respond.ToDataSourceResult(request));
        }
      
        public ActionResult GroupStaff_Destroy([DataSourceRequest] DataSourceRequest request, GroupStaff model)
        {
            try
            {
                var entity = db.GroupStaffs.SingleOrDefault(t => t.Id == model.Id);
                db.GroupStaffs.Remove(entity);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "GroupStaff destroy";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }

      
        public ActionResult GroupStaff_Update([DataSourceRequest] DataSourceRequest request, GroupStaff model)
        {
            try
            {
                var entity = db.GroupStaffs.SingleOrDefault(t => t.Id == model.Id);
             
                db.Entry(entity).State = System.Data.EntityState.Modified;
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "GroupStaff Update OrderBy";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }
    }
}