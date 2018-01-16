using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VTSolution.Models;
namespace VTSolution.ViewModel.Manager
{
    public class ListIndexModel
    {
        public int IdProduct { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Eng_Name { get; set; }
        public int? IdParent { get; set; }
        public string Vi_Value { get; set; }
        public string Eng_Value { get; set; }
        public DateTime? DateProduct { get; set; }

    }
    public class ProductModel
    {
        public int Id { get; set; }
        public string Vi_Name { get; set; }
        public string Eng_Name { get; set; }
        public string ImagePath { get; set; }
        public int GroupId { get; set; }
        public string Vi_Description { get; set; }
        public string Eng_Description { get; set; }
        public string Vi_Content { get; set; }
        public string Eng_Content { get; set; }
        public bool IsShowHome { get; set; }
        public bool IsDisable { get; set; }
        public string Code { get; set; }
        public string Price { get; set; }
        public string Eng_Price { get; set; }
        public string Vi_HotFeature { get; set; }
        public string Eng_HotFeature { get; set; }
        public int IdTechnology { get; set; }
        public int IdFeature { get; set; }
        public int IdStatus { get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime DateUpdate { get; set; }
        public int OrderBy { get; set; }

    }
    public class ProductImageModel
    {
        public int ProductId { get; set; }
        public string ImagePath { get; set; }
    }
    public class ProductFileName
    {
        public int ProductId { get; set; }
        public int File { get; set; }
    }

}