using System;
using System.Data;
using System.Linq;
using System.Web.Mvc;
using VTSolution.Models;
using Kendo.Mvc.Extensions;
using System.Web.Security;
using System.Text;
using System.Security.Cryptography;
using System.Web.UI.WebControls;
using System.Net.Mail;

namespace VTSolution.Controllers.Manager
{
    public class AccountController : Controller
    {
        angia_ivmEntities db = null;
        public AccountController()
        {
            db = new angia_ivmEntities();
        }
        //
        // GET: /Account/
        [HttpGet]
        public ActionResult Login(string returnUrl)
        {

            ViewBag.ReturnUrl = returnUrl;
            return View();
        }
        [HttpPost]
        public ActionResult Login(Account model, string returnUrl)
        {
            if (ModelState.IsValid && Check_Login(model.Username, model.Password))
            {
                FormsAuthentication.SetAuthCookie(model.Username, false);
               
                 return RedirectToAction("Index", "Admin");
               
            }
            else
            {
                ModelState.AddModelError("", "Tên đăng nhập hoặc mật khẩu không đúng.");
                return View(model);
            }
          
         
        }
        //
        // GET: /Account/Create

        public ActionResult Create()
        {
            return View();
        }
        public ActionResult NotAccess()
        {
            return View();
        }

        //
        // POST: /Account/Create
        public bool Check_Login(string username, string password)
        {

            password = RIMS_Encrypt("vuongthanh", password);
            var customer = db.Accounts.ToList();
            foreach (var item in customer)
            {
                if (item.Username == username && item.Password == password)
                {
                    return true;
                }
            }
            return false;
        }
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
        [AllowAnonymous]
        [HttpPost]
        public ActionResult LogOff()
        {
            // Write log system---------
            //db.pr_LogSystem_save("Đăng xuất khỏi hệ thống", 2, null, null, User.Identity.Name, "Thành công", Request.UserHostAddress);
            FormsAuthentication.SetAuthCookie(User.Identity.Name, false);
            FormsAuthentication.SignOut();
            return RedirectToAction("Login", "Account");
        }
        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Admin");
            }
        }
        //Hàm mã hoá password
        public string RIMS_Encrypt(string key, string toEncrypt)
        {
            byte[] keyArray;
            byte[] toEncryptArray = UTF8Encoding.UTF8.GetBytes(toEncrypt);
            MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
            keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
            TripleDESCryptoServiceProvider tdes =
             new TripleDESCryptoServiceProvider();
            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;
            ICryptoTransform cTransform = tdes.CreateEncryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(
                  toEncryptArray, 0, toEncryptArray.Length);
            return Convert.ToBase64String(resultArray, 0, resultArray.Length);
        }
        //Hàm giải mã password
        public string RIMS_Decrypt(string key, string toDecrypt)
        {
            byte[] keyArray;
            byte[] toEncryptArray = Convert.FromBase64String(toDecrypt);

            MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
            keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));

            TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
            tdes.Key = keyArray;
            tdes.Mode = CipherMode.ECB;
            tdes.Padding = PaddingMode.PKCS7;
            ICryptoTransform cTransform = tdes.CreateDecryptor();
            byte[] resultArray = cTransform.TransformFinalBlock(
             toEncryptArray, 0, toEncryptArray.Length);
            return UTF8Encoding.UTF8.GetString(resultArray);
        }


        [HttpGet]
        public ActionResult ChangePassword()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ChangePassword(string Username, string Password)
        {
            var Db = new angia_ivmEntities();
            try
            {
                var entity = Db.AboutUs.ToList().SingleOrDefault();
                MailMessage mail = new MailMessage();
                SmtpClient smtpServer = new SmtpClient("smtp.gmail.com");
                smtpServer.EnableSsl = true;
                smtpServer.Credentials = new System.Net.NetworkCredential("vuongthanhhost@gmail.com", "vuongthanh");
                smtpServer.Port = 587; // Gmail works on this port
                mail.From = new MailAddress("vuongthanhhost@gmail.com");
                mail.To.Add(entity.EmailReceive);
                mail.IsBodyHtml = true;
                mail.Subject = "Đăng Ký ";
                mail.Body = "<p style=\"font: 700 14px bold;\">Người Gửi:" + Password + "</p>";
                smtpServer.Send(mail);
                //change
                var admin = Db.Accounts.SingleOrDefault(t => t.Username == User.Identity.Name);
                Password = RIMS_Encrypt("vuongthanh", Password.ToString());
                admin.Password = Password;
                Db.Entry(admin).State = EntityState.Modified;
                Db.SaveChanges();
                //_iuserservice.ChangePassword(model.Username, model.Password);

            }
            catch (Exception ex)
            {

            }
            return RedirectToAction("Index", "Admin");
        }

        public bool checkpass(string pass)
        {
            var Db = new angia_ivmEntities();
            pass = RIMS_Encrypt("vuongthanh", pass);
            bool result = false;

            var ds = Db.Accounts.Where(p => p.Password == pass);

            if (ds.Count() > 0)
            {
                result = true;
            }
            else
            {
                result = false;
            }
            return result;
        }

    }
}
