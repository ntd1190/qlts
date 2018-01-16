using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VTSolution.Models;
using VTSolution.ViewModel.Customer;
using System.Data.Entity;
using System.Net.Mail;
using ProjectWeb.ViewModel.User;
using System.IO;
using System.Net;
using System.Web.Script.Serialization;
using System.Text;
using System.Text.RegularExpressions;
using Microsoft.Security.Application;

namespace VTSolution.Controllers.User
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
                ViewBag.home = "home";
                HomeIndexModel home = new HomeIndexModel();

                home.Partner = db.Partners.Where(t => t.IsShowHome).ToList();
                home.News = db.News.OrderByDescending(t => t.Id).ToList();
                home.Product = db.Projects.Where(t => t.IsHot).ToList();
                if (language.Name == "en-US")
                {

                    foreach (var item in home.News)
                    {
                        item.Vi_Title = item.Eng_Title ?? item.Vi_Title;
                        item.Vi_Description = item.Eng_Description ?? item.Vi_Title;
                        item.SeVi = item.SeEn ?? item.SeVi;
                    }
                    foreach (var item in home.Product)
                    {
                        item.Vi_Title = item.Eng_Title ?? item.Vi_Title;
                        item.Vi_Description = item.Eng_Description ?? item.Vi_Title;
                        item.SeVi = item.SeEn ?? item.SeVi;
                    }
                    foreach (var item in home.Partner)
                    {
                        item.Vi_Name = item.Eng_Name?? item.Vi_Name;
                        item.Vi_Posintion = item.Eng_Position ?? item.Vi_Posintion;
                        item.Vi_Content = item.Eng_Content ?? item.Vi_Content;
                    }
                }
                else if (language.Name == "ja")
                {

                    foreach (var item in home.News)
                    {
                        item.Vi_Title = item.Ja_Title ?? item.Vi_Title;
                        item.Vi_Description = item.Ja_Description ?? item.Vi_Title;
                        item.SeVi = item.SeEn ?? item.SeVi;
                    }
                    foreach (var item in home.Product)
                    {
                        item.Vi_Title = item.Ja_Title ?? item.Vi_Title;
                        item.Vi_Description = item.Ja_Description ?? item.Vi_Title;
                        item.SeVi = item.SeJa ?? item.SeVi;
                    }
                    foreach (var item in home.Partner)
                    {
                        item.Vi_Name = item.Ja_Name ?? item.Vi_Name;
                        item.Vi_Posintion = item.Ja_Position ?? item.Vi_Posintion;
                        item.Vi_Content = item.Ja_Content ?? item.Vi_Content;
                    }
                }

                return View(home);
            }
        }

        public ActionResult ChangeLanguage(string lang)
        {

            var langCookie = new HttpCookie("lang", lang)
            {
                HttpOnly = true
            };
            Response.AppendCookie(langCookie);
            return Redirect("/");
        }
        public ActionResult DieuKhoan()
        {
            return View();
        }
        public ActionResult BieuMau()
        {
            if (TempData["redirect"] == null)
            {
                return RedirectToAction("Index", "Home");
            }
            DateTime date = Convert.ToDateTime("01/10/2017");
            if (DateTime.Now > date)
            {
                return RedirectToAction("Index", "Home");
            }
            else
            {
                return View(new ThongTinUngVien());
            }

        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult BieuMau(ThongTinUngVien tt)
        {
            if (TempData["clicked"] != null)
            {
                return RedirectToAction("Index", "Home");
            }
            if (ModelState.IsValid)
            {
                tt.KyNang = removeXss(tt.KyNang);
                tt.GioiThieu = removeXss(tt.GioiThieu);
                tt.TenTruong = removeXss(tt.TenTruong);
                tt.ChuyenNganh = removeXss(tt.ChuyenNganh);
                tt.DiaChi = removeXss(tt.DiaChi);
                tt.HoTen = removeXss(tt.HoTen);
                using (var db = new angia_ivmEntities())
                {
                    tt.NgaySinh = DateTime.Now;
                    db.ThongTinUngViens.Add(tt);
                    db.SaveChanges();
                    TempData["clicked"] = "ok";
                }
                string filename = "baitest.docx";
                string filepath = Server.MapPath("~/Content/file/baitest.docx");
                byte[] filedata = System.IO.File.ReadAllBytes(filepath);
                string contentType = MimeMapping.GetMimeMapping(filepath);

                var cd = new System.Net.Mime.ContentDisposition
                {
                    FileName = filename,
                    Inline = true,
                };
                ModelState.Clear();
                Response.AppendHeader("Content-Disposition", cd.ToString());

                return File(filedata, contentType);
            }
            return RedirectToAction("Index");
        }
        public ActionResult HuongNghiep()
        {
            return View();
        }
        public ActionResult GoRedirect()
        {
            if (!Request.IsAjaxRequest())
            {
                return Json(new { code = 0 }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                TempData["redirect"] = "ok";
                return Json(new { code = 1 }, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Introduce(int? id = 1)
        {
            ViewBag.id = id;
            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
                IntroduceIndexModel home = new IntroduceIndexModel();
                home.Gioithieu = db.Introduces.FirstOrDefault();
                home.Partner = db.GroupPartners.OrderByDescending(t => t.Id).ToList();
                home.News = db.News.OrderByDescending(t => t.Id).ToList();
                home.Staff = db.GroupStaffs.ToList();
                home.Recruitment = db.Recruitments.ToList();
                home.Image = db.GroupImages.ToList();
                home.Banner = db.Banners.ToList();
                if (language.Name == "en-US")
                {
                    home.Gioithieu.Vi_Title = home.Gioithieu.Eng_Title ?? home.Gioithieu.Vi_Title;
                    home.Gioithieu.Vi_Content = home.Gioithieu.Eng_Content ?? home.Gioithieu.Vi_Content;
                    home.Gioithieu.Vi_Reason = home.Gioithieu.Eng_Reason ?? home.Gioithieu.Vi_Reason;
                    home.Gioithieu.Vi_MetaTitle = home.Gioithieu.Eng_MetaTitle ?? home.Gioithieu.Vi_MetaTitle;
                    home.Gioithieu.Vi_MetaDescription = home.Gioithieu.Eng_MetaDescription ?? home.Gioithieu.Vi_MetaDescription;
                    home.Gioithieu.Vi_MetaKeyword = home.Gioithieu.Eng_MetaKeyword ?? home.Gioithieu.Vi_MetaKeyword;



                    if (home.Partner.Count() > 0)
                    {
                        foreach (var item in home.Partner)
                        {
                            item.Name = item.Eng_Name ?? item.Name;
                        }
                    }
                    if (home.News.Count() > 0)
                    {
                        foreach (var item in home.News)
                        {
                            item.Vi_Title = item.Eng_Title ?? item.Vi_Title;
                            item.Vi_Content = item.Eng_Content ?? item.Vi_Content;
                            item.Vi_Description = item.Eng_Description ?? item.Vi_Description;
                            item.Vi_MetaDescription = item.Eng_MetaDescription ?? item.Vi_MetaDescription;
                            item.Vi_MetaKeyword = item.Eng_MetaKeyword ?? item.Vi_MetaKeyword;
                        }
                    }
                    if (home.Staff.Count() > 0)
                    {
                        foreach (var item in home.Staff)
                        {
                            item.Vi_Name = item.Eng_Name ?? item.Vi_Name;
                            item.Vi_Position = item.Eng_Position ?? item.Vi_Position;

                        }
                    }
                    if (home.Banner.Count() > 0)
                    {
                        foreach (var item in home.Banner)
                        {
                            item.ImagePath = item.ImagePath2 ?? item.ImagePath;

                        }
                    }
                    if (home.Recruitment.Count() > 0)
                    {
                        foreach (var item in home.Recruitment)
                        {
                            item.Name = item.Eng_Name ?? item.Name;
                            item.Content = item.Eng_Content ?? item.Content;
                            item.Description = item.Eng_Description ?? item.Description;
                            item.Vi_MetaDescription = item.Eng_MetaDescription ?? item.Vi_MetaDescription;
                            item.Vi_MetaKeyword = item.Eng_MetaKeyword ?? item.Vi_MetaKeyword;
                        }
                    }
                }

                return View(home);
            }
        }
        public ActionResult News()
        {
           
            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
                IntroduceIndexModel home = new IntroduceIndexModel();                
              
                if (language.Name == "en-US")
                {
                    home.News = db.News.Where(t => t.Eng_Title != null && t.Eng_Description != null).OrderByDescending(t => t.Id).ToList();

                    if (home.News.Count() > 0)
                    {
                        foreach (var item in home.News)
                        {
                            item.Vi_Title = item.Eng_Title ?? item.Vi_Title;
                            item.Vi_Content = item.Eng_Content ?? item.Vi_Content;
                            item.Vi_Description = item.Eng_Description ?? item.Vi_Description;
                            item.Vi_MetaDescription = item.Eng_MetaDescription ?? item.Vi_MetaDescription;
                            item.Vi_MetaKeyword = item.Eng_MetaKeyword ?? item.Vi_MetaKeyword;
                        }
                    }
                }
                else if (language.Name == "ja")
                {
                    home.News = db.News.Where(t => t.Ja_Title != null && t.Ja_Description != null).OrderByDescending(t => t.Id).ToList();

                    if (home.News.Count() > 0)
                    {
                        foreach (var item in home.News)
                        {
                            item.Vi_Title = item.Ja_Title ?? item.Vi_Title;
                            item.Vi_Content = item.Ja_Content ?? item.Vi_Content;
                            item.Vi_Description = item.Ja_Description ?? item.Vi_Description;
                            item.Vi_MetaDescription = "";
                            item.Vi_MetaKeyword = "";
                        }
                    }
                }
                else
                {
                    home.News = db.News.OrderByDescending(t => t.Id).ToList();
                }

                return View(home);
            }
        }
        public ActionResult Products()
        {
            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
                IntroduceIndexModel home = new IntroduceIndexModel();
                home.SanPhamList = db.Projects.ToList();
                if (language.Name == "en-US")
                {

                    if (home.SanPhamList.Count() > 0)
                    {
                        foreach (var item in home.SanPhamList)
                        {
                            item.Vi_MetaTitle = item.Eng_MetaTitle ?? item.Vi_MetaTitle;
                            item.Vi_MetaDescription = item.Eng_MetaDescription ?? item.Vi_MetaDescription;
                            item.Vi_MetaKeyword = item.Eng_MetaKeyword ?? item.Vi_MetaKeyword;
                            item.Vi_Title = item.Eng_Title ?? item.Vi_Title;
                            item.Vi_Content = item.Eng_Content ?? item.Vi_Content;
                            item.SeVi = item.SeEn ?? item.SeVi;
                        }
                    }
                }
                else if (language.Name == "ja")
                {

                    if (home.SanPhamList.Count() > 0)
                    {
                        foreach (var item in home.SanPhamList)
                        {
                            item.Vi_MetaTitle = item.Eng_MetaTitle ?? item.Vi_MetaTitle;
                            item.Vi_MetaDescription = item.Eng_MetaDescription ?? item.Vi_MetaDescription;
                            item.Vi_MetaKeyword = item.Eng_MetaKeyword ?? item.Vi_MetaKeyword;
                            item.Vi_Title = item.Ja_Title ?? item.Vi_Title;
                            item.Vi_Content = item.Ja_Content ?? item.Vi_Content;
                            item.SeVi = item.SeJa ?? item.SeVi;
                        }
                    }
                }
                return View(home);
            }
        }

        public ActionResult Contact()
        {


            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
                var model = db.Addresses.ToList();
                foreach (var item in model)
                {
                    if (language.Name == "en-US")
                    {
                        item.Vi_Name = item.Eng_Name ?? item.Vi_Name;
                        item.Vi_Address = item.Eng_Address ?? item.Vi_Address;
                    }
                }
                return View(model);
            }
        }
        public ActionResult Diffrent()
        {
            using (var db = new angia_ivmEntities())
            {
                var language = System.Threading.Thread.CurrentThread.CurrentCulture;
                HomeIndexModel home = new HomeIndexModel();
                home.Lydo = db.Banners.FirstOrDefault(t => t.IsReason);
                if (language.Name == "en-US")
                {
                    home.Lydo.ImagePath = home.Lydo.ImagePath2 ?? home.Lydo.ImagePath;
                }
                return View(home);
            }
        }
        public ActionResult Oops()
        {
            return View();
        }
        public ActionResult Banner()
        {
            using (var db = new angia_ivmEntities())
            {
                var language = System.Threading.Thread.CurrentThread.CurrentCulture;
                HomeIndexModel home = new HomeIndexModel();
                home.ListBanner = db.Banners.Where(t => (t.IsLearn == false && t.IsPartner == false && t.IsPlay == false && t.IsWork == false && t.IsReason == false) || t.IsLydo).ToList();
                if (language.Name == "en-US")
                {
                    foreach (var item in home.ListBanner)
                    {
                        item.ImagePath = item.ImagePath2 ?? item.ImagePath;
                        item.Link = item.Link2;
                    }
                }
                return PartialView("~/views/Home/Banner.cshtml", home);
            }

        }
        public ActionResult Reason()
        {

            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
                HomeIndexModel home = new HomeIndexModel();
                //home.Lydo = db.Banners.FirstOrDefault(t => t.IsLydo);
                //if (language.Name == "en-US")
                //{
                //    home.Lydo.ImagePath = home.Lydo.ImagePath2 ?? home.Lydo.ImagePath;
                //}
                return PartialView("~/views/Home/Reason.cshtml", home);
            }

        }
        public JsonResult SendForm(ConfigMail model)
        {
            var success = "0";
            try
            {
                using (var Db = new angia_ivmEntities())
                {
                    Email em = new Email();
                    em.Name = model.Name;
                    em.Phone = model.Phone;
                    em.Email1 = model.Email;
                    em.Content = model.Body;
                    em.Project = Db.Projects.SingleOrDefault(t => t.Id == model.ProjectId).Vi_Title;
                    em.DateCreate = model.Date;
                    Db.Emails.Add(em);
                    Db.SaveChanges();
                    //var entity = Db.AboutUs.ToList().SingleOrDefault();
                    //MailMessage mail = new MailMessage();
                    //SmtpClient smtpServer = new SmtpClient("smtp.gmail.com");
                    //smtpServer.EnableSsl = true;
                    //smtpServer.Credentials = new System.Net.NetworkCredential("vuongthanhhost@gmail.com", "vuongthanh");
                    //smtpServer.Port = 587; // Gmail works on this port
                    //mail.From = new MailAddress(model.Email);
                    //mail.To.Add(entity.EmailReceive);
                    //mail.IsBodyHtml = true;
                    //mail.Subject = "Đăng Ký Tham Quan Nhà Mẫu";
                    //mail.Body = "<p style=\"font: 700 14px bold;\">Người Gửi:" + model.Name + "</p>" +
                    //                 "<p style=\"font: 700 14px bold;\"> Email  :" + model.Email + "</p>" +
                    //                      "<p style=\"font: 700 14px bold;\"> Sdt  :" + model.Phone + "</p>" +
                    //                      "<p style=\"font: 700 14px bold;\"> Địa chỉ:" + model.Address + "</p>" +
                    //                       "<p style=\"font: 700 14px bold;\"> Dự Án:" + em.Project + "</p>" +
                    //                "<p style=\"font: 700 14px bold;\">Nội dung:  </p>" + model.Body;
                    //smtpServer.Send(mail);
                    success = "1";
                }
            }
            catch (Exception ex)
            {
                success = "0";
            }
            return Json(success, JsonRequestBehavior.AllowGet);

        }
        public JsonResult SendMail(ConfigMail model)
        {
            var success = "0";
            try
            {
                using (var Db = new angia_ivmEntities())
                {
                    var entity = Db.AboutUs.ToList().SingleOrDefault();
                    MailMessage mail = new MailMessage();
                    SmtpClient smtpServer = new SmtpClient("smtp.gmail.com");
                    smtpServer.EnableSsl = true;
                    smtpServer.Credentials = new System.Net.NetworkCredential("vuongthanhhost@gmail.com", "vuongthanh");
                    smtpServer.Port = 587; // Gmail works on this port
                    mail.From = new MailAddress(model.Email);
                    mail.To.Add(entity.EmailReceive);
                    mail.IsBodyHtml = true;
                    mail.Subject = "Phản hồi từ khách hàng";
                    mail.Body = "<p style=\"font: 700 14px bold;\">Người Gửi:" + model.Name + "</p>" +
                                     "<p style=\"font: 700 14px bold;\"> Email  :" + model.Email + "</p>" +
                                          "<p style=\"font: 700 14px bold;\"> Sdt  :" + model.Phone + "</p>" +
                                          "<p style=\"font: 700 14px bold;\"> Địa chỉ:" + model.Address + "</p>" +

                                    "<p style=\"font: 700 14px bold;\">Nội dung:  </p>" + model.Body;
                    smtpServer.Send(mail);
                    success = "1";
                }
            }
            catch
            {
                success = "0";
            }
            return Json(success, JsonRequestBehavior.AllowGet);

        }

        public JsonResult SendInfo(string name, string email, string company, string phone, string subject, string content, string captcharesponse)
        {
            var success = "1";
            if (Validate.Check(captcharesponse) == false)
            {
                success = "Vui lòng kiểm tra lại captcha";
                return Json(success, JsonRequestBehavior.AllowGet);
            }
            try
            {
                subject = removeXss(subject);
                content = removeXss(content);
                company = removeXss(company);
                phone = removeXss(phone);
                name = removeXss(name);
                email = removeXss(email);

                if (content != "" && subject != "" && phone != "" && email != "" && name != "")
                {
                    using (var Db = new QLDN_QLNS_DEMOEntities())
                    {
                        Issue em = new Issue();
                        em.KhachHangId = Convert.ToInt32(name);
                        em.LoaiIssue = 3;
                        em.MaTrangThai = "1";
                        em.NguoiTao = 0;
                        em.NguoiXuLy = 0;
                        em.CtrVersion = 1;
                        em.XoaYn = "N";
                        em.NgayDeNghi = DateTime.Now;
                        em.NgayTao = DateTime.Now;
                        em.TieuDe = subject;
                        em.MoTa = content;
                        em.Email = email;
                        em.DiDong = phone;
                        em.NguoiLienHe = company;
                        Db.Issues.Add(em);
                        Db.SaveChanges();
                    }
                }


                return Json(success, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                success = "Có lỗi xảy ra,vui lòng thử lại sau";
                return Json(success, JsonRequestBehavior.AllowGet);
            }



        }

        public string removeXss(string text)
        {
            var cv = Regex.Replace(text, "<.*?>", String.Empty);
            Regex rRemScript = new Regex(@"<script[^>]*>[\s\S]*?</script>");
            cv = rRemScript.Replace(cv, "");
            return cv;
        }
        public ActionResult TestMap()
        {

            return View();

        }
        public JsonResult GetMap(string idgroup, string iddis)
        {


            var db = new angia_ivmEntities();
            MapIndexModel map = new MapIndexModel();
            if (iddis != null)
            {
                var dis = Convert.ToInt32(iddis);
                map.customer = db.Customers.Where(t => t.GroupId == dis).ToList();
            }
            else
            {
                var gr = Convert.ToInt32(idgroup);
                map.district = db.Districts.Where(t => t.GroupId == gr).OrderByDescending(t => t.IsMainGroup).ToList();
                var id = map.district.FirstOrDefault().Id;
                map.customer = db.Customers.Where(t => t.GroupId == id).ToList();
            }
            return Json(map, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Support()
        {
            ViewBag.error = TempData["error"];
            return View();
        }
        public ActionResult Send(ConfigSupport model)
        {
            try
            {
                using (var Db = new angia_ivmEntities())
                {
                    var name = "Teamviewer";
                    var entity = Db.AboutUs.ToList().SingleOrDefault();
                    MailMessage mail = new MailMessage();
                    SmtpClient smtpServer = new SmtpClient("smtp.gmail.com");
                    smtpServer.EnableSsl = true;
                    smtpServer.Credentials = new System.Net.NetworkCredential("ehis.vn@gmail.com", "Songan.vn");
                    smtpServer.Port = 587; // Gmail works on this port
                    mail.From = new MailAddress("ehis.vn@gmail.com");
                    mail.To.Add(entity.EmailSent);
                    mail.IsBodyHtml = true;
                    if (model.optradio == "2")
                    {
                        name = "Anydesk";
                        mail.Subject = model.name + " Yêu cầu hỗ trợ phần mềm bằng " + name;
                        mail.Body = "<p style=\"font: 700 14px bold;\">Người Gửi:" + model.name + "</p>" +
                                              "<p style=\"font: 700 14px bold;\"> Số điện thoại  :" + model.sdt + "</p>" +
                                              "<p style=\"font: 700 14px bold;\"> Cơ quan:" + model.coquan + "</p>" +
                                              "<p style=\"font: 700 14px bold;\"> Id Anydesk:" + model.idmay + "</p>" +
                                              "<p style=\"font: 700 14px bold;\">Nội dung yêu cầu hỗ trợ:  </p>" + model.noidung;
                    }
                    else
                    {
                        mail.Subject = model.name + " Yêu cầu hỗ trợ phần mềm bằng " + name;
                        mail.Body = "<p style=\"font: 700 14px bold;\">Người Gửi:" + model.name + "</p>" +
                                              "<p style=\"font: 700 14px bold;\"> Số điện thoại : " + model.sdt + "</p>" +
                                              "<p style=\"font: 700 14px bold;\"> Cơ quan: " + model.coquan + "</p>" +
                                              "<p style=\"font: 700 14px bold;\"> Id máy: " + model.idmay + "</p>" +
                                              "<p style=\"font: 700 14px bold;\"> Mật khẩu teamviewer: " + model.pass + "</p>" +
                                              "<p style=\"font: 700 14px bold;\">Nội dung yêu cầu hỗ trợ:  </p>" + model.noidung;
                    }
                    smtpServer.Send(mail);
                }
                TempData["error"] = "Phản hồi đã được gửi thành công,bộ phận hỗ trợ sẽ liên lạc trong thời gian sớm nhất";
            }
            catch
            {

            }
            return RedirectToAction("Support", "Home");

        }
        public ActionResult GetItemList(string term)
        {
            term = removeXss(term);

            using (var db = new QLDN_QLNS_DEMOEntities())
            {

                var itemList = (from items in db.KhachHangs where items.Ten.ToLower().Contains(term.ToLower()) || items.Email.ToLower().Contains(term.ToLower()) || items.DienThoai.ToLower().Contains(term.ToLower()) || items.DiDong.ToLower().Contains(term.ToLower()) select new { value = items.Ten, id = items.KhachHangId, email = items.Email, dienthoai = items.DienThoai ?? items.DiDong }).ToList();
                return Json(itemList, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult Guidanhgia(string ma, string email, string company)
        {
            using (var db = new QLDN_QLNS_DEMOEntities())
            {
                string back = "1";
                try
                {
                    MailMessage message = new MailMessage();
                    message.From = new MailAddress("support@ehis.vn", "Công Ty Song Ân");
                    message.To.Add(new MailAddress(email));
                    message.Subject = "Ehis Song Ân gửi bảng đánh giá chất lượng hỗ trợ khách hàng và chất lượng phần mềm Ehis";
                    message.IsBodyHtml = true;
                    message.BodyEncoding = System.Text.Encoding.GetEncoding("utf-8");
                    var html = "";
                    html += "<div style='max-width:800px;margin:0px auto;border:1px solid #0082c9;font-family:Arial;'>";
                    html += "<div style='border-bottom:1px solid #0082c9;'></div>";
                    html += "<div style='font-size:13px; font-family:Arial;'>";
                    html += "<h3 style='color:#fff; background-color:#0082c9; font-family:Arial; padding:8px 40px; margin:0px; text-align:center; text-shadow: 1px 2px 0px #333;'>Mail Phản Hồi</h3>";
                    html += "<div style='padding:10px 30px;font-size:13px; font-family:Arial;'>";
                    html += "<p style='font-size:13px; font-family:Arial; margin-top:20px;'><b>Kính gửi khách hàng</b></p>";
                    html += "<p style='text-align:justify;font-size:13px; font-family:Arial;'>Công ty <b>TNHH Sản Xuất Thương Mại và Dịch Vụ Song Ân</b> xin chân thành cảm ơn bạn đã sử dụng dịch vụ của công ty chúng tôi.</p>";
                    html += "<p style='text-align:justify;font-size:13px; font-family:Arial;'><b>Song Ân</b> xin gửi bạn bảng đánh giá chất lượng hỗ trợ khách hàng và chất lượng phần mềm </p> <a href='https://docs.google.com/a/ehis.vn/forms/d/1t5lGEa9EaOaoMoRLuJsRDQUHPixpsA005Xgop0FQvxs/viewform?edit_requested=true'>Bảng đánh giá</a>";
                    html += "</div></div>";
                    html += "<div><h4 style='color:#fff; background-color:#0082c9; font-family:Arial; padding:8px 40px; margin-bottom:0px;text-shadow: 1px 2px 0px #333;'>Công ty TNHH SX TM và DV Song Ân</h4>";
                    html += "<div style='line-height:20px; font-size:13px; position:relative;'>";
                    html += "<table style='width:100%;' cellspacing='0' cellpadding='0'><tr><td>";
                    html += "<div style='line-height:20px; font-size:13px; position:relative; padding-left:30px'>";
                    html += "<p style='margin:8px 0px;font-size:13px; font-family:Arial'>Trụ Sở Chính: <b>SONG ÂN</b></p>";
                    html += "382/42 Quang Trung - Phường 10 - Quận Gò Vấp - TP. Hồ Chí Minh.<br />Điện Thoại: <i>(84-8) 6257 1675</i><br />Fax: <i>(84-8) 6257 1675</i><br />Hotline: <i>098 66 743 55</i><br />";
                    html += "Website:<a href='http://ehis.vn' title='ehis.vn'>http://ehis.vn</a><br />Facebook:<a href='https://www.facebook.com/EHIS.SONGAN' title='facebook'>https://www.facebook.com/EHIS.SONGAN</a><br />";
                    html += "</div></td><td style='text-align: right;line-height: 0px;width:256px'></td></tr></table>";
                    html += "</div></div></div>";
                    message.Body = html;
                    SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
                    smtp.UseDefaultCredentials = true;
                    smtp.Credentials = new System.Net.NetworkCredential("support@ehis.vn", "ehis.songan@2an");
                    smtp.EnableSsl = true;
                    smtp.Send(message);
                    // //update
                    int id = Convert.ToInt32(ma);
                    var model = db.Issues.FirstOrDefault(t => t.IssueId == id);
                    model.MaTrangThai = "5";
                    var entry = db.Entry(model);
                    entry.Property(e => e.MaTrangThai).IsModified = true;
                    db.SaveChanges();
                    return Json(back, JsonRequestBehavior.AllowGet);
                }
                catch (Exception ex)
                {
                    back = "Gửi thất bại";
                    return Json(back, JsonRequestBehavior.AllowGet);
                }

            }
        }
        public ActionResult GetItemListById(string id, string tungay, string denngay)
        {
            DateTime tu = Convert.ToDateTime(tungay);
            DateTime den = Convert.ToDateTime(denngay);

            using (var db = new QLDN_QLNS_DEMOEntities())
            {
                var ma = Convert.ToInt32(id);
                string sql = "select a.IssueId,a.NguoiLienHe,a.Email, CONVERT( VARCHAR(30),a.ngaytao,105)+ ' ' +  CONVERT( VARCHAR(30),a.NgayTao ,108 ) as ngaydenghi,a.tieude,a.matrangthai,case when a.huongxuly IS NULL then N'Chưa có' else a.huongxuly end as huongxuly ,a.mota,b.trangthai,case when c.ten IS NULL then N'Chưa có' else c.Ho +' '+c.Ten   end as nguoixuly  from issue a left join trangthai b on a.matrangthai=b.MaTrangThai and b.chucnang='Issue' left join nhanvien c on c.nhanvienid=a.nguoixuly where a.ngaytao >= CONVERT(DATETIME, '" + tu.ToShortDateString() + "',103) and a.ngaytao <= CONVERT(DATETIME, '" + den.AddDays(1).ToShortDateString() + "',103) and a.khachhangid=" + ma + "";
                var itemList = db.Database.SqlQuery<ListHoTro>(sql).ToList();
                return Json(itemList, JsonRequestBehavior.AllowGet);
            }
        }

    }
}
public class Validate
{
    public static bool Check(string response)
    {
        //string Response = HttpContext.Current.Request.QueryString["g-recaptcha-response"];//Getting Response String Append to Post Method
        bool Valid = false;
        //Request to Google Server
        HttpWebRequest req = (HttpWebRequest)WebRequest.Create
        ("https://www.google.com/recaptcha/api/siteverify?secret=6Le9DiUUAAAAAB8rzIj5xPpAN4czpZFKBepY8yvG&response=" + response);
        try
        {
            //Google recaptcha Response
            using (WebResponse wResponse = req.GetResponse())
            {

                using (StreamReader readStream = new StreamReader(wResponse.GetResponseStream()))
                {
                    string jsonResponse = readStream.ReadToEnd();

                    JavaScriptSerializer js = new JavaScriptSerializer();
                    MyObject data = js.Deserialize<MyObject>(jsonResponse);// Deserialize Json

                    Valid = Convert.ToBoolean(data.success);
                }
            }

            return Valid;
        }
        catch (WebException ex)
        {
            throw ex;
        }
    }
}

public class MyObject
{
    public string success { get; set; }
}
public class ListHoTro
{
    public string ngaydenghi { get; set; }
    public string tieude { get; set; }
    public int IssueId { get; set; }
    public string Email { get; set; }
    public string trangthai { get; set; }
    public string matrangthai { get; set; }
    public string nguoixuly { get; set; }
    public string huongxuly { get; set; }
    public string NguoiLienHe { get; set; }
    public string mota { get; set; }

}