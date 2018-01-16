using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VTSolution.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using VTSolution.ViewModel.Manager;
namespace VTSolution.Controllers.Manager
{
    [Authorize]
    public class EmailController :Controller
    {
        angia_ivmEntities db = null;
        Log_Backend log = new Log_Backend();
        public EmailController()
        {
            db = new angia_ivmEntities();
        }
      
        public ActionResult Index()
        {
            return View();
        }
     
      
        public ActionResult Email_Read([DataSourceRequest] DataSourceRequest request)
        {
            var respond = db.Emails.OrderBy(t => t.Id).ToList().Select(t => new EmailIndexModel()
            {
                Id = t.Id,
                Name = t.Name,
                Email = t.Email1,
                Phone = t.Phone,
                Project = t.Project,
                Content = t.Content,
                DateCreate = t.DateCreate
            });
            return Json(respond.ToDataSourceResult(request));
        }
      
        public ActionResult Email_Destroy([DataSourceRequest] DataSourceRequest request, Email model)
        {
            try
            {
                var entity = db.Emails.SingleOrDefault(t => t.Id == model.Id);
                db.Emails.Remove(entity);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                using (var lg = new angia_ivmEntities())
                {
                    log.DateCreate = DateTime.Now;
                    log.ErrorLog = ex.Message + ex.InnerException;
                    log.Feature = "Emails destroy";
                    lg.Log_Backend.Add(log);
                    lg.SaveChanges();
                }
            }
            return Json(new[] { model }.ToDataSourceResult(request, ModelState));
        }
	}
}