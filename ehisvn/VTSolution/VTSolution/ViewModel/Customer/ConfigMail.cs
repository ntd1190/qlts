using System;

namespace ProjectWeb.ViewModel.User
{
    public class ConfigMail
    {
        public string Email { set; get; }
        public string Subject { set; get; }
        public string Body { set; get; }
        public string Name { set; get; }
        public string Address { set; get; }
        public string Phone { set; get; }
        public string From { get; set; }
        public string To { get; set; }
        public string Password { get; set; }
        public string Check { get; set; }
        public string Date { get; set; }
        public int ProjectId { get; set; }
    }
    public class ConfigSupport
    {
        public string name { get; set; }
        public string sdt { get; set; }
        public string coquan { get; set; }
        public string idmay { get; set; }
        public string noidung { get; set; }
        public string pass { get; set; }
        public string optradio { get; set; }
    }
}