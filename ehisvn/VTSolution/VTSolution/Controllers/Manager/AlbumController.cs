using Kendo.Mvc.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VTSolution.Models;
using System.Data.Entity;
using Kendo.Mvc.Extensions;
using VTSolution.ViewModel.Manager;
namespace VTSolution.Controllers.Manager
{
    [Authorize]
    public class AlbumController : Controller
    {
        angia_ivmEntities db = null;
        Log_Backend log = new Log_Backend();
        public AlbumController()
        {
            db = new angia_ivmEntities();
        }
      
        public ActionResult Index()
        {
            return View();
        }
      
        public ActionResult Create(int id = 0)
        {
            var model = new GroupImage();
            var modelimage = new List<Image>();
            Album_Image entity = new Album_Image();
            if (id != 0)
            {
                model = db.GroupImages.SingleOrDefault(t => t.Id == id);
                modelimage = db.Images.Where(t => t.GroupId == id).ToList();
            }
            entity.Album = model;
            entity.ListImage = modelimage;
            return View(entity);

        }
        [HttpPost]
      
        public ActionResult Create([DataSourceRequest] DataSourceRequest request, Album_Image model)
        {
            try
            {

                model.Album.ImagePath = model.ImagePath;
                if (model != null)
                {
                    GroupImage pr = new GroupImage();
                    pr.DateCreate = model.Album.DateCreate;
                    Image proimg = new Image();
                    pr = model.Album;
                    // create new
                    if (model.Album.Id == 0)
                    {
                        db.GroupImages.Add(pr);
                        db.SaveChanges();
                        //try
                        //{
                        //    if (model.ImagePath1 != null)
                        //    {
                        //        foreach (var item in model.ImagePath1)
                        //        {
                        //            proimg.GroupId = pr.Id;
                        //            proimg.ImagePath = item;
                        //            db.Images.Add(proimg);
                        //            db.SaveChanges();
                        //        }
                        //    }
                        //}
                        //catch (Exception ex)
                        //{
                        //    using (var lg = new angia_ivmEntities())
                        //    {
                        //        log.DateCreate = DateTime.Now;
                        //        log.ErrorLog = ex.Message + ex.InnerException;
                        //        log.Feature = "album image create";
                        //        lg.Log_Backend.Add(log);
                        //        lg.SaveChanges();
                        //    }
                        //}

                    }
                    else // update current
                    {
                        db.Entry(pr).State = System.Data.EntityState.Modified;
                        db.SaveChanges();
                        //try
                        //{
                        //    var modelimage = db.Images.Where(t => t.GroupId == pr.Id).ToList();
                        //    if (modelimage != null)
                        //    {
                        //        foreach (var item in modelimage)
                        //        {
                        //            db.Images.Remove(item);
                        //            db.SaveChanges();
                        //        }
                        //    }
                        //}
                        //catch (Exception ex)
                        //{
                        //    using (var lg = new angia_ivmEntities())
                        //    {
                        //        log.DateCreate = DateTime.Now;
                        //        log.ErrorLog = ex.Message + ex.InnerException;
                        //        log.Feature = "image delete in create";
                        //        lg.Log_Backend.Add(log);
                        //        lg.SaveChanges();
                        //    }
                        //}
                        try
                        {
                            if (model.ImagePath1 != null)
                            {
                                foreach (var item in model.ImagePath1)
                                {
                                    proimg.GroupId = pr.Id;
                                    proimg.ImagePath = item;
                                    db.Images.Add(proimg);
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
                                log.Feature = "image  update in create";
                                lg.Log_Backend.Add(log);
                                lg.SaveChanges();
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
                    log.Feature = "album create";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return RedirectToAction("Index", "Album");
        }
      
        public ActionResult GroupImage_Read([DataSourceRequest] DataSourceRequest request)
        {
            var respond = db.GroupImages.ToList().OrderBy(t=>t.OrderBy).Select(t => new GroupImageIndexModel()
            {
                Id = t.Id,
                Vi_Name = t.Vi_Name,
                Eng_Name = t.Eng_Name,
                ImagePath = t.ImagePath,
                OrderBy=t.OrderBy,
                DateCreate =String.Format("{0:dd/MM/yyyy}",t.DateCreate)
            });
            return Json(respond.ToDataSourceResult(request), JsonRequestBehavior.AllowGet);
        }
      
        public ActionResult GroupImage_Destroy([DataSourceRequest] DataSourceRequest request, GroupImage model)
        {
            try
            {
                var entity = db.GroupImages.SingleOrDefault(t => t.Id == model.Id);
                db.GroupImages.Remove(entity);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "GroupImages destroy";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }


      
        public ActionResult GroupImage_Update([DataSourceRequest] DataSourceRequest request, GroupImage model)
        {
            try
            {
                var entity = db.GroupImages.SingleOrDefault(t => t.Id == model.Id);
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
                    log.Feature = "GroupImages update orderby";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }
      
        public JsonResult GetCategory()
        {
            List<string> model = new List<string>();
            for (int i =DateTime.Now.Year; i > 2008; i--)
            {
                model.Add(Convert.ToString(i));
            }
            var respond = model.ToList().Select(t => new GroupIndexModel()
            {
                DateCreate = t.ToString()
            }).ToList();
            return Json(respond, JsonRequestBehavior.AllowGet);
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
    }
}