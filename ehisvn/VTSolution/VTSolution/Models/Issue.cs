//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace VTSolution.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Issue
    {
        public int IssueId { get; set; }
        public int KhachHangId { get; set; }
        public Nullable<System.DateTime> NgayTao { get; set; }
        public string NguoiLienHe { get; set; }
        public string DienThoai { get; set; }
        public string DiDong { get; set; }
        public string Email { get; set; }
        public string TieuDe { get; set; }
        public string MoTa { get; set; }
        public Nullable<short> LoaiIssue { get; set; }
        public Nullable<System.DateTime> NgayDeNghi { get; set; }
        public Nullable<int> NguoiXuLy { get; set; }
        public int NguoiTao { get; set; }
        public string CachXuLy { get; set; }
        public string HuongXuLy { get; set; }
        public Nullable<int> DanhGiaId { get; set; }
        public string MaTrangThai { get; set; }
        public string XoaYn { get; set; }
        public int CtrVersion { get; set; }
    }
}