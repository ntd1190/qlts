using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VTSolution.ViewModel.Customer
{
    public class MailIndexModel
    {
        public string phone { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string content { get; set; }
        public string companyname { get; set; }
        public string CaptchaText { get; set; }
    }
}