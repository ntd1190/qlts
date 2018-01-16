using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace VTSolution.ViewModel.Customer
{
    public class RegistrationModel
    {
        // Here typeof(Resource) is The File Name Start With for resources
        public string UserName { get; set; }

        public string PassWord { get; set; }

    }
}