using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VTSolution.Models;
namespace VTSolution.ViewModel.Customer
{
    public class IntroduceIndexModel
    {
        public Introduce TamNhin { get; set; }
        public Introduce SuMenh { get; set; }
        public Introduce ThongDiep { get; set; }
        public Introduce Gioithieu { get; set; }
        public Project SanPham { get; set; }
        public List<GroupPartner> Partner { get; set; }
        public List<Project> SanPhamList { get; set; }
        public List<News> News { get; set; }
        public List<Recruitment> Recruitment { get; set; }
        public List<GroupStaff> Staff { get; set; }
        public List<GroupImage> Image { get; set; }
        public List<Banner> Banner { get; set; }
    }
}