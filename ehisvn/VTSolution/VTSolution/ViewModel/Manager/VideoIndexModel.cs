using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VTSolution.ViewModel.Manager
{
    public class VideoIndexModel
    {
        [HiddenInput(DisplayValue = false)]
        public int Id { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string Vi_Title { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string Eng_Title { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string Link { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string GroupName { get; set; }
        public int OrderBy { get; set; }
    }
}