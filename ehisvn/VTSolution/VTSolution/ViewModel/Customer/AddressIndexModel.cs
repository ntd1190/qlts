using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using VTSolution.Models;
namespace VTSolution.ViewModel.Customer
{
    public class AddressIndexModel
    {
        public List<Address> ListMap { get; set; }
        public List<Staff> ListStaff { get; set; }
        public List<GroupStaff> ListGroupStaff { get; set; }
        public List<Position> ListPosition { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Skype { get; set; }
        public string Yahoo { get; set; }
        public string Phone { get; set; }
    }
    public class AddressModelJson
    {
        public int Id { get; set; }
        public string Vi_Name { get; set; }
        public string Eng_Name { get; set; }
    }
}