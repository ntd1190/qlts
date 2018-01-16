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
    public class ImageController : Controller
    {
        angia_ivmEntities db = null;
        Log_Backend log = new Log_Backend();
        public ImageController()
        {
            db = new angia_ivmEntities();
        }
      
        public ActionResult Index()
        {
            return View();
        }
      
        public ActionResult Create(int id = 0)
        {
            TempData["id"] = id;
            var model = new ImageDetailModel();
            return View(model);
        }
        [HttpPost]
      
        public JsonResult Create(List<ImageDetailModel> Image)
        {
            try
            {
                Image models = new Image();
                // create new
                if (TempData["id"].ToString() == "0")
                {

                    if (Image != null)
                    {
                        foreach (var item in Image)
                        {
                            models.GroupId = item.GroupId;
                            models.ImagePath = item.ImagePath;
                            db.Images.Add(models);
                            db.SaveChanges();
                        }
                    }
                }
                else // update current
                {
                    db.Entry(models).State = System.Data.EntityState.Modified;
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "image create";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return null;
        }
      
        public ActionResult Image_Read([DataSourceRequest] DataSourceRequest request)
        {
            var respond = db.Images.ToList().OrderBy(t => t.OrderBy).Select(t => new ImageDetailModel()
            {
                Id = t.Id,
                GroupId=t.GroupId,
                OrderBy=t.OrderBy,
                ImagePath = t.ImagePath,
            });
            return Json(respond.ToDataSourceResult(request));
        }
      
        public ActionResult Image_Destroy([DataSourceRequest] DataSourceRequest request, Image model)
        {
            try
            {
                var entity = db.Images.SingleOrDefault(t => t.Id == model.Id);
                db.Images.Remove(entity);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "Images destroy";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }


      
        public ActionResult Image_Update([DataSourceRequest] DataSourceRequest request, Image model)
        {
            try
            {
                var entity = db.Images.SingleOrDefault(t => t.Id == model.Id);
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
                    log.Feature = "Images update orderby";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }
      
        public JsonResult GetCategory()
        {
            var respond = db.GroupImages.ToList().Select(t => new GroupImageIndexModel()
            {
                Id = t.Id,
                Vi_Name = t.Vi_Name
            }).ToList();
            return Json(respond, JsonRequestBehavior.AllowGet);
        }
        public ActionResult DelAll([DataSourceRequest] DataSourceRequest request, ImageDetailModel[] del)
        {
            if (del !=null)
            {
                foreach (var item in del)
                {
                    var model = db.Images.Find(item.Id);
                    db.Images.Remove(model);
                    db.SaveChanges();
                }
            }
            return RedirectToAction("Index", "Image");
        }
    }
}