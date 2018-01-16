using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VTSolution.Models;

namespace VTSolution.ViewModel.Customer
{
    public class HomeIndexModel
    {
        public List<Banner> ListBanner { get; set; }
        public Banner Lydo { get; set; }
        public List<Partner> Partner { get; set; }
        public AboutU About { get; set; }
        public List<News> News { get; set; }
        public List<Project> Product { get; set; }



    }
}