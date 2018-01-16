using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VTSolution.Models;
using VTSolution.ViewModel.Customer;

namespace VTSolution.Controllers.User
{
    public class WaterController : Controller
    {
        // GET: Water
        public ActionResult WaterIndex(int? id = 6)
        {
            using (var db = new angia_ivmEntities())
            {
                NewsIndexModel news = new NewsIndexModel();
                news.ListGroupNews = db.Groups.ToList();
                news.ListNews = db.News.Where(t => t.GroupId == id && t.IsDelete == false && t.IsDisable == false).ToList();
                ViewBag.idgroup = id;
                return View(news);
            }
        }
        public ActionResult WaterDetail(int id)
        {
            using (var db = new angia_ivmEntities())
            {
                NewsIndexModel news = new NewsIndexModel();
                news.News = db.News.SingleOrDefault(t => t.Id == id);
                news.ListNews = db.News.Where(t => t.GroupId == news.News.GroupId).ToList();
                ViewBag.idnews = id;
                return View(news);
            }
        }
        public ActionResult RecruitmentDetail(int id)
        {
            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
                NewsIndexModel news = new NewsIndexModel();
                news.Recruitment = db.Recruitments.SingleOrDefault(t => t.Id == id);
                ViewBag.idnews = id;
                if (language.Name == "en-US")
                {
                    news.Recruitment.Name = news.Recruitment.Eng_Name ?? news.Recruitment.Name;
                    news.Recruitment.Description = news.Recruitment.Eng_Description ?? news.Recruitment.Description;
                    news.Recruitment.Content = news.Recruitment.Eng_Content ?? news.Recruitment.Content;
                    news.Recruitment.Vi_MetaTitle = news.Recruitment.Eng_MetaTitle ?? news.Recruitment.Vi_MetaTitle;
                    news.Recruitment.Vi_MetaKeyword = news.Recruitment.Eng_MetaKeyword ?? news.Recruitment.Vi_MetaKeyword;
                    news.Recruitment.Vi_MetaDescription = news.Recruitment.Eng_Description ?? news.Recruitment.Vi_MetaDescription;
                }
                return View(news);
            }
        }
    }
}