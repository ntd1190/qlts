/*****************************************************************************
1. Create Date : 2017.06.01
2. Creator     : NGUYỄN THANH BÌNH
3. Description : entity
4. History     : 2017.06.01 (NGUYỄN THANH BÌNH) - Tao moi
*****************************************************************************/
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SongAn.QLDN.Entity.MSSQL_QLDN_QLNS.Entity
{
    /// <summary>
    /// A class which represents the KhoKiemKe table.
    /// </summary>
	[Table("KhoKiemKe")]
    public partial class KhoKiemKe
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int KiemKeId { get; set; }
        public virtual string TieuDe { get; set; }
        public virtual int KhoHangId { get; set; }
        public virtual string Hinh { get; set; }
        public virtual string TrangThai { get; set; }
        public virtual int? NguoiTao { get; set; }
        public virtual DateTime? NgayTao { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrlVersion { get; set; }

        public virtual string TruongBanTen { get; set; }
        public virtual string TruongBanChucVu { get; set; }
        public virtual string TruongBanDaiDien { get; set; }
        public virtual string UyVienTen { get; set; }
        public virtual string UyVienChucVu { get; set; }
        public virtual string UyVienDaiDien { get; set; }
        public virtual string UyVienTen2 { get; set; }
        public virtual string UyVienChucVu2 { get; set; }
        public virtual string UyVienDaiDien2 { get; set; }
    }
}
