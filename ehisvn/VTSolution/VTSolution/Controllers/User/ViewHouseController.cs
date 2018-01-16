using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VTSolution.Models;
using VTSolution.ViewModel.Customer;

namespace VTSolution.Controllers.User
{
    public class ViewHouseController : Controller
    {
        // GET: ViewHouse
        public ActionResult HouseIndex(int ? id=7)
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
        public ActionResult HouseDetail(int id)
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
    }
}