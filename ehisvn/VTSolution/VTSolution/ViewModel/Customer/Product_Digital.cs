using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VTSolution.Models;
namespace VTSolution.ViewModel.Customer
{
    public class Product_Digital
    {
        public Product Product { get; set; }
        public List<Digital> ListDigital { get; set; }
    }
    public class Productst
    {
        public int Id { get; set; }
        public string Vi_Name { get; set; }
        public string Eng_Name { get; set; }
        public string ImagePath { get; set; }
        public string Code { get; set; }
    }
}