using Kendo.Mvc.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VTSolution.Models;
using VTSolution.ViewModel.Manager;
using Kendo.Mvc.Extensions;
namespace VTSolution.Controllers.Manager
{
    [Authorize]
    public class ReasonController : Controller
    {
        
       angia_ivmEntities db = null;
        Log_Backend log = new Log_Backend();
        public ReasonController()
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
            var model = new District();
            if (id != 0)
            {
                model = db.Districts.SingleOrDefault(t => t.Id == id);
            }
            return View(model);

        }
        [HttpPost]
      
        public ActionResult Create([DataSourceRequest] DataSourceRequest request, District model)
        {
            try
            {
                if (model != null)
                {
                    model.DateCreate = DateTime.Now;
                    // create new
                    if (model.Id == 0)
                    {
                       
                        db.Districts.Add(model);
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
                    log.Feature = "district create";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return RedirectToAction("Index", "Reason");
        }
      
        public ActionResult Reason_Read([DataSourceRequest] DataSourceRequest request)
        {
            var respond = db.Districts.ToList().Select(t => new DistrictIndexModel()
            {
                Id = t.Id,
                Vi_Name=t.Vi_Name,
                Eng_Name=t.Eng_Name
            });
            return Json(respond.ToDataSourceResult(request));
        }
      
        public JsonResult GetCategory()
        {
            var respond = db.GroupDistricts.ToList().Select(t => new GroupImageIndexModel()
            {
                Id = t.Id,
                Vi_Name = t.Vi_Name
            }).ToList();
            return Json(respond, JsonRequestBehavior.AllowGet);
        }
	}
}