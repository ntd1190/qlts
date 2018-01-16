using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VTSolution.Models;

namespace VTSolution.ViewModel.Customer
{
    public class FileIndexModel
    {
        public List<GroupFile> ListGroupFile { get; set; }
        public List<File> ListFile { get; set; }
    }
}