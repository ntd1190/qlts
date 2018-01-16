using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VTSolution.ViewModel.Manager
{
    public class FeatureSonIndexModel
    {
        [HiddenInput(DisplayValue = false)]
        public int Id { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string vi_Name { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string eng_Name { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string Value { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string Parent { get; set; }
        [HiddenInput(DisplayValue = false)]
        public int? IdParent { get; set; }
        public int OrderBy { get; set; }
    }
}