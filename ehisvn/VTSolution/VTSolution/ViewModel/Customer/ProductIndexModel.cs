using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VTSolution.Models;
namespace VTSolution.ViewModel.Customer
{
    public class ProductIndexModel
    {
        public List<GroupProduct> ListGroup { get; set; }
        public List<Product> ListProduct { get; set; }
        public List<Digital> Digital { get; set; }
        public Product Pro { get; set; }
        public int Id { get; set; }
        public string Vi_Name { get; set; }
        public string Eng_Name { get; set; }
        public string ImagePath { get; set; }
        public string Code { get; set; }
        public int? GroupId { get; set; }
        public DateTime? DateCreate { get; set; }
    }
    public class Productsd
    {
        public int Id { get; set; }
        public string Vi_Name { get; set; }
        public string Eng_Name { get; set; }
        public string ImagePath { get; set; }
        public string Code { get; set; }
    }
    public class DigitalProduct
    {
        public string Vi_Value { get; set; }
        public string Eng_Value { get; set; }
        public int? GroupId { get; set; }
    }
  
}