using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VTSolution.Models;
namespace VTSolution.ViewModel.Customer
{
    public class ProductDetailIndexModel
    {
        public Product ProductDetail { get; set; }
        public List<Product> RelateProduct { get; set; }
        public List<ProductFile> ProductFile { get; set; }
    //public List<File> File { get; set; }
  }
}