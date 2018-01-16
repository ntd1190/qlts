using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VTSolution.ViewModel.Manager
{
    public class EmailIndexModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Content { get; set; }
        public string DateCreate { get; set; }
        public string Project { get; set; }
    }
}