using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VTSolution.Models;

namespace VTSolution.ViewModel.Manager
{
    public class Album_Image
    {
        public List<Image> ListImage { get; set; }
        public GroupImage Album { get; set; }
        public string ImagePath { get; set; }
        public List<string> ImagePath1 { get; set; }
    }
}