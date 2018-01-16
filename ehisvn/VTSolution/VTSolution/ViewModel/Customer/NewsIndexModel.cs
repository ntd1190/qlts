using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VTSolution.Models;

namespace VTSolution.ViewModel.Customer
{
    public class NewsIndexModel
    {
        public List<News> ListNews { get; set; }
        public List<Group> ListGroupNews { get; set; }
        public News News { get; set; }
        public Recruitment Recruitment { get; set; }

    }
}