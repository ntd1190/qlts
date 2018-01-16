using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VTSolution.Models;
using System.Data.Entity;
using VTSolution.ViewModel.Customer;

namespace VTSolution.Controllers.User
{
    public class ViewNewsController : Controller
    {
        // GET: ViewNews
        public ActionResult NewsIndex(int? id = 3)
        {

            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
                NewsIndexModel news = new NewsIndexModel();
                news.ListGroupNews = db.Groups.Where(t => t.Id == 3).OrderBy(t => t.OrderBy).ToList();
                news.ListNews = db.News.Where(t => t.GroupId == id && t.IsDelete == false && t.IsDisable == false).OrderByDescending(t => t.Id).ToList();
                ViewBag.idgroup = id;
                if (language.Name == "en-US")
                {
                    if (news.ListGroupNews.Count() > 0)
                    {
                        foreach (var item in news.ListGroupNews)
                        {
                            item.GroupName = item.Eng_GroupName;
                        }
                    }
                    if (news.ListNews.Count() > 0)
                    {
                        foreach (var item in news.ListNews)
                        {
                            item.Vi_Title = item.Eng_Title ?? item.Vi_Title;
                            item.Vi_Description = item.Eng_Description ?? item.Vi_Description;
                        }
                    }
                }
                else if (language.Name == "ja")
                {
                    if (news.ListGroupNews.Count() > 0)
                    {
                        foreach (var item in news.ListGroupNews)
                        {
                            item.GroupName = item.Ja_GroupName;
                        }
                    }
                    if (news.ListNews.Count() > 0)
                    {
                        foreach (var item in news.ListNews)
                        {
                            item.Vi_Title = item.Ja_Title ?? item.Vi_Title;
                            item.Vi_Description = item.Ja_Description ?? item.Vi_Description;
                        }
                    }
                }
                return View(news);
            }
        }
        public ActionResult NewsDetail(int id)
        {
            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
                NewsIndexModel news = new NewsIndexModel();
                news.News = db.News.SingleOrDefault(t => t.Id == id);
                news.ListNews = db.News.Where(t => t.GroupId == news.News.GroupId).OrderByDescending(t => t.Id).Take(5).ToList();
                ViewBag.idnews = id;
                if (language.Name == "en-US")
                {
                    news.News.Vi_Title = news.News.Eng_Title ?? news.News.Vi_Title;
                    news.News.Vi_Description = news.News.Eng_Description ?? news.News.Vi_Description;
                    news.News.Vi_Content = news.News.Eng_Content ?? news.News.Vi_Content;
                    news.News.Vi_MetaTitle = news.News.Eng_MetaTitle ?? news.News.Vi_MetaTitle;
                    news.News.Vi_MetaKeyword = news.News.Eng_MetaKeyword ?? news.News.Vi_MetaKeyword;
                    news.News.Vi_MetaDescription = news.News.Eng_Description ?? news.News.Vi_MetaDescription;
                    if (news.ListNews.Count() > 0)
                    {
                        foreach (var item in news.ListNews)
                        {
                            item.Vi_Title = item.Eng_Title ?? item.Vi_Title;
                            item.Vi_Description = item.Eng_Description ?? item.Vi_Description;
                            item.Vi_Content = item.Eng_Content ?? item.Vi_Content;
                        }
                    }
                }
                else if (language.Name == "ja")
                {
                    news.News.Vi_Title = news.News.Ja_Title ?? news.News.Vi_Title;
                    news.News.Vi_Description = news.News.Ja_Description ?? news.News.Vi_Description;
                    news.News.Vi_Content = news.News.Ja_Content ?? news.News.Vi_Content;
                    news.News.Vi_MetaTitle = news.News.Eng_MetaTitle ?? news.News.Vi_MetaTitle;
                    news.News.Vi_MetaKeyword = news.News.Eng_MetaKeyword ?? news.News.Vi_MetaKeyword;
                    news.News.Vi_MetaDescription = news.News.Eng_Description ?? news.News.Vi_MetaDescription;
                    if (news.ListNews.Count() > 0)
                    {
                        foreach (var item in news.ListNews)
                        {
                            item.Vi_Title = item.Ja_Title ?? item.Vi_Title;
                            item.Vi_Description = item.Ja_Description ?? item.Vi_Description;
                            item.Vi_Content = item.Ja_Content ?? item.Vi_Content;
                        }
                    }
                }
                return View(news);
            }
        }
       
    }
}