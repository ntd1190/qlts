using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VTSolution.Models;
namespace VTSolution.ViewModel.Customer
{
    public class ProjectIndexModel
    {
        public Project Project { get; set; }
        public List<GroupImage> Album { get; set; }
        public List<Video> Video { get; set; }
      
        public List<News> NewsProject { get; set; }
        public string[] Phone { get; set; }
        public List<Project> Related { get; set; }
    }
}