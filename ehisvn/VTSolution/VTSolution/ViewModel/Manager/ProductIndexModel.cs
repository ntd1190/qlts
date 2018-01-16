using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VTSolution.Models;
namespace VTSolution.ViewModel.Manager
{
    public class ProductIndexModel
    {
        public int Id { get; set; }
        public string Vi_Name { get; set; }
        public string Eng_Name { get; set; }
        public string ImagePath { get; set; }
        public string Vi_Description { get; set; }
        public string Eng_Description { get; set; }
        public bool IsShowHome { get; set; }
        public bool IsHot { get; set; }
        public string Vi_Content { get; set; }
        public string Eng_Content { get; set; }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
        public string Vi_Hotfeature { get; set; }
        public string Eng_Hotfeature { get; set; }
        public string Vi_Digital { get; set; }
        public string Eng_Digital { get; set; }
        public int? OrderBy { get; set; }
    }
  
}