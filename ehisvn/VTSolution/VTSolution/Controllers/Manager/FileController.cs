using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VTSolution.Models;
using VTSolution.ViewModel.Manager;

namespace VTSolution.Controllers.Manager
{
    public class FileController : Controller
    {
        // GET: File
        angia_ivmEntities db = null;
        Log_Backend log = new Log_Backend();
        public FileController()
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
            var model = new File();
            if (id != 0)
            {
                model = db.Files.SingleOrDefault(t => t.Id == id);
            }
            return View(model);

        }
        [HttpPost]

        public ActionResult Create([DataSourceRequest] DataSourceRequest request, File model)
        {
            try
            {
                if (model != null)
                {
                    db.Files.Attach(model);
                   
                    db.Entry(model).Property(t => t.IsDisable).IsModified = true;
                    db.Entry(model).Property(t => t.LinkDownload).IsModified = true;
                    db.Entry(model).Property(t => t.LinkDownload2).IsModified = true;
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "popup create";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return RedirectToAction("Index", "File");
        }

        public ActionResult File_Read([DataSourceRequest] DataSourceRequest request)
        {
            var respond = db.Files.ToList().Select(t => new FileIndexModel()
            {
                Id = t.Id,
                Vi_Name = t.Vi_Name
            });
            return Json(respond.ToDataSourceResult(request));
        }
    }
}