using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VTSolution.ViewModel.Manager
{
    public class LogIndexModel
    {
        public int Id { get; set; }
        public DateTime? Datecreate { get; set; }
        public string Error { get; set; }
        public string Feature { get; set; }
    }
}