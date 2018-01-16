using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VTSolution.Models;
namespace VTSolution.ViewModel.Manager
{
    public class ImageIndexModel
    {
        public int Id { get; set; }
        public string Album { get; set; }
        public string Vi_Name { get; set; }
        public string Eng_Name { get; set; }
        public string ImagePath { get; set; }
        public string DateCreate { get; set; }
        public List<Image> ListImage { get; set; }
        public int Count { get; set; }
        public int OrderBy { get; set; }
    }
    public class ImageSon
    {
        public int ? ParentId { get; set; }
        public string ImagePath { get; set; }
    }
}