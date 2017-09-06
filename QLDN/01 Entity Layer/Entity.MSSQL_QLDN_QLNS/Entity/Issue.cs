/*****************************************************************************
1. Create Date : 2017.04.15
2. Creator     : Tran Quoc Hung
3. Description : entity
4. History     : 2017.04.15 (Tran Quoc Hung) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity
{
    /// <summary>
    /// A class which represents the Issue table.
    /// </summary>
	[Table("Issue")]
    public partial class Issue
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int IssueId { get; set; }
        public virtual int? KhachHangId { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual string NguoiLienHe { get; set; }
        public virtual string DienThoai { get; set; }
        public virtual string DiDong { get; set; }
        public virtual string Email { get; set; }
        public virtual string TieuDe { get; set; }
        public virtual string MoTa { get; set; }
        public virtual short? LoaiIssue { get; set; }
        public virtual DateTime? NgayDeNghi { get; set; }
        public virtual DateTime? NgayKetThuc { get; set; }
        public virtual int? NguoiXuLy { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual string CachXuLy { get; set; }
        public virtual string HuongXuLy { get; set; }
        public virtual int? DanhGiaId { get; set; }
        public virtual string MaTrangThai { get; set; }
        public virtual string XoaYn { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
