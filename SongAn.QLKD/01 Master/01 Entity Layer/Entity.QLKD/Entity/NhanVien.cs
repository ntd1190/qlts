
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
namespace SongAn.QLKD.Entity.QLKD.Entity
{
    /// <summary>
    /// A class which represents the NhanVien table.
    /// </summary>
	[Table("NhanVien")]
    public partial class NhanVien
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int NhanVienId { get; set; }
        public virtual string Ma { get; set; }
        public virtual string Ho { get; set; }
        public virtual string Ten { get; set; }
        public virtual string GioiTinh { get; set; }
        public virtual DateTime? NgaySinh { get; set; }
        public virtual string CMND { get; set; }
        public virtual DateTime? NgayCap { get; set; }
        public virtual string NoiCap { get; set; }
        public virtual string ThuongTru { get; set; }
        public virtual string TamTru { get; set; }
        public virtual DateTime? NgayTuyenDung { get; set; }
        public virtual int? ChiNhanhId { get; set; }
        public virtual int? PhongBanId { get; set; }
        public virtual int? ChucVuId { get; set; }
        public virtual string DienThoai { get; set; }
        public virtual string DiDong { get; set; }
        public virtual string Email { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual string MaTrangThai { get; set; }
        public virtual string Hinh { get; set; }
        public virtual string XoaYN { get; set; }
        public virtual int CtrVersion { get; set; }
    }
}
