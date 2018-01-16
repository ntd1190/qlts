using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VTSolution.Models;
namespace VTSolution.ViewModel.Customer
{
    public class RecruitmentIndexModel
    {
        public List<Recruitment> ListRecruitment { get; set; }
        public Recruitment Detail { get; set; }
        public List<Partner> Partner { get; set; }
        public Banner KhacBiet { get; set; }
    }
}