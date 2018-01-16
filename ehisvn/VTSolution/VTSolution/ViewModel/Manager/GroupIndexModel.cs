using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VTSolution.ViewModel.Manager
{
    public class GroupIndexModel
    {
        [HiddenInput(DisplayValue = false)]
        public int Id { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string Name { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string DateCreate { get; set; }
        public int OrderBy { get; set; }
    }
}