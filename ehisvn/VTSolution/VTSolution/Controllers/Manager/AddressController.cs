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
    public class AddressController : Controller
    {
        angia_ivmEntities db = null;
        Log_Backend log = new Log_Backend();
        public AddressController()
        {
            db = new angia_ivmEntities();
        }
        //
        // GET: /Address/
      
        public ActionResult Index()
        {
            return View();
        }
      
        public ActionResult Create(int id = 0)
        {
            var model = new Address();
            if (id != 0)
            {
                model = db.Addresses.SingleOrDefault(t => t.Id == id);
            }
            return View(model);

        }
        [HttpPost]
      
        public ActionResult Create([DataSourceRequest] DataSourceRequest request, Address model)
        {
            try
            {
                if (model != null)
                {
                    // create new
                    if (model.Id == 0)
                    {
                        db.Addresses.Add(model);
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
                    log.Feature = "Address create";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return RedirectToAction("Index", "Address");
        }
      
        public ActionResult Address_Read([DataSourceRequest] DataSourceRequest request)
        {
            var respond = db.Addresses.ToList().Select(t => new AddressIndexModel()
            {
                Id = t.Id,
                Vi_Name = t.Vi_Name,
                Eng_Name = t.Eng_Name,
                Phone = t.Phone,
                Mail = t.Email
            });
            return Json(respond.ToDataSourceResult(request));
        }
      
        public ActionResult Address_Destroy([DataSourceRequest] DataSourceRequest request, Address model)
        {
            try
            {
                var entity = db.Addresses.SingleOrDefault(t => t.Id == model.Id);
                db.Addresses.Remove(entity);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "Address destroy";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }

    }
}