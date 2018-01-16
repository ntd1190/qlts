using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VTSolution.Models;
namespace VTSolution.ViewModel.Customer
{
    public class CustomerIndexModel
    {
        public List<GroupDistrict> groupdist { get; set; }
        public List<District> district { get; set; }
        public List<VTSolution.Models.Customer> customer { get; set; }
    }
    public class MapIndexModel
    {
        public List<District> district { get; set; }
        public List<VTSolution.Models.Customer> customer { get; set; }
        public int idgroup { get; set; }
        public int iddistrict { get; set; }
    }
}