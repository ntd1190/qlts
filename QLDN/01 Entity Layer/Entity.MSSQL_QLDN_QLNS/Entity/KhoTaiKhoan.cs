using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity
{
    /// <summary>
    /// A class which represents the KhoTaiKhoan table.
    /// </summary>
	[Table("TaiKhoan")]
    public partial class KhoTaiKhoan
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int TaiKhoanId { get; set; }
        public virtual string TenTaiKhoan { get; set; }
        public virtual string MaTaiKhoan { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual int? NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int? CtrVersion { get; set; }
    }
}
