using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VTSolution.ViewModel.Manager
{
    public class IntroduceIndexModel
    {
        public int Id { get; set; }
        public string Vi_Title { get; set; }
        public string Eng_Title { get; set; }
        public string Vi_Description { get; set; }
        public string Eng_Description { get; set; }
        public string Vi_Content { get; set; }
        public string Eng_Content { get; set; }
        public string ImageHome { get; set; }
        public bool IsHot { get; set; }
        public bool IsShowHome { get; set; }
        public bool IsDisable { get; set; }
        public bool IsDelete { get; set; }
        public DateTime DateCreate { get; set; }
        public DateTime DateUpdate { get; set; }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
    }
}