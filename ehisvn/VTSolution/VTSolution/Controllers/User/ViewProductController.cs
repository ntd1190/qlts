using System.Linq;
using PagedList;
using System.Web.Mvc;
using VTSolution.Models;
using VTSolution.ViewModel.Customer;
using System.Data.Entity;
namespace VTSolution.Controllers.User
{
    
    public class ViewProductController : Controller
    {
        // GET: ViewProduct
        public ActionResult ProductIndex(int page = 1)
        {
            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
                var model = db.Projects.OrderByDescending(t => t.Id).ToPagedList(page, 4);
                if (language.Name == "en-US")
                {
                    if (model.Count() > 0)
                    {
                        foreach (var item in model)
                        {
                            item.Vi_Title = item.Eng_Title;
                            item.Vi_Description = item.Eng_Description;
                            item.Vi_Content = item.Eng_Content;
                        }
                    }
                }
                else if (language.Name == "ja")
                {
                    if (model.Count() > 0)
                    {
                        foreach (var item in model)
                        {
                            item.Vi_Title = item.Ja_Title;
                            item.Vi_Description = item.Ja_Description;
                            item.Vi_Content = item.Ja_Content;
                        }
                    }
                }
                return View(model);
            }

        }
        public ActionResult ProductDetail(string titleduan)
        {
            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
                ProjectIndexModel pro = new ProjectIndexModel();
                pro.Album = db.GroupImages.OrderByDescending(t => t.Id).ToList();
                if (language.Name != "en-US")
                {
                    pro.Project = db.Projects.Include(testc => testc.ProjectImages).FirstOrDefault(t => t.SeVi == titleduan);
                    pro.Related = db.Projects.Include(testc => testc.ProjectImages).Where(t => t.SeVi != titleduan).ToList();
                }
                if (language.Name == "en-US")
                {
                    pro.Project = db.Projects.Include(testc => testc.ProjectImages).FirstOrDefault(t => t.SeEn == titleduan);
                    pro.Related = db.Projects.Include(testc => testc.ProjectImages).Where(t => t.SeEn != titleduan).ToList();

                    pro.Project = db.Projects.Include(testc => testc.ProjectImages).FirstOrDefault(t => t.SeEn == titleduan);
                    pro.Related = db.Projects.Include(testc => testc.ProjectImages).Where(t => t.SeEn != titleduan).ToList();
                    pro.Project.Vi_Title = pro.Project.Eng_Title ?? pro.Project.Vi_Title;
                    pro.Project.Vi_Description = pro.Project.Eng_Description ?? pro.Project.Vi_Description;
                    pro.Project.Vi_Content = pro.Project.Eng_Content ?? pro.Project.Vi_Content;

                    pro.Project.Vi_MetaTitle = pro.Project.Eng_MetaTitle ?? pro.Project.Vi_MetaTitle;
                    pro.Project.Vi_MetaDescription = pro.Project.Eng_MetaDescription ?? pro.Project.Vi_MetaDescription;
                    pro.Project.Vi_MetaKeyword = pro.Project.Eng_MetaKeyword ?? pro.Project.Vi_MetaKeyword;

                    foreach (var item in pro.Related)
                    {
                        item.Vi_Title = item.Eng_Title ?? item.Vi_Title;
                        item.Vi_Description = item.Eng_Description ?? item.Vi_Description;
                        item.Vi_Content = item.Eng_Content ?? item.Vi_Content;

                        item.Vi_MetaTitle = item.Eng_MetaTitle ?? item.Vi_MetaTitle;
                        item.Vi_MetaDescription = item.Eng_MetaDescription ?? item.Vi_MetaDescription;
                        item.Vi_MetaKeyword = item.Eng_MetaKeyword ?? item.Vi_MetaKeyword;
                    }
                }
                else if (language.Name == "ja")
                {
                    pro.Project = db.Projects.Include(testc => testc.ProjectImages).FirstOrDefault(t => t.SeJa == titleduan);
                    pro.Related = db.Projects.Include(testc => testc.ProjectImages).Where(t => t.SeJa != titleduan).ToList();

                    pro.Project.Vi_Title = pro.Project.Ja_Title ?? pro.Project.Vi_Title;
                    pro.Project.Vi_Description = pro.Project.Ja_Description ?? pro.Project.Vi_Description;
                    pro.Project.Vi_Content = pro.Project.Ja_Content ?? pro.Project.Vi_Content;

                    pro.Project.Vi_MetaTitle = pro.Project.Eng_MetaTitle ?? pro.Project.Vi_MetaTitle;
                    pro.Project.Vi_MetaDescription = pro.Project.Eng_MetaDescription ?? pro.Project.Vi_MetaDescription;
                    pro.Project.Vi_MetaKeyword = pro.Project.Eng_MetaKeyword ?? pro.Project.Vi_MetaKeyword;

                    foreach (var item in pro.Related)
                    {
                        item.Vi_Title = item.Ja_Title ?? item.Vi_Title;
                        item.Vi_Description = item.Ja_Description ?? item.Vi_Description;
                        item.Vi_Content = item.Ja_Content ?? item.Vi_Content;

                        item.Vi_MetaTitle = item.Eng_MetaTitle ?? item.Vi_MetaTitle;
                        item.Vi_MetaDescription = item.Eng_MetaDescription ?? item.Vi_MetaDescription;
                        item.Vi_MetaKeyword = item.Eng_MetaKeyword ?? item.Vi_MetaKeyword;
                    }
                }
                return View(pro);
            }
        }
        public ActionResult Album()
        {
            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
                var model = db.GroupImages.OrderByDescending(t => t.DateCreate).ToList();
                if (language.Name == "en-US")
                {
                    if (model.Count() > 0)
                    {
                        foreach (var item in model)
                        {
                            item.Vi_Name = item.Eng_Name ?? item.Vi_Name;
                        }
                    }
                }
                return View(model);
            }
        }
        public ActionResult Album1(int id)
        {
            using (var db = new angia_ivmEntities())
            {
                var model = db.Images.Where(T => T.GroupId == id).ToList();
                return View(model);
            }
        }
        public ActionResult Recruited(int? id)
        {
            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
                if (id == null)

                {
                    id = db.Recruitments.Where(t => t.GroupId == 1).OrderByDescending(t => t.Id).First().Id;
                }
                RecruitmentIndexModel re = new RecruitmentIndexModel();
                ViewBag.idre = id;
                re.ListRecruitment = db.Recruitments.Where(t => t.GroupId == 1).OrderByDescending(t => t.Id).ToList();
                re.Detail = db.Recruitments.SingleOrDefault(r => r.Id == id);

                if (language.Name == "en-US")
                {
                    if (re.ListRecruitment.Count() > 0)
                    {
                        foreach (var item in re.ListRecruitment)
                        {
                            item.Name = item.Eng_Name ?? item.Name;
                            item.Content = item.Eng_Content ?? item.Content;
                            item.Address = item.Eng_Address ?? item.Address;
                        }
                    }
                }
                return View(re);
            }
        }
        public ActionResult Customers()
        {
            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
              
                RecruitmentIndexModel re = new RecruitmentIndexModel();
                re.Partner = db.Partners.ToList();
                re.KhacBiet = db.Banners.FirstOrDefault(t => t.IsPartner);
                if (language.Name == "en-US")
                {
                    if (re.Partner.Count() > 0)
                    {
                        foreach (var item in re.Partner)
                        {
                            item.Vi_Name = item.Eng_Name?? item.Vi_Name;
                            item.Vi_Posintion = item.Eng_Position??item.Vi_Posintion;
                            item.Vi_Content = item.Eng_Content??item.Vi_Content;
                        }
                    }
                }
                return View(re);
            }
        }
        public JsonResult GetAlbum(int id)
        {
            using (var db = new angia_ivmEntities())
            {
                var model = db.Images.Where(t => t.GroupId == id).ToList();
                var stringView = this.RenderRazorViewToString("_Album", model);
                return Json(stringView, JsonRequestBehavior.AllowGet);
            }
        }
        public string RenderRazorViewToString(string viewName, object model)
        {
            ViewData.Model = model;
            using (var sw = new System.IO.StringWriter())
            {
                var viewResult = ViewEngines.Engines.FindPartialView(ControllerContext, viewName);
                var viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, sw);
                viewResult.View.Render(viewContext, sw);
                viewResult.ViewEngine.ReleaseView(ControllerContext, viewResult.View);
                return sw.GetStringBuilder().ToString();
            }
        }

        public ActionResult ProductSearch(string name)
        {
            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
                var model = db.Projects.Where(t => t.Vi_Title.ToLower().Contains(name.ToLower()) || t.Eng_Title.ToLower().Contains(name.ToLower())).ToList();
                if (language.Name == "en-US")
                {
                    if (model.Count() > 0)
                    {
                        foreach (var item in model)
                        {
                            item.Vi_Title = item.Eng_Title;
                            item.Vi_Description = item.Eng_Description;
                            item.Vi_Content = item.Eng_Content;
                        }
                    }
                }
                return View(model);
            }
        }

    }
}