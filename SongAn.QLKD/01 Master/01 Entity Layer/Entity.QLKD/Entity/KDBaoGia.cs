using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace SongAn.QLKD.Entity.QLKD.Entity
{
    [Table("KDBaoGia")]
    public partial class KDBaoGia
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual int BaoGiaId { get; set; }
        public virtual string SoPhieu { get; set; }
        public virtual string TenBaoGia { get; set; }
        public virtual DateTime NgayBaoGia { get; set; }
        public virtual int NhanVienId { get; set; }
        public virtual int KhachHangId { get; set; }
        public virtual string LyDo { get; set; }
        public virtual string NguoiNhan { get; set; }
        public virtual string DienThoai { get; set; }
        public virtual int DaNhan { get; set; }
        public virtual int TrangThai { get; set; }
        public virtual string GhiChu { get; set; }
        public virtual int NguoiTao { get; set; }
        public virtual DateTime NgayTao { get; set; }
        public virtual int CtrVersion { get; set; }

    }
}
