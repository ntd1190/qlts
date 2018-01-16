using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VTSolution.ViewModel.Manager
{
    public class BannerIndexModel
    {
        [HiddenInput(DisplayValue = false)]
        public int Id { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string Name { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string ImagePath { get; set; }
        [HiddenInput(DisplayValue = false)]
        public bool? IsDelete { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string Link { get; set; }
        public int OrderBy { get; set; }
    }
    public class DistrictIndexModel
    {
        public int Id { get; set; }
        public string Vi_Name { get; set; }
        public string Eng_Name { get; set; }
    }
}