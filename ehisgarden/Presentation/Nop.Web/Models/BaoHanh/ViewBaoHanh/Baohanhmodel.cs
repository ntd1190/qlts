using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Nop.Web.Models.BaoHanh.ViewBaoHanh
{
    public class Baohanhmodel
    {
        public int MACNT { get; set; }
        public string TENKHACHHANG { get; set; }
        public string DIENTHOAI { get; set; }
        public string SOPHIEU { get; set; }
        public DateTime? NGAYXUAT { get; set; }
        public string TENHANGHOA { get; set; }
        public string TENHANGSANXUAT { get; set; }
     
        public DateTime? NGAYHETHANBAOHANH { get; set; }
        public string THOIGIANBAOHANHCONLAI { get; set; }
    }
}