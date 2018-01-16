using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VTSolution.Models;

namespace VTSolution
{
    public class Helper
    {

        public static List<MenuAdmin> GetMenuAdmin()
        {
            using (var db = new angia_ivmEntities())
            {
                return db.MenuAdmins.Where(t => t.ParentId == null && t.IsDisable == true).OrderBy(t => t.Sequence).ToList();
            }
        }
        public static File getfile()
        {
            using (var db = new angia_ivmEntities())
            {
                return db.Files.FirstOrDefault();
            }
        }
        public static List<MenuAdmin> GetMenuChild(int id)
        {
            using (var db = new angia_ivmEntities())
            {
                return db.MenuAdmins.Where(t => t.ParentId == id).OrderBy(t => t.Sequence).ToList();
            }
        }
        public static AboutU GetData()
        {
            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
                var model = db.AboutUs.FirstOrDefault();
                if (language.Name == "en-US")
                {
                    model.Address = model.Eng_Address ?? model.Address;
                    model.Slogan = model.Eng_Slogan ?? model.Slogan;
                    model.Vi_Company = model.Eng_Company ?? model.Vi_Company;
                    model.SloganStaff = model.Eng_SloganStaff ?? model.SloganStaff;
                    model.SloganAlbum = model.Eng_SloganAlbum ?? model.SloganAlbum;
                    model.SloganReason = model.Eng_SloganReason ?? model.SloganReason;
                    model.Vi_Product = model.Eng_Product ?? model.Vi_Product;
                }
                else if (language.Name == "ja")
                {
                    model.Address = model.Ja_Address ?? model.Address;
                    model.Slogan = model.Ja_Slogan ?? model.Slogan;
                    model.Vi_Company = model.Ja_Company ?? model.Vi_Company;
                    model.SloganStaff = model.Ja_SloganStaff ?? model.SloganStaff;
                    model.SloganAlbum = model.Ja_SloganAlbum ?? model.SloganAlbum;
                    model.SloganReason = model.Ja_SloganReason ?? model.SloganReason;
                    model.Vi_Product = model.Ja_Product ?? model.Vi_Product;
                }
                return model;
            }
        }
        public static AboutU GetData1()
        {
            using (var db = new angia_ivmEntities())
            {
                return db.AboutUs.Where(t => t.IsDisable == false).FirstOrDefault();
            }
        }
        public static Banner GetLogo()
        {
            using (var db = new angia_ivmEntities())
            {
                return db.Banners.SingleOrDefault(t => t.IsLogo);
            }
        }
        public static Banner GetBanner()
        {
            using (var db = new angia_ivmEntities())
            {
                var model = db.Banners.FirstOrDefault(t => t.Isbanner);
                return model;
            }
        }
        public static List<Introduce> GetIntroduces()
        {
            using (var db = new angia_ivmEntities())
            {
                var model = db.Introduces.ToList();
                return model;
            }
        }
        public static List<Project> GetProduct()
        {
            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
                var model = db.Projects.ToList();
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
                return model;
            }
        }
        public static Introduce Getnews()
        {
            var language = System.Threading.Thread.CurrentThread.CurrentCulture;
            using (var db = new angia_ivmEntities())
            {
                var model = db.Introduces.SingleOrDefault(t => t.Id == 14);
                if (language.Name == "en-US")
                {
                    model.Vi_Title = model.Eng_Title;
                    model.Vi_Content = model.Eng_Content;
                    model.Vi_MetaTitle = model.Eng_MetaTitle;
                    model.Vi_MetaDescription = model.Eng_MetaDescription;
                    model.Vi_MetaKeyword = model.Eng_MetaKeyword;

                }
                return model;
            }
        }
       
    }
}