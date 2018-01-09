using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLKD.Entity.QLKD.Entity
{
    [Table("KDDonHang")]
    public partial class KDDonHang
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int DonHangId { get; set; }
        public virtual string SoPhieu { get; set; }
        public virtual string TenDonHang { get; set; }
        public virtual DateTime NgayLap { get; set; }
        public virtual int KhachHangId { get; set; }
        public virtual string LyDo { get; set; }
        public virtual int HopDongId { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual string DiaChiNhan { get; set; }
        public virtual string BoPhanNhan { get; set; }
        public virtual string NguoiNhan { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual int TrangThai { get; set; }
        public virtual DateTime? NgayDuyet { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int? CtrVersion { get; set; }

    }
}
