using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VTSolution.Models;

namespace VTSolution.ViewModel.Manager
{
    public class Product_Image
    {
        public List<ProductImage> ListImage { get; set; }
        public Product product { get; set; }
        public string ImagePath { get; set; }
        public List<string> ImagePath1 { get; set; }
    }
}