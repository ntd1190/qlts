using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VTSolution.ViewModel.Manager
{
    public class ImageDetailModel
    {
        [HiddenInput(DisplayValue = false)]
        public int Id { get; set; }
        [HiddenInput(DisplayValue = false)]
        public string ImagePath { get; set; }
        [HiddenInput(DisplayValue = false)]
        public int? GroupId { get; set; }
        public int OrderBy { get; set; }
    }
    public class ImageModel
    {
       
        public string ImagePath { get; set; }
        [HiddenInput(DisplayValue = false)]
        public int OrderBy { get; set; }
    }
    public class AlbumVm
    {
        public string ImagePath { get; set; }
        public int GroupId { get; set; }
    }
}